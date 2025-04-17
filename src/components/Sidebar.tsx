
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Building2, FileText, User, Users, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/departments', label: 'Departments', icon: <Building2 size={20} /> },
    { path: '/requests', label: 'Requests', icon: <FileText size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/team', label: 'Team', icon: <Users size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={cn(
      "bg-jd-dark text-white h-screen transition-all duration-300 flex flex-col",
      isOpen ? "w-64" : "w-0 overflow-hidden"
    )}>
      <div className="p-6">
        <div className="text-lg">Welcome,</div>
        <div className="text-xl font-bold">{user?.username}</div>
        <div className="text-sm text-gray-400">{user?.department}</div>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-6 py-3 text-base hover:bg-jd-darker transition-colors",
                    isActive ? "bg-jd-darker border-l-4 border-jd-lavender" : ""
                  )
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
