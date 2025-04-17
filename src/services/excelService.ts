
import * as XLSX from 'xlsx';

// Define types for our data
export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  department: string;
  role: string;
  createdAt: string;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'inprogress' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage since we can't directly write to files in the browser
let users: User[] = [
  {
    id: '1',
    username: 'qwerty',
    password: 'password123',
    fullName: 'Qwerty User',
    department: 'Administration',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

let requests: Request[] = [
  {
    id: '1',
    title: 'Water Supply Request',
    description: 'Urgent water supply needed in Sector 5',
    department: 'Water Supply',
    status: 'pending',
    createdBy: 'qwerty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Electricity Repair',
    description: 'Street light maintenance in Ward 7',
    department: 'Electricity',
    status: 'completed',
    createdBy: 'qwerty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Health Camp Request',
    description: 'Vaccination drive at community center',
    department: 'Health',
    status: 'inprogress',
    createdBy: 'qwerty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Try to load data from localStorage if available
const loadFromStorage = () => {
  const storedUsers = localStorage.getItem('jd_users');
  const storedRequests = localStorage.getItem('jd_requests');
  
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
  
  if (storedRequests) {
    requests = JSON.parse(storedRequests);
  }
};

// Save data to localStorage
const saveToStorage = () => {
  localStorage.setItem('jd_users', JSON.stringify(users));
  localStorage.setItem('jd_requests', JSON.stringify(requests));
};

// Initialize by loading from storage
loadFromStorage();

// User operations
export const getUsers = (): User[] => {
  return users;
};

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveToStorage();
  return newUser;
};

// Request operations
export const getRequests = (): Request[] => {
  return requests;
};

export const getRequestsByUser = (username: string): Request[] => {
  return requests.filter(request => request.createdBy === username);
};

export const getRequestsByDepartment = (department: string): Request[] => {
  return requests.filter(request => request.department === department);
};

export const createRequest = (request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): Request => {
  const now = new Date().toISOString();
  const newRequest: Request = {
    ...request,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now
  };
  
  requests.push(newRequest);
  saveToStorage();
  return newRequest;
};

export const updateRequestStatus = (id: string, status: 'pending' | 'inprogress' | 'completed'): Request | undefined => {
  const index = requests.findIndex(req => req.id === id);
  if (index === -1) return undefined;
  
  requests[index].status = status;
  requests[index].updatedAt = new Date().toISOString();
  saveToStorage();
  return requests[index];
};

// Export data to Excel file
export const exportToExcel = () => {
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Create users worksheet
  const usersWS = XLSX.utils.json_to_sheet(users);
  XLSX.utils.book_append_sheet(wb, usersWS, "Users");
  
  // Create requests worksheet
  const requestsWS = XLSX.utils.json_to_sheet(requests);
  XLSX.utils.book_append_sheet(wb, requestsWS, "Requests");
  
  // Generate and download the Excel file
  XLSX.writeFile(wb, "JD_Modern_Solutions_Data.xlsx");
};

// Departments list
export const departments = [
  "Water Supply",
  "Electricity",
  "Health",
  "Education",
  "Sanitation",
  "Public Works",
  "Transportation",
  "Housing",
  "Finance",
  "Administration"
];

// Department statistics
export const getDepartmentStats = () => {
  const stats = departments.map(dept => {
    const deptRequests = requests.filter(req => req.department === dept);
    return {
      department: dept,
      count: deptRequests.length
    };
  });
  
  return stats;
};

// Get request counts by status
export const getRequestStats = () => {
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(req => req.status === 'pending').length;
  const inProgressRequests = requests.filter(req => req.status === 'inprogress').length;
  const completedRequests = requests.filter(req => req.status === 'completed').length;
  
  return {
    total: totalRequests,
    pending: pendingRequests,
    inProgress: inProgressRequests,
    completed: completedRequests
  };
};
