import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getStats()
      ]);
      setUsers(usersRes.data.data);
      setStats(statsRes.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch admin data. Make sure you have admin privileges.');
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      alert('User role updated successfully');
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  if (loading) return <div className="container mt-5">Loading Admin Dashboard...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="admin-dashboard container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {stats && (
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="card stats-card bg-primary text-white">
              <div className="card-body">
                <h5>Total Users</h5>
                <h3>{stats.users}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card bg-success text-white">
              <div className="card-body">
                <h5>Properties</h5>
                <h3>{stats.properties}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card bg-info text-white">
              <div className="card-body">
                <h5>Owners</h5>
                <h3>{stats.owners}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card stats-card bg-warning text-white">
              <div className="card-body">
                <h5>Tenants</h5>
                <h3>{stats.tenants}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <h4>Manage Users</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <span className={`badge badge-${user.role === 'admin' ? 'danger' : user.role === 'owner' ? 'primary' : 'secondary'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <select 
                    className="form-control form-control-sm d-inline-block w-auto"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="tenant">Tenant</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;