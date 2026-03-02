import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from './EmployeeContext';
import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee } = useEmployees();
  const [isEditing, setIsEditing] = useState(false);

  const employeeData = getEmployeeById(id);
  const [employee, setEmployee] = useState(employeeData || {
    id: id,
    name: 'Employee Not Found',
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

  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    if (employeeData) {
      setEmployee(employeeData);
      setFormData(employeeData);
    }
  }, [id, employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(employee);
    setIsEditing(false);
  };

  const handleSave = () => {
    updateEmployee(id, formData);
    setEmployee(formData);
    setIsEditing(false);
    alert('Employee details updated successfully!');
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="employee-detail-container">
      <header className="detail-header">
        <div className="header-content">
          <button className="btn-back" onClick={handleBack}>
            ← Back to Home
          </button>
          <h1>Employee Details</h1>
        </div>
      </header>

      <div className="detail-content">
        <div className="detail-card">
          <div className="card-header">
            <div>
              <h2>{isEditing ? 'Edit Employee' : employee.name}</h2>
              <p className="employee-id">Employee ID: {employee.id}</p>
            </div>
            {!isEditing ? (
              <button className="btn-edit" onClick={handleEdit}>
                Edit Details
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.name}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.email}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.phone}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Position</label>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.position}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Department</label>
              {isEditing ? (
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="edit-input"
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                </select>
              ) : (
                <p>{employee.department}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Status</label>
              {isEditing ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="edit-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              ) : (
                <span className={`status-badge ${employee.status.toLowerCase()}`}>
                  {employee.status}
                </span>
              )}
            </div>

            <div className="detail-item">
              <label>Join Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{new Date(employee.joinDate).toLocaleDateString()}</p>
              )}
            </div>

            <div className="detail-item">
              <label>Salary</label>
              {isEditing ? (
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.salary}</p>
              )}
            </div>

            <div className="detail-item full-width">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.address}</p>
              )}
            </div>

            <div className="detail-item full-width">
              <label>Emergency Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergency"
                  value={formData.emergency}
                  onChange={handleChange}
                  className="edit-input"
                />
              ) : (
                <p>{employee.emergency}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
