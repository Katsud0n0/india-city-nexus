
import React, { useState } from 'react';
import { Plus, Filter, UserPlus, Mail, Phone, Building, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockTeamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Team Lead',
    department: 'Water Department',
    email: 'rajesh.kumar@jdmodern.gov.in',
    phone: '+91 98765 43210',
    location: 'HQ, Sector 5',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Senior Engineer',
    department: 'Electricity Department',
    email: 'priya.sharma@jdmodern.gov.in',
    phone: '+91 87654 32109',
    location: 'East Zone Office',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Health Officer',
    department: 'Health Department',
    email: 'amit.patel@jdmodern.gov.in',
    phone: '+91 76543 21098',
    location: 'Medical Complex, Ward 7',
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Sunita Verma',
    role: 'Waste Management Specialist',
    department: 'Waste Management',
    email: 'sunita.verma@jdmodern.gov.in',
    phone: '+91 65432 10987',
    location: 'West Zone Office',
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Security Officer',
    department: 'Police Department',
    email: 'vikram.singh@jdmodern.gov.in',
    phone: '+91 54321 09876',
    location: 'Central Office',
    avatar: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Meera Joshi',
    role: 'Parks Supervisor',
    department: 'Parks & Recreation',
    email: 'meera.joshi@jdmodern.gov.in',
    phone: '+91 43210 98765',
    location: 'Green Zone, Sector 8',
    avatar: '/placeholder.svg'
  },
];

const departments = ['All Departments', 'Water Department', 'Electricity Department', 'Health Department', 'Waste Management', 'Police Department', 'Parks & Recreation'];

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  
  const filteredTeamMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Departments' || member.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <div className="flex space-x-2">
          <Button className="bg-jd-lavender hover:bg-jd-purple">
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
              Showing {filteredTeamMembers.length} of {mockTeamMembers.length} team members
            </div>
          </div>
          
          <TabsContent value="grid" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
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
                      <Button variant="outline" size="sm" className="text-xs">
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
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{member.role}</td>
                      <td className="py-3 px-4 text-gray-500">{member.department}</td>
                      <td className="py-3 px-4 text-gray-500">{member.email}</td>
                      <td className="py-3 px-4 text-gray-500">{member.location}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Team;
