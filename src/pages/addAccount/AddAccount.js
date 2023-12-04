import React, { useState } from "react";
import "./AddAccount.css";
import { NavLink } from "react-router-dom";
import axios from "axios";


function AddAccount() {
  const [formData, setFormData] = useState({
    accountCategory: "",
    accountNumber: "",
    accountName: "",
    balance: "",
    comment: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, accountCategory: value });
  };

  // Validation function for Account Number (allows integers within specified ranges)
  const validateAccountNumber = (value) => {
    const category = formData.accountCategory;
    const num = parseInt(value);

    if (
      (category === "asset" && num >= 1000 && num <= 1999) ||
      (category === "liability" && num >= 2000 && num <= 2999) ||
      (category === "equity" && num >= 3000 && num <= 3999) ||
      (category === "income" && num >= 4000 && num <= 4999) ||
      (category === "expenses" && num >= 5000 && num <= 5999)
    ) {
      return true;
    }

    return false;
  };

  // Function to calculate Normal Side based on the selected category
  const getNormalSideText = () => {
    const { accountCategory } = formData;

     if (!accountCategory) {
    // Render some space when no category is selected
    return <div style={{ marginBottom: '20px' }}></div>;
    }
    
    if (accountCategory === "equity" || accountCategory === "liability" || accountCategory === "income") {
      return "Credit";
    } else if (accountCategory === "asset" || accountCategory === "expenses") {
      return "Debit";
    } else {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      accountCategory: formData.accountCategory,
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      balance: formData.balance,
      comment: formData.comment,
    };

    console.log(formData);

    try {
    const response = await fetch('http://localhost:3001/account/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSubmit),
    });

    if (response.status === 201) {
      setFormSubmitted(true);
    } else {
      console.error('Error submitting form:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts" activeClassName="active">Chart of Accounts</NavLink>
        <NavLink to="/journal">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
      </div>
    <div className="user-form">
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountCategory">Account Category</label>
          <select
            id="accountCategory"
            name="accountCategory"
            value={formData.accountCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value=""></option>
            <option value="asset">Asset</option>
            <option value="liability">Liability</option>
            <option value="equity">Equity</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            required
            pattern="\d+"
            title={`Enter a valid integer between ${
              formData.accountCategory === "asset"
                ? "1000 and 1999"
                : formData.accountCategory === "liability"
                ? "2000 and 2999"
                : formData.accountCategory === "equity"
                ? "3000 and 3999"
                : formData.accountCategory === "income"
                ? "4000 and 4999"
                : formData.accountCategory === "expenses"
                ? "5000 and 5999"
                : ""
            } for the selected category`}
            onBlur={(e) => {
              if (!validateAccountNumber(e.target.value)) {
                e.target.setCustomValidity(
                  `Account number should be between ${
                    formData.accountCategory === "asset"
                      ? "1000 and 1999"
                      : formData.accountCategory === "liability"
                      ? "2000 and 2999"
                      : formData.accountCategory === "equity"
                      ? "3000 and 3999"
                      : formData.accountCategory === "income"
                      ? "4000 and 4999"
                      : formData.accountCategory === "expenses"
                      ? "5000 and 5999"
                      : ""
                  } for the selected category.`
                );
              } else {
                e.target.setCustomValidity("");
              }
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountName">Account Name</label>
          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            pattern="^[A-Za-z\s]+$"
            title="Enter text characters only"
            required
          />
        </div>
        <div className="form-group">
          <label>Normal Side</label>
          <div>{getNormalSideText()}</div>
        </div>
        <div className="form-group">
          <label htmlFor="balance">Initial Balance</label>
          <input
            type="text"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
            pattern="\d+(\.\d{1,2})?"
            title="Enter a number with up to two decimal places"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </div>

        <button className="centered-button" type="submit">
          Submit
        </button>
      </form>
      {formSubmitted && (
        <div className="success-message">
          Your information has been submitted. Thank you!
        </div>
      )}
      </div>
      </div>
  );
}

export default AddAccount;
