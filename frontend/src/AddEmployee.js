import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from './EmployeeContext';
import './AddEmployee.css';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    status: 'Active',
    joinDate: '',
    salary: '',
    address: '',
    emergency: ''
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setApiError('');

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            department: formData.department,
            status: formData.status,
            joinDate: formData.joinDate,
            salary: formData.salary,
            address: formData.address,
            emergencyName: formData.emergency
          })
        });

        const data = await response.json();

        if (response.ok) {
          addEmployee(data.employee);
          setShowPopup(true);
        } else {
          setApiError(data.message || 'Failed to add employee');
        }
      } catch (error) {
        setApiError('Unable to connect to server. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home');
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="add-employee-container">
      <header className="add-header">
        <div className="header-content">
          <button className="btn-back" onClick={handleCancel}>
            ← Back to Home
          </button>
          <h1>Add New Employee</h1>
        </div>
      </header>

      <div className="add-content">
        <div className="add-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Enter email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="Enter phone number"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={errors.position ? 'error' : ''}
                  placeholder="Enter position"
                />
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? 'error' : ''}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="joinDate">Join Date *</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className={errors.joinDate ? 'error' : ''}
                />
                {errors.joinDate && <span className="error-message">{errors.joinDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary *</label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={errors.salary ? 'error' : ''}
                  placeholder="e.g., $85,000"
                />
                {errors.salary && <span className="error-message">{errors.salary}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="emergency">Emergency Contact</label>
                <input
                  type="text"
                  id="emergency"
                  name="emergency"
                  value={formData.emergency}
                  onChange={handleChange}
                  placeholder="Name - Phone"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Add Employee
              </button>
              <button type="button" className="btn-cancel-form" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <div className="popup-header">
              <h3>Success!</h3>
            </div>
            <div className="popup-body">
              <p>Employee added successfully!</p>
            </div>
            <div className="popup-footer">
              <button className="btn-close-popup" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
