
import React, { useState, useEffect } from 'react';
import { Bell, Menu, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '@/services/excelService';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  
  useEffect(() => {
    if (user) {
      // Get all requests to find ones that should trigger a notification
      const allRequests = getRequests();
      
      // Find requests for the user's department that need attention
      const departmentRequests = allRequests.filter(req => 
        req.department === user.department && 
        req.status === 'pending'
      );
      
      setNotifications(departmentRequests);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-jd-darker text-white h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        {toggleSidebar && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 text-white">
            <Menu size={24} />
          </Button>
        )}
        <div className="flex items-center">
          <span className="text-xl font-bold mr-1">JD</span>
          <span className="text-xl font-medium text-jd-lavender">| Modern Solutions</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell size={20} />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <DropdownMenuItem key={index} className="flex flex-col items-start p-3">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-sm text-gray-500">
                    New request for {notification.department}
                  </span>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">No new notifications</div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white flex items-center space-x-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user?.profilePicture || "/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png"} />
                  <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span>{user?.username}</span>
              </div>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
