import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './EmployeeContext';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import Home from './home';
import EmployeeDetail from './EmployeeDetail';
import AddEmployee from './AddEmployee';
import './App.css';

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/home" element={<Home />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/add-employee" element={<AddEmployee />} />
          </Routes>
        </div>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
