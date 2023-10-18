import React, { useState } from "react";
import "./UserForm.css";

function UserForm() {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    accountDescription: "",
    normalSide: "",
    accountCategory: "",
    accountSubcategory: "",
    initialBalance: "",
    debit: "",
    credit: "",
    balance: "",
    dateTime: "",
    userId: "",
    order: "",
    statement: "",
    comment: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions here, such as sending data to a server
    // and then reset the form and display a success message.
    setFormData({
      accountName: "",
      accountNumber: "",
      accountDescription: "",
      normalSide: "",
      accountCategory: "",
      accountSubcategory: "",
      initialBalance: "",
      debit: "",
      credit: "",
      balance: "",
      dateTime: "",
      userId: "",
      order: "",
      statement: "",
      comment: "",
    });

    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="user-form">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountDescription">Account Description</label>
          <input
            type="text"
            name="accountDescription"
            value={formData.accountDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="normalSide">Normal Side</label>
          <input
            type="text"
            name="normalSide"
            value={formData.normalSide}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountCategory">Account Category</label>
          <input
            type="text"
            name="accountCategory"
            value={formData.accountCategory}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountSubcategory">Account Subcategory</label>
          <input
            type="text"
            name="accountSubcategory"
            value={formData.accountSubcategory}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="initialBalance">Initial Balance</label>
          <input
            type="text"
            name="initialBalance"
            value={formData.initialBalance}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="debit">Debit</label>
          <input
            type="text"
            name="debit"
            value={formData.debit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="credit">Credit</label>
          <input
            type="text"
            name="credit"
            value={formData.credit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="balance">Balance</label>
          <input
            type="text"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date/Time Account Added</label>
          <input
            type="text"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="order">Order</label>
          <input
            type="text"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="statement">Statement</label>
          <input
            type="text"
            name="statement"
            value={formData.statement}
            onChange={handleInputChange}
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

        <button class="centered-button" type="submit">Submit</button>
      </form>
      {formSubmitted && (
        <div className="success-message">
          Your information has been submitted. Thank you!
        </div>
      )}
    </div>
  );
}

export default UserForm;