import React, { useState } from 'react';
import './ChartOfAccounts.css';
import { NavLink, Link } from 'react-router-dom';


function ChartOfAccounts() {
  const [searchString, setSearchString] = useState('');
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');


  const databaseEntries = [
    { number: 1001, name: "Cash", category: "Asset", financialStatement: "Balance Sheet", balance: "$51,822.76" },
    { number: 1002, name: "Accounts Receivable", category: "Asset", financialStatement: "Balance Sheet", balance: "$1,584.33" },
    { number: 1003, name: "Inventory", category: "Asset", financialStatement: "Balance Sheet", balance: "$35,442.43" },
    { number: 2001, name: "Accounts Payable", category: "Liability", financialStatement: "Balance Sheet", balance: "$2,434.85" },
    { number: 2201, name: "Payroll Tax", category: "Liability", financialStatement: "Balance Sheet", balance: "$875.15" },
    { number: 3001, name: "Common Stock", category: "Equity", financialStatement: "Balance Sheet", balance: "$15,222.36" },
    { number: 3800, name: "Retained Earnings", category: "Equity", financialStatement: "Balance Sheet", balance: "$1,875.78" },
    { number: 5001, name: "Product Sales", category: "Income", financialStatement: "Income Statement", balance: "$45,115.70" },
    { number: 5200, name: "Earned Interest", category: "Income", financialStatement: "Income Statement", balance: "$9,344.09" },
    { number: 7001, name: "Payroll", category: "Expenses", financialStatement: "Income Statement", balance: "$9,662.33" },
    { number: 7050, name: "Rent", category: "Expenses", financialStatement: "Income Statement", balance: "$13,315.44" },
  ];

  const filterEntries = databaseEntries.filter((account) =>
    (searchString === '' || 
    (account.number.toString().includes(searchString) ||
    account.name.toLowerCase().includes(searchString.toLowerCase()))) &&
    (selectedAccountNumber === '' || account.number.toString() === selectedAccountNumber) &&
    (selectedCategory === '' || account.category === selectedCategory) &&
    (selectedSubcategory === '' || account.subcategory === selectedSubcategory) &&
    (selectedAmount === '' || parseFloat(account.balance.replace('$', '').replace(',', '')) >= parseFloat(selectedAmount))
);

  const handleSearchInput = (event) => {
    setSearchString(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setSelectedAccountNumber(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
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
      <h1>Chart Of Accounts</h1>
      <br></br>
      <br></br>
      <div className="search-filter-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', padding: '5px' }}>
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

        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
          <option value="">All Subcategories</option>
          {/* Add options for subcategories */}
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
                    {account.category}
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
      </div>
    </div>
  );
}

export default ChartOfAccounts;
