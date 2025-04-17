
import React from 'react';
import { Building2 } from 'lucide-react';
import { departments, getDepartmentStats } from '@/services/excelService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Departments = () => {
  const departmentStats = getDepartmentStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Departments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const stats = departmentStats.find(stat => stat.department === department);
          const requestCount = stats ? stats.count : 0;
          
          return (
            <Card key={department}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Building2 className="mr-2 h-5 w-5" />
                  {department}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Manages all {department.toLowerCase()} related services and requests for the city.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Requests:</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {requestCount}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Departments;
