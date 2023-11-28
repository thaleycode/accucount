import React, { useEffect, useState } from "react";
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

  const setAccountSubcatOptions = (priorValue) => {
    const subcatBySelection = {
      asset: ["Checking", "Petty Cash", "Inventory", "Accounts Receivable"],
      liability: ["Payroll Tax", "Sales Tax Collected", "Accounts Payable", "Credit Memo Liability"],
      equity: ["Owner's Equity", "Common Stock", "Retained Earnings"],
      expenses: ["Payroll", "Insurance", "Rent"],
      income: ["Sales", "Earned Interest", "Misc Income"],
    };
    return subcatBySelection[priorValue];
  };

  const selectNormalSideText = (selectedAcct) => {

    // Set the display text based on the selected value
    if (selectedAcct === 'equity' || selectedAcct === 'liability' || selectedAcct === 'income') {
      return ('Credit');
    } else if (selectedAcct === 'asset' || selectedAcct === 'expenses') {
      return ('Debit');
    } else {
      return ('<br>'); // Clear text if needed **********needs work
    }
  };

  const [accountCategoryValue, setAccountCategoryValue] = useState('');
  const [accountSubcategoryOptions, setAccountSubcategoryOptions] = useState([]);
  
  const initialAccountCatValue = setAccountSubcatOptions('asset')[0] || '';
  const [accountSubcategoryValue, setAccountSubcategoryValue] = useState(initialAccountCatValue);

  const initialNormalSideValue = setAccountSubcatOptions('asset')[0] || '';
  const [normalSideText, setNormalSideText] = useState('');

  // Handle the change in the cat dropdown
  const handleAccountCategoryChange = (event) => {
    const selectedAcct = event.target.value;
    setAccountCategoryValue(selectedAcct);

    // Update the subcat dropdown options based on the selected value
    const subcatOptions = setAccountSubcatOptions(selectedAcct);
    setAccountSubcategoryOptions(subcatOptions);

    const normalSideText = selectNormalSideText(selectedAcct);
    setNormalSideText(normalSideText)
  };

  // handle the change in the subcat dropdown
  const handleAccountSubcategoryChange = (event) => {
    const selectedSubcat = event.target.value;
    setAccountSubcategoryValue(selectedSubcat);
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
          <label htmlFor="accountCategory">Account Category</label>
          <select id="accountCategory" value={accountCategoryValue} onChange={handleAccountCategoryChange}>
            <option value=""></option>
            <option value="asset">Asset</option>
            <option value="liability">Liability</option>
            <option value="equity">Equity</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="accountSubcategory">Account Subcategory</label>
          <select id="accountSubcategory" value={accountSubcategoryValue} onChange={handleAccountSubcategoryChange}>
          {accountSubcategoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="normalSide">Normal Side</label>
          <div
            type="text"
            name="normalSide"
            value={formData.normalSide}
            onChange={handleInputChange}
          >{normalSideText}</div>
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