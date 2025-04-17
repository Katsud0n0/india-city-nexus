
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequestsByUser } from '@/services/excelService';

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const userRequests = getRequestsByUser(user.username);
  const pendingCount = userRequests.filter(req => req.status === 'pending').length;
  const inProgressCount = userRequests.filter(req => req.status === 'inprogress').length;
  const completedCount = userRequests.filter(req => req.status === 'completed').length;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p>{user.fullName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p>{user.username}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p>{user.department}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="capitalize">{user.role}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                  <p className="text-2xl font-bold text-jd-pending">{pendingCount}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
                  <p className="text-2xl font-bold text-jd-inprogress">{inProgressCount}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                  <p className="text-2xl font-bold text-jd-completed">{completedCount}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
                {userRequests.length > 0 ? (
                  <div className="space-y-3">
                    {userRequests.slice(0, 5).map((request) => (
                      <div key={request.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`status-badge status-${request.status}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No activity yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
