
import React, { useState, useRef } from 'react';
import { Save, User, Bell, Lock, Globe, Moon, Sun, Smartphone, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings = () => {
  const { toast } = useToast();
  const { user, updateUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.fullName || 'Rajesh Kumar',
    email: 'rajesh.kumar@jdmodern.gov.in',
    phone: '+91 98765 43210',
    jobTitle: 'Team Lead',
    department: user?.department || 'Water Department',
    location: 'HQ, Sector 5'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    requestUpdates: true,
    departmentNews: false,
    teamChanges: true,
    systemUpdates: true
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: 'light',
    language: 'english',
    fontSize: 'medium',
    colorScheme: 'default'
  });
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || "/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png"
  );

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityForm({
      ...securityForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfilePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setProfilePicture(e.target.result);
          
          toast({
            title: "Photo Updated",
            description: "Your profile photo has been changed.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user's profile in the backend
    if (user) {
      updateUserProfile({
        ...user,
        fullName: profileForm.name,
        department: profileForm.department,
        profilePicture: profilePicture
      });
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSaveDisplay = () => {
    // Apply theme changes
    document.documentElement.classList.toggle('dark', displaySettings.theme === 'dark');
    
    // Apply font size changes
    const fontSizeClasses = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };
    
    document.documentElement.className = document.documentElement.className
      .replace(/text-sm|text-base|text-lg/, '')
      .concat(` ${fontSizeClasses[displaySettings.fontSize as keyof typeof fontSizeClasses]}`);
    
    toast({
      title: "Display settings updated",
      description: "Your display preferences have been saved.",
    });
  };
  
  const handleUpdatePassword = () => {
    // Validate password fields
    if (!securityForm.currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password.",
        variant: "destructive"
      });
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Invalid password",
        description: "New password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would update the user's password in the backend
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Reset form
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    toast({
      title: twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled",
      description: twoFactorEnabled 
        ? "Your account is now less secure. We recommend enabling two-factor authentication." 
        : "Your account is now more secure with two-factor authentication.",
    });
  };
  
  const handleLogoutAllSessions = () => {
    toast({
      title: "All sessions terminated",
      description: "You have been logged out from all devices except this one.",
    });
  };

  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center">
            <Palette size={16} className="mr-2" />
            Display
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock size={16} className="mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div 
                  className="w-24 h-24 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={handleProfilePhotoClick}
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage src={profilePicture} className="w-full h-full object-cover" />
                    <AvatarFallback>{user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Profile Photo</h3>
                  <p className="text-sm text-gray-500 mb-2">PNG, JPG or GIF, maximum 1MB</p>
                  <Button variant="outline" size="sm" onClick={handleProfilePhotoClick}>
                    Change Photo
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email" 
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={profileForm.jobTitle}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    defaultValue={profileForm.department}
                    onValueChange={(value) => setProfileForm(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Water Department">Water Department</SelectItem>
                      <SelectItem value="Electricity Department">Electricity Department</SelectItem>
                      <SelectItem value="Health Department">Health Department</SelectItem>
                      <SelectItem value="Waste Management">Waste Management</SelectItem>
                      <SelectItem value="Police Department">Police Department</SelectItem>
                      <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Office Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-jd-lavender hover:bg-jd-purple">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications from the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <h4 className="font-medium">Notification Channels</h4>
                    <p className="text-sm text-gray-500">Choose how you want to receive notifications</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email updates for important activities</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => toggleNotification('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => toggleNotification('pushNotifications')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <h4 className="font-medium">Notification Types</h4>
                    <p className="text-sm text-gray-500">Select which types of notifications you want to receive</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Request Updates</Label>
                    <p className="text-sm text-gray-500">Status changes on your service requests</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.requestUpdates}
                    onCheckedChange={() => toggleNotification('requestUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Department News</Label>
                    <p className="text-sm text-gray-500">Updates and announcements from your department</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.departmentNews}
                    onCheckedChange={() => toggleNotification('departmentNews')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Team Changes</Label>
                    <p className="text-sm text-gray-500">Updates when team members are added or removed</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.teamChanges}
                    onCheckedChange={() => toggleNotification('teamChanges')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-gray-500">Platform maintenance and feature updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => toggleNotification('systemUpdates')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications} className="bg-jd-lavender hover:bg-jd-purple">
                <Save size={16} className="mr-2" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Display Settings */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize the appearance of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Theme</Label>
                    <p className="text-sm text-gray-500">Choose between light and dark mode</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={displaySettings.theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      className={displaySettings.theme === 'light' ? 'bg-jd-lavender' : ''}
                      onClick={() => setDisplaySettings({...displaySettings, theme: 'light'})}
                    >
                      <Sun size={16} className="mr-2" />
                      Light
                    </Button>
                    <Button 
                      variant={displaySettings.theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      className={displaySettings.theme === 'dark' ? 'bg-jd-lavender' : ''}
                      onClick={() => setDisplaySettings({...displaySettings, theme: 'dark'})}
                    >
                      <Moon size={16} className="mr-2" />
                      Dark
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Language</Label>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                  <Select 
                    value={displaySettings.language}
                    onValueChange={(value) => setDisplaySettings({...displaySettings, language: value})}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Font Size</Label>
                    <p className="text-sm text-gray-500">Adjust the text size for better readability</p>
                  </div>
                  <Select 
                    value={displaySettings.fontSize}
                    onValueChange={(value) => setDisplaySettings({...displaySettings, fontSize: value})}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Color Scheme</Label>
                    <p className="text-sm text-gray-500">Choose your preferred accent color</p>
                  </div>
                  <Select 
                    value={displaySettings.colorScheme}
                    onValueChange={(value) => setDisplaySettings({...displaySettings, colorScheme: value})}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (Purple)</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveDisplay} className="bg-jd-lavender hover:bg-jd-purple">
                <Save size={16} className="mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and account security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-500">Change your account password</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword"
                      type="password" 
                      value={securityForm.currentPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password" 
                      value={securityForm.newPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      value={securityForm.confirmPassword}
                      onChange={handleSecurityChange}
                    />
                  </div>
                </div>
                
                <Button 
                  className="bg-jd-lavender hover:bg-jd-purple"
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggleTwoFactor}
                  />
                </div>
                
                <p className="text-sm text-gray-500">
                  Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                </p>
                
                <Button 
                  variant="outline"
                  onClick={handleToggleTwoFactor}
                >
                  {twoFactorEnabled ? 'Disable' : 'Setup'} Two-Factor Authentication
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <h4 className="font-medium">Active Sessions</h4>
                    <p className="text-sm text-gray-500">Manage your active login sessions</p>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-gray-500" />
                        <div>
                          <h5 className="font-medium">Current Device</h5>
                          <p className="text-xs text-gray-500">Windows • Chrome • Mumbai, IN</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Active</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Last active: Just now
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={handleLogoutAllSessions}
                >
                  Logout of All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
