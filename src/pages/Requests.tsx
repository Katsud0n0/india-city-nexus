
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, FileText, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { 
  getRequests, 
  departments, 
  Request as RequestType,
  updateRequestStatus,
  deleteRequest 
} from '@/services/excelService';
import { useAuth } from '@/contexts/AuthContext';

const Requests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);
  
  const allRequests = getRequests();
  
  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || request.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleViewRequest = (request: RequestType) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleStatusChange = (status: 'pending' | 'inprogress' | 'completed') => {
    if (selectedRequest) {
      const updatedRequest = updateRequestStatus(selectedRequest.id, status);
      if (updatedRequest) {
        setSelectedRequest(updatedRequest);
        toast({
          title: "Status Updated",
          description: `Request status changed to ${status}`,
        });
      }
    }
  };

  const handleConfirmDelete = () => {
    if (requestToDelete) {
      deleteRequest(requestToDelete);
      setIsDeleteDialogOpen(false);
      setRequestToDelete(null);
      
      // If we're deleting the currently selected request, close the details view
      if (selectedRequest && selectedRequest.id === requestToDelete) {
        setSelectedRequest(null);
      }
      
      toast({
        title: "Request Deleted",
        description: "The request has been permanently deleted",
      });
    }
  };

  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setRequestToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Requests</h1>
        <Button 
          className="bg-jd-lavender hover:bg-jd-purple"
          onClick={() => navigate('/requests/new')}
        >
          <Plus size={18} className="mr-2" />
          New Request
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search requests..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-48">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow relative"
              onClick={() => handleViewRequest(request)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{request.title}</h3>
                <span className={`status-badge status-${request.status}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Department: {request.department}</span>
                <span>Created by: {request.createdBy}</span>
              </div>
              <div className="flex mt-4 justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                  onClick={(e) => { e.stopPropagation(); handleViewRequest(request); }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex items-center"
                  onClick={(e) => openDeleteDialog(request.id, e)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
          <FileText className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">No requests found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all'
              ? "No requests match your current filters"
              : "There are no requests in the system yet"}
          </p>
          <Button 
            className="bg-jd-lavender hover:bg-jd-purple"
            onClick={() => navigate('/requests/new')}
          >
            Create Your First Request
          </Button>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedRequest.title}</span>
                <Button variant="ghost" size="sm" onClick={handleCloseDetails} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription>
                <span className={`status-badge status-${selectedRequest.status} mt-2`}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-gray-700">{selectedRequest.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Department</h4>
                  <p className="text-sm text-gray-700">{selectedRequest.department}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Created By</h4>
                  <p className="text-sm text-gray-700">{selectedRequest.createdBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Created At</h4>
                  <p className="text-sm text-gray-700">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Last Updated</h4>
                  <p className="text-sm text-gray-700">{new Date(selectedRequest.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Update Status</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={selectedRequest.status === 'pending' ? 'default' : 'outline'} 
                    size="sm"
                    className={selectedRequest.status === 'pending' ? 'bg-jd-lavender' : ''}
                    onClick={() => handleStatusChange('pending')}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={selectedRequest.status === 'inprogress' ? 'default' : 'outline'} 
                    size="sm"
                    className={selectedRequest.status === 'inprogress' ? 'bg-jd-lavender' : ''}
                    onClick={() => handleStatusChange('inprogress')}
                  >
                    In Progress
                  </Button>
                  <Button 
                    variant={selectedRequest.status === 'completed' ? 'default' : 'outline'} 
                    size="sm"
                    className={selectedRequest.status === 'completed' ? 'bg-jd-lavender' : ''}
                    onClick={() => handleStatusChange('completed')}
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setRequestToDelete(selectedRequest.id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Requests;
