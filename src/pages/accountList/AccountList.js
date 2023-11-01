import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AccountList.css";

function formatFieldName(fieldName) {
  return fieldName
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

function AccountList() {
  const [accounts, setAccounts] = useState([
    {
      accountName: "Account 1",
      accountNumber: "12345",
      accountDescription: "Description 1",
      normalSide: "Normal 1",
      accountCategory: "Category 1",
      accountSubcategory: "Subcategory 1",
      initialBalance: "1000",
      debit: "500",
      credit: "0",
      balance: "500",
      dateTime: "2023-10-16 12:00:00",
      userId: "User 1",
      order: "01",
      statement: "IS",
      comment: "Comment 1",
    },
    {
      accountName: "Account 2",
      accountNumber: "67890",
      accountDescription: "Description 2",
      normalSide: "Normal 2",
      accountCategory: "Category 2",
      accountSubcategory: "Subcategory 2",
      initialBalance: "2000",
      debit: "1000",
      credit: "0",
      balance: "1000",
      dateTime: "2023-10-16 14:30:00",
      userId: "User 2",
      order: "02",
      statement: "BS",
      comment: "Comment 2",
    },
    {
      accountName: "Account 3",
      accountNumber: "54321",
      accountDescription: "Description 3",
      normalSide: "Normal 3",
      accountCategory: "Category 3",
      accountSubcategory: "Subcategory 3",
      initialBalance: "3000",
      debit: "1500",
      credit: "0",
      balance: "1500",
      dateTime: "2023-10-16 15:45:00",
      userId: "User 3",
      order: "03",
      statement: "RE",
      comment: "Comment 3",
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [viewDetailsIndex, setViewDetailsIndex] = useState(-1);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleViewDetails = (index) => {
    setViewDetailsIndex(index);
  };

  const closeDetails = () => {
    setViewDetailsIndex(-1);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAccounts = [...accounts];
    updatedAccounts[index][name] = value;
    setAccounts(updatedAccounts);
  };

  return (
    <div className="account-list">
      <h2>List of Accounts: </h2>
      <Link to="/userForm" className="create-account-button">
        Create an Account
      </Link>
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.accountName}</td>
              <td>{account.accountNumber}</td>
              <td>
                {viewDetailsIndex === index ? (
                  <>
                    <button onClick={toggleEditMode}>
                      {editMode ? "Save" : "Edit"}
                    </button>
                    <button onClick={closeDetails}>Close</button>
                  </>
                ) : (
                  <button onClick={() => toggleViewDetails(index)}>
                    View Details
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewDetailsIndex >= 0 && (
        <div className="details">
          <h4>Account Details</h4>
          <ul>
            {Object.entries(accounts[viewDetailsIndex]).map(([key, value]) => (
              <li key={key}>
                <strong>{formatFieldName(key)}:</strong>{" "}
                {editMode ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={(e) => handleInputChange(e, viewDetailsIndex)}
                  />
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountList;