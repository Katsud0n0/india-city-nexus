
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  CheckCircle, 
  Building2, 
  Download,
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getRequestsByUser, getDepartmentStats, getRequestStats, exportToExcel } from '@/services/excelService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [departmentStats, setDepartmentStats] = useState<{department: string; count: number}[]>([]);
  
  useEffect(() => {
    // Get request statistics
    const requestStats = getRequestStats();
    setStats(requestStats);
    
    // Get department statistics
    const deptStats = getDepartmentStats();
    setDepartmentStats(deptStats);
  }, []);
  
  const handleExportData = () => {
    exportToExcel();
  };
  
  const handleNewRequest = () => {
    navigate('/requests/new');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.username}</p>
        </div>
        
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleExportData}
          >
            <Download size={18} className="mr-2" />
            Export Data
          </Button>
          
          <Button 
            className="bg-jd-lavender hover:bg-jd-purple"
            onClick={handleNewRequest}
          >
            <Plus size={18} className="mr-2" />
            New Request
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">{stats.total}</div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">All department requests</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-jd-pending">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-jd-pending">{stats.pending}</div>
              <Clock className="h-8 w-8 text-jd-pending" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Awaiting action</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-jd-inprogress">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-jd-inprogress">{stats.inProgress}</div>
              <Clock className="h-8 w-8 text-jd-inprogress" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Currently being processed</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-jd-completed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-jd-completed">{stats.completed}</div>
              <CheckCircle className="h-8 w-8 text-jd-completed" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Successfully resolved</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Statistics */}
        <div>
          <h2 className="text-xl font-bold mb-4">Department Statistics</h2>
          <div className="space-y-4">
            {departmentStats
              .filter(dept => dept.count > 0)
              .map((dept) => (
                <div key={dept.department} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div className="flex items-center">
                    <Building2 className="h-6 w-6 text-gray-500 mr-3" />
                    <span>{dept.department}</span>
                  </div>
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center">
                    {dept.count}
                  </div>
                </div>
              ))}
            
            {departmentStats.filter(dept => dept.count > 0).length === 0 && (
              <div className="p-4 bg-white rounded-lg shadow text-center text-gray-500">
                No department statistics available yet.
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Your Recent Requests</h2>
            <Button variant="link" onClick={() => navigate('/requests')}>
              View All
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {user && getRequestsByUser(user.username).length > 0 ? (
                getRequestsByUser(user.username).slice(0, 3).map((request) => (
                  <div key={request.id} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{request.title}</h3>
                      <span className={`status-badge status-${request.status}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{request.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No Requests Yet</h3>
                  <p className="text-gray-500 mb-6">You haven't created any interdepartmental requests yet.</p>
                  <Button 
                    className="bg-jd-lavender hover:bg-jd-purple"
                    onClick={() => navigate('/requests/new')}
                  >
                    Create Your First Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
