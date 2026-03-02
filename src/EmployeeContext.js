import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Software Engineer', department: 'IT', status: 'Active', phone: '+1 (555) 123-4567', joinDate: '2023-01-15', salary: '$85,000', address: '123 Main St, City, State 12345', emergency: 'Jane Doe - +1 (555) 987-6543' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Product Manager', department: 'Product', status: 'Active', phone: '+1 (555) 234-5678', joinDate: '2023-02-20', salary: '$95,000', address: '456 Oak Ave, City, State 12345', emergency: 'John Smith - +1 (555) 876-5432' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', position: 'Designer', department: 'Design', status: 'Active', phone: '+1 (555) 345-6789', joinDate: '2023-03-10', salary: '$75,000', address: '789 Pine Rd, City, State 12345', emergency: 'Sarah Johnson - +1 (555) 765-4321' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', position: 'HR Manager', department: 'HR', status: 'Active', phone: '+1 (555) 456-7890', joinDate: '2023-04-05', salary: '$80,000', address: '321 Elm St, City, State 12345', emergency: 'Mike Williams - +1 (555) 654-3210' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', position: 'Sales Executive', department: 'Sales', status: 'Inactive', phone: '+1 (555) 567-8901', joinDate: '2023-05-15', salary: '$70,000', address: '654 Maple Dr, City, State 12345', emergency: 'Lisa Brown - +1 (555) 543-2109' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', position: 'Marketing Manager', department: 'Marketing', status: 'Active', phone: '+1 (555) 678-9012', joinDate: '2023-06-20', salary: '$88,000', address: '987 Cedar Ln, City, State 12345', emergency: 'David Davis - +1 (555) 432-1098' },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', position: 'Data Analyst', department: 'IT', status: 'Active', phone: '+1 (555) 789-0123', joinDate: '2023-07-10', salary: '$82,000', address: '147 Birch Ct, City, State 12345', emergency: 'Mary Wilson - +1 (555) 321-0987' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', position: 'Accountant', department: 'Finance', status: 'Active', phone: '+1 (555) 890-1234', joinDate: '2023-08-25', salary: '$78,000', address: '258 Spruce Way, City, State 12345', emergency: 'Tom Anderson - +1 (555) 210-9876' },
    { id: 9, name: 'David Martinez', email: 'david@example.com', position: 'Developer', department: 'IT', status: 'Active', phone: '+1 (555) 901-2345', joinDate: '2023-09-15', salary: '$90,000', address: '369 Willow Blvd, City, State 12345', emergency: 'Maria Martinez - +1 (555) 109-8765' },
    { id: 10, name: 'Jennifer Taylor', email: 'jennifer@example.com', position: 'Content Writer', department: 'Marketing', status: 'Inactive', phone: '+1 (555) 012-3456', joinDate: '2023-10-05', salary: '$65,000', address: '741 Ash Ave, City, State 12345', emergency: 'James Taylor - +1 (555) 098-7654' },
  ]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === parseInt(id) ? { ...emp, ...updatedEmployee } : emp
    ));
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === parseInt(id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, getEmployeeById }}>
      {children}
    </EmployeeContext.Provider>
  );
};
