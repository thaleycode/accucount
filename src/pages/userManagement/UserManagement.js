import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { NavLink } from 'react-router-dom';




function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the MongoDB server
    fetch('http://localhost:3001/users', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleStatusToggle = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, active: !user.active };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleStartDateChange = (userId, newStartDate) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, deactivateDate: newStartDate };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleEndDateChange = (userId, newEndDate) => {
    const updatedUsers = users.map((user) => {
      if (user._id === userId) {
        return { ...user, reactivateDate: newEndDate };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return ''; // Return an empty string if the date is not valid
  };

  const handleSaveChanges = () => {
    const updatedUsersData = users.map((user) => {
      return {
        _id: user._id,
        role: user.role,
        active: user.active,
        deactivateDate: user.deactivateDate,
        reactivateDate: user.reactivateDate,
      };
    });

    // Send the updated data to the server
    fetch('http://localhost:3001/update-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedUsers: updatedUsersData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Changes saved successfully');
      })
      .catch((error) => {
        console.error('Error saving changes:', error);
      });
  };

  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
        <NavLink to="/journal">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement" activeClassName="active">User Management</NavLink>
      </div>
      <div className="body">
        <div className="center-table">
            <h1>User Management</h1>
        </div>
        <div className="top-buttons">
          <div className='left-button'><button className="create-new-user-button">+ Create New User</button></div>
          <div className='right-button'><button className="save-changes-button-top" onClick={handleSaveChanges}>Save Changes</button></div>
        </div>
              
        <div className='center-table'>    
          <table className="table-container">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Start Suspend Date</th>
                <th>End Suspend Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value='user'>User</option>
                      <option value='manager'>Manager</option>
                      <option value='admin'>Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={user.active ? 'active-button' : 'inactive-button'}
                      onClick={() => handleStatusToggle(user._id)}
                    >
                      {user.active ? 'Active' : 'Deactivated'}
                    </button>
                  </td>
                  <td>
                     <input
                      type='date'
                      value={formatDate(new Date(user.deactivateDate))}
                      onChange={(e) => handleStartDateChange(user._id, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='date'
                      value={user.reactivateDate ? new Date(user.reactivateDate).toISOString().slice(0, 10) : ''}
                      onChange={(e) => handleEndDateChange(user._id, new Date(e.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
              </div>
        <div className="bottom-buttons">
          <div className="right-button"><button className="save-changes-button-bottom" onClick={handleSaveChanges}>Save Changes</button></div>
        </div>
      
    </div>
  );
}

export default UserManagement;
