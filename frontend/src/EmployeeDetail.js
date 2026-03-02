import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from './EmployeeContext';
import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee } = useEmployees();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch employee');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
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
          emergencyName: formData.emergency?.name || '',
          emergencyRelationship: formData.emergency?.relationship || '',
          emergencyPhone: formData.emergency?.phone || ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        updateEmployee(id, data.employee);
        setEmployee(data.employee);
        setIsEditing(false);
        alert('Employee details updated successfully!');
      } else {
        alert('Failed to update employee');
      }
    } catch (error) {
      alert('Unable to connect to server');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (loading) {
    return <div className="employee-detail-container"><div className="detail-content">Loading...</div></div>;
  }

  if (!employee) {
    return <div className="employee-detail-container"><div className="detail-content">Employee not found</div></div>;
  }

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
                <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergency?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergency: {
                        ...formData.emergency,
                        name: e.target.value
                      }
                    })}
                    className="edit-input"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="emergencyRelationship"
                    value={formData.emergency?.relationship || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergency: {
                        ...formData.emergency,
                        relationship: e.target.value
                      }
                    })}
                    className="edit-input"
                    placeholder="Relationship"
                  />
                  <input
                    type="text"
                    name="emergencyPhone"
                    value={formData.emergency?.phone || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      emergency: {
                        ...formData.emergency,
                        phone: e.target.value
                      }
                    })}
                    className="edit-input"
                    placeholder="Phone"
                  />
                </div>
              ) : (
                <p>
                  {employee.emergency?.name || 'N/A'} - {employee.emergency?.relationship || 'N/A'} - {employee.emergency?.phone || 'N/A'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
