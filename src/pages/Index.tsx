
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-jd-darker">
      <Navbar />
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
          <h1 className="text-6xl font-bold text-white mb-4">
            <span>JD</span>
            <span className="text-jd-lavender"> Modern Solutions</span>
          </h1>
          
          <p className="text-xl text-white mb-12 max-w-xl">
            A unified platform for interdepartmental cooperation and streamlined communication.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-jd-lavender hover:bg-jd-purple text-white px-8 py-6 text-lg font-medium"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium"
              onClick={() => navigate('/departments')}
            >
              Explore Departments
            </Button>
          </div>
        </div>
        
        <div className="hidden md:flex md:w-1/3 p-8 items-center justify-center">
          <div className="bg-slate-800 rounded-lg p-4 w-full max-w-md space-y-4 border border-slate-700">
            <div className="flex space-x-2 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="request-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Water Supply Request</h3>
                <span className="status-badge status-pending">Pending</span>
              </div>
              <p className="text-sm text-gray-300">Urgent water supply needed in Sector 5</p>
            </div>
            
            <div className="request-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Electricity Repair</h3>
                <span className="status-badge status-completed">Completed</span>
              </div>
              <p className="text-sm text-gray-300">Street light maintenance in Ward 7</p>
            </div>
            
            <div className="request-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Health Camp Request</h3>
                <span className="status-badge status-inprogress">In Progress</span>
              </div>
              <p className="text-sm text-gray-300">Vaccination drive at community center</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <p className="text-center text-lg text-gray-700">
            Empowering organizations through interdepartmental cooperation and coordination
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
