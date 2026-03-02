const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/auth');

// Get all employees
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Get single employee by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
});

// Add new employee
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      department: req.body.department,
      status: req.body.status || 'Active',
      joinDate: req.body.joinDate,
      salary: req.body.salary,
      address: req.body.address,
      emergency: {
        name: req.body.emergencyName,
        relationship: req.body.emergencyRelationship,
        phone: req.body.emergencyPhone
      }
    });

    await newEmployee.save();
    
    res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update employee
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        department: req.body.department,
        status: req.body.status,
        joinDate: req.body.joinDate,
        salary: req.body.salary,
        address: req.body.address,
        emergency: {
          name: req.body.emergencyName,
          relationship: req.body.emergencyRelationship,
          phone: req.body.emergencyPhone
        },
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({
      message: 'Employee updated successfully',
      employee: updatedEmployee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete employee
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
