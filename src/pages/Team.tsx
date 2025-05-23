
import React, { useState } from 'react';
import { Plus, Filter, UserPlus, Mail, Phone, Building, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import TeamMemberProfile from '@/components/TeamMemberProfile';

// Updated team members with default profile image
const mockTeamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Team Lead',
    department: 'Water Department',
    email: 'rajesh.kumar@jdmodern.gov.in',
    phone: '+91 98765 43210',
    location: 'HQ, Sector 5',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Senior Engineer',
    department: 'Electricity Department',
    email: 'priya.sharma@jdmodern.gov.in',
    phone: '+91 87654 32109',
    location: 'East Zone Office',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Health Officer',
    department: 'Health Department',
    email: 'amit.patel@jdmodern.gov.in',
    phone: '+91 76543 21098',
    location: 'Medical Complex, Ward 7',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
  {
    id: 4,
    name: 'Sunita Verma',
    role: 'Waste Management Specialist',
    department: 'Waste Management',
    email: 'sunita.verma@jdmodern.gov.in',
    phone: '+91 65432 10987',
    location: 'West Zone Office',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Security Officer',
    department: 'Police Department',
    email: 'vikram.singh@jdmodern.gov.in',
    phone: '+91 54321 09876',
    location: 'Central Office',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
  {
    id: 6,
    name: 'Meera Joshi',
    role: 'Parks Supervisor',
    department: 'Parks & Recreation',
    email: 'meera.joshi@jdmodern.gov.in',
    phone: '+91 43210 98765',
    location: 'Green Zone, Sector 8',
    avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
  },
];

const departments = ['All Departments', 'Water Department', 'Electricity Department', 'Health Department', 'Waste Management', 'Police Department', 'Parks & Recreation'];

const Team = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof mockTeamMembers[0] | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: ''
  });
  
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Departments' || member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeamMember(prev => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setNewTeamMember(prev => ({ ...prev, department: value }));
  };

  const handleViewProfile = (member: typeof mockTeamMembers[0]) => {
    setSelectedMember(member);
    setIsProfileDialogOpen(true);
  };

  const handleInvite = () => {
    // Validate all fields are filled
    const requiredFields = ['name', 'email', 'phone', 'role', 'department', 'location'];
    const missingFields = requiredFields.filter(field => !newTeamMember[field as keyof typeof newTeamMember]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newTeamMember.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Add the new team member
    const newMember = {
      id: teamMembers.length + 1,
      ...newTeamMember,
      avatar: '/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png'
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    setIsInviteDialogOpen(false);
    
    // Reset form
    setNewTeamMember({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      location: ''
    });
    
    toast({
      title: "Team Member Invited",
      description: `${newMember.name} has been invited to join the team.`
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <div className="flex space-x-2">
          <Button 
            className="bg-jd-lavender hover:bg-jd-purple"
            onClick={() => setIsInviteDialogOpen(true)}
          >
            <UserPlus size={18} className="mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Building size={16} className="mr-2 text-gray-500" />
                  <SelectValue placeholder="Filter by department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-gray-500">
              Showing {filteredTeamMembers.length} of {teamMembers.length} team members
            </div>
          </div>
          
          <TabsContent value="grid" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-gray-500 text-sm">{member.role}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Building size={12} className="mr-1" />
                            {member.department}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail size={14} className="mr-2 text-gray-500" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone size={14} className="mr-2 text-gray-500" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin size={14} className="mr-2 text-gray-500" />
                          <span>{member.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleViewProfile(member)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="m-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{member.role}</td>
                      <td className="py-3 px-4 text-gray-500">{member.department}</td>
                      <td className="py-3 px-4 text-gray-500">{member.email}</td>
                      <td className="py-3 px-4 text-gray-500">{member.location}</td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewProfile(member)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Team Member Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Invite Team Member</span>
              <Button variant="ghost" size="sm" onClick={() => setIsInviteDialogOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Fill in the details to invite a new team member to the platform.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={newTeamMember.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newTeamMember.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 99999 88888"
                  value={newTeamMember.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role/Position</Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Engineer"
                  value={newTeamMember.role}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newTeamMember.department}
                  onValueChange={handleDepartmentChange}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.slice(1).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Office Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="HQ, Sector 5"
                  value={newTeamMember.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsInviteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-jd-lavender hover:bg-jd-purple"
              onClick={handleInvite}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Team Member Profile Dialog */}
      <TeamMemberProfile
        member={selectedMember}
        isOpen={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      />
    </div>
  );
};

export default Team;
