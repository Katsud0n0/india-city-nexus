
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, CheckCircle, Users, Building, BarChart4, Clock, ChevronDown } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-jd-darker">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center px-12 md:px-24 py-12">
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
              variant="secondary" 
              className="bg-white text-jd-darker hover:bg-gray-100 px-8 py-6 text-lg font-medium flex items-center"
              onClick={() => navigate('/departments')}
            >
              Explore Departments
              <ArrowRight className="ml-2" />
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
              <div className="flex justify-end mt-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="request-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Electricity Repair</h3>
                <span className="status-badge status-completed">Completed</span>
              </div>
              <p className="text-sm text-gray-300">Street light maintenance in Ward 7</p>
              <div className="flex justify-end mt-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="request-card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Health Camp Request</h3>
                <span className="status-badge status-inprogress">In Progress</span>
              </div>
              <p className="text-sm text-gray-300">Vaccination drive at community center</p>
              <div className="flex justify-end mt-2">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Centralized Request Management</h3>
              </div>
              <p className="text-gray-600">
                Submit and track requests to any department through a single unified interface. Eliminates the need for redundant paperwork.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Interdepartmental Collaboration</h3>
              </div>
              <p className="text-gray-600">
                Connect departments for efficient communication and coordination. Breaks down silos between municipal services.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Clock className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Real-time Status Updates</h3>
              </div>
              <p className="text-gray-600">
                Receive instant updates on your requests as they progress through various stages. No more waiting for responses.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <Building className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Multiple Department Access</h3>
              </div>
              <p className="text-gray-600">
                Interface with Water, Electricity, Health, and other municipal departments through a single platform.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <BarChart4 className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              </div>
              <p className="text-gray-600">
                Gain insights from comprehensive data analytics on city-wide service requests and resolution metrics.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Transparent Workflow</h3>
              </div>
              <p className="text-gray-600">
                Track the complete lifecycle of every request with a transparent process that builds trust in municipal services.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-jd-lavender hover:bg-jd-purple text-white px-8 py-6 text-lg font-medium"
              onClick={() => navigate('/register')}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
