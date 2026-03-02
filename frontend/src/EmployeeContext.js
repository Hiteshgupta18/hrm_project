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
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
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
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee, updateEmployee, getEmployeeById }}>
      {children}
    </EmployeeContext.Provider>
  );
};
