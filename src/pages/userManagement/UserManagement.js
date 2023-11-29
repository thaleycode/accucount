import React, { useState } from 'react';
import './UserManagement.css';
import { NavLink } from 'react-router-dom';

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', fullName: 'User One', role: 'Admin', isActive: true },
    { id: 2, username: 'user2', fullName: 'User Two', role: 'Manager', isActive: true },
    // Add more user data as needed
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };

  const handleStatusToggle = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isActive: !user.isActive };
        }
        return user;
      })
    );
  };

  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
        <NavLink to="/journal" activeClassName="active">
          Journal Entries
        </NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
      </div>
      <div className="body">
        <div className="center-table">
            <h1>User Management</h1>
        </div>
        <div className="top-buttons">
          <div className='left-button'><button className="create-new-user-button">+ Create New User</button></div>
          <div className='right-button'><button className="save-changes-button-top">Save Changes</button></div>
        </div>
              
        <div className='center-table'>    
          <table className="table-container">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      className={user.isActive ? 'active-button' : 'inactive-button'}
                    >
                      {user.isActive ? 'Active' : 'Deactivated'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
              </div>
        <div className="bottom-buttons">
          <div className="right-button"><button className="save-changes-button-bottom">Save Changes</button></div>
        </div>
      
    </div>
  );
}

export default UserManagement;
