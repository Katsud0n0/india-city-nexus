
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserByUsername, createUser, User } from '../services/excelService';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedUser: User) => void;
}

interface RegisterData {
  username: string;
  password: string;
  fullName: string;
  department: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in local storage on initial load
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('current_user');
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const foundUser = getUserByUsername(username);
    
    if (foundUser && foundUser.password === password) {
      // Add default profile picture if the user doesn't have one
      if (!foundUser.profilePicture) {
        foundUser.profilePicture = "/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png";
      }
      
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('current_user', JSON.stringify(foundUser));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.fullName}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive"
      });
      
      return false;
    }
  };

  const register = async (userData: RegisterData) => {
    const existingUser = getUserByUsername(userData.username);
    
    if (existingUser) {
      toast({
        title: "Registration Failed",
        description: "Username already exists.",
        variant: "destructive"
      });
      
      return false;
    }
    
    // Add default profile picture for new users
    const userWithDefaults = {
      ...userData,
      profilePicture: "/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png"
    };
    
    const newUser = createUser(userWithDefaults);
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created. You can now log in.",
    });
    
    return true;
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('current_user');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
