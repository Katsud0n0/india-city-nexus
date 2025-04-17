
import React from 'react';
import { X, Mail, Phone, Building, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

interface TeamMemberProfileProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberProfile: React.FC<TeamMemberProfileProps> = ({ member, isOpen, onClose }) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Team Member Profile</span>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center mt-2 mb-6">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={member.avatar || "/lovable-uploads/6cf1950e-60fb-4d9b-a5ea-d7ca88ae0d31.png"} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p className="text-gray-500">{member.role}</p>
          <p className="text-sm text-jd-lavender">{member.department}</p>
        </div>
        
        <Separator />
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{member.email}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p>{member.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Building className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Department</p>
              <p>{member.department}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p>{member.location}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberProfile;
