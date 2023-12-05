import React, { useState, useEffect } from 'react';
import './ChartOfAccounts.css';
import { NavLink, Link } from 'react-router-dom';

function ChartOfAccounts() {
  const [searchString, setSearchString] = useState('');
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB API endpoint when the component mounts
    fetch('http://localhost:3001/accounts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAccounts(data);
      })
      .catch((error) => {
        console.error('Error fetching accounts:', error);
      });
  }, []);

  
 const filterEntries = accounts.filter((account) => {
  const accountNumber = parseInt(account.number);

  // Check if the account number is valid (a number) and within the selected range
  if (!isNaN(accountNumber)) {
    let lowerBound, upperBound;

    // Use a switch statement to set the bounds based on the selected account number
    switch (selectedAccountNumber) {
      case "1000s":
        lowerBound = 1000;
        upperBound = 1999;
        break;
      case "2000s":
        lowerBound = 2000;
        upperBound = 2999;
        break;
      case "3000s":
        lowerBound = 3000;
        upperBound = 3999;
        break;
      case "4000s":
        lowerBound = 4000;
        upperBound = 4999;
        break;
      case "5000s":
        lowerBound = 5000;
        upperBound = 5999;
        break;
      case "6000s":
        lowerBound = 6000;
        upperBound = 6999;
        break;
      case "7000s":
        lowerBound = 7000;
        upperBound = 7999;
        break;
      case "8000s":
        lowerBound = 8000;
        upperBound = 8999;
        break;
      case "9000s":
        lowerBound = 9000;
        upperBound = 9999;
        break;
      default:
        // Default case if no range is selected
        lowerBound = 0;
        upperBound = 10000;
        break;
    }

    return (
      (searchString === '' ||
        (account.number.toString().includes(searchString) ||
          account.name.toLowerCase().includes(searchString.toLowerCase()))) &&
      (accountNumber >= lowerBound && accountNumber <= upperBound) &&
      (selectedCategory === '' || account.category === selectedCategory) &&
      (selectedAmount === '' || parseFloat(account.balance.replace('$', '').replace(',', '')) >= parseFloat(selectedAmount))
    );
  }

  return false;
 });

  const handleSearchInput = (event) => {
    setSearchString(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setSelectedAccountNumber(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
  };

  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts" activeClassName="active">
          Chart of Accounts
        </NavLink>
        <NavLink to="/journal">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
      </div>
      <h1>Chart Of Accounts</h1>
      <br></br>
      <br></br>
      <div
        className="search-filter-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50px',
          padding: '5px',
        }}
      >
        <input
          type="text"
          placeholder="Filter by account number or account name"
          value={searchString}
          onChange={handleSearchInput}
          className="search-input"
        />
        <select value={selectedAccountNumber} onChange={handleAccountNumberChange}>
          <option value="">All Account Numbers</option>
          <option value="1000s">1000-1999</option>
          <option value="2000s">2000-2999</option>
          <option value="3000s">3000-3999</option>
          <option value="4000s">4000-4999</option>
          <option value="5000s">5000-5999</option>
          <option value="6000s">6000-6999</option>
          <option value="7000s">7000-7999</option>
          <option value="8000s">8000-8999</option>
          <option value="9000s">9000-9999</option>
        </select>

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="asset">Asset</option>
          <option value="liability">Liability</option>
          <option value="equity">Equity</option>
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </select>

        <select value={selectedAmount} onChange={handleAmountChange}>
          <option value="">All Amounts</option>
          <option value="5000">$5,000+</option>
          <option value="10000">$10,000+</option>
          <option value="50000">$50,000+</option>
          <option value="100000">$100,000+</option>
        </select>
      </div>
      <div className="table-container">
        <table className="my-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Category</th>
              <th>Financial Statement</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {filterEntries.map((account, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'white-row' : 'grey-row'}
              >
                <td>
                  <Link to={`/account/${account.number}`}>
                    {account.number}
                  </Link>
                </td>
                <td>
                  <Link to={`/account/${account.number}`}>
                    {account.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/account/${account.number}`}>
                    {account.category.charAt(0).toUpperCase() + account.category.slice(1)}
                  </Link>
                </td>
                <td>
                  <Link to={`/account/${account.number}`}>
                    {account.financialStatement}
                  </Link>
                </td>
                <td>
                  <Link to={`/account/${account.number}`}>
                    {account.balance}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-button">
          <div className="left-button">
            <Link to="/addAccount">
              <button className="add-account-button">+ Add new account</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartOfAccounts;
