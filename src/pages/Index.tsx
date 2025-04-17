
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { ArrowRight, CheckCircle, Users, Building, BarChart4, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-jd-darker">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section with centered content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
          <h1 className="text-7xl font-bold text-white mb-6 animate-fade-in">
            <span>JD</span>
            <span className="text-jd-lavender"> Modern Solutions</span>
          </h1>
          
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
            A unified platform for interdepartmental cooperation and streamlined communication.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className="bg-jd-lavender hover:bg-jd-purple text-white px-8 py-6 text-lg font-medium hover-scale"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            
            <Button 
              variant="secondary" 
              className="bg-white text-jd-darker hover:bg-gray-100 px-8 py-6 text-lg font-medium flex items-center hover-scale"
              onClick={() => navigate('/departments')}
            >
              Explore Departments
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Centralized Request Management</h3>
              </div>
              <p className="text-gray-600">
                Submit and track requests to any department through a single unified interface. Eliminates the need for redundant paperwork.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
              <div className="flex items-center mb-4">
                <Users className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Interdepartmental Collaboration</h3>
              </div>
              <p className="text-gray-600">
                Connect departments for efficient communication and coordination. Breaks down silos between municipal services.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
              <div className="flex items-center mb-4">
                <Clock className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Real-time Status Updates</h3>
              </div>
              <p className="text-gray-600">
                Receive instant updates on your requests as they progress through various stages. No more waiting for responses.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
              <div className="flex items-center mb-4">
                <Building className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Multiple Department Access</h3>
              </div>
              <p className="text-gray-600">
                Interface with Water, Electricity, Health, and other municipal departments through a single platform.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
              <div className="flex items-center mb-4">
                <BarChart4 className="text-jd-lavender mr-3 h-6 w-6" />
                <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              </div>
              <p className="text-gray-600">
                Gain insights from comprehensive data analytics on city-wide service requests and resolution metrics.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover-scale">
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
              className="bg-jd-lavender hover:bg-jd-purple text-white px-8 py-6 text-lg font-medium hover-scale"
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
