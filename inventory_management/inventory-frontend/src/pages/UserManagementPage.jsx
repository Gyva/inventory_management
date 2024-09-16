import React, { useState, useEffect } from 'react';
import { getUserList } from '../services/api';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserList().then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
