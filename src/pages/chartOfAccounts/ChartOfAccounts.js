import React from 'react';
import './ChartOfAccounts.css';
import { NavLink, Link } from 'react-router-dom';


function ChartOfAccounts() {

  const databaseEntries = [
    { number: 1001, description: "Cash", category: "Asset", financialStatement: "Balance Sheet", balance: "$51,822.76" },
    { number: 1002, description: "Accounts Receivable", category: "Asset", financialStatement: "Balance Sheet", balance: "$1,584.33" },
    { number: 1003, description: "Inventory", category: "Asset", financialStatement: "Balance Sheet", balance: "$35,442.43" },
    { number: 2001, description: "Accounts Payable", category: "Liability", financialStatement: "Balance Sheet", balance: "$2,434.85" },
    { number: 2201, description: "Payroll Tax", category: "Liability", financialStatement: "Balance Sheet", balance: "$875.15" },
    { number: 3001, description: "Common Stock", category: "Equity", financialStatement: "Balance Sheet", balance: "$15,222.36" },
    { number: 3800, description: "Retained Earnings", category: "Equity", financialStatement: "Balance Sheet", balance: "$1,875.78" },
    { number: 5001, description: "Product Sales", category: "Income", financialStatement: "Income Statement", balance: "$45,115.70" },
    { number: 5200, description: "Earned Interest", category: "Income", financialStatement: "Income Statement", balance: "$9,344.09" },
    { number: 7001, description: "Payroll", category: "Expenses", financialStatement: "Income Statement", balance: "$9,662.33" },
    { number: 7050, description: "Rent", category: "Expenses", financialStatement: "Income Statement", balance: "$13,315.44" },
  ];


  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts" activeClassName="active">Chart of Accounts</NavLink>
        <NavLink to="/journal">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
      </div>
      <h1>Chart Of Accounts</h1>
      <div className="table-container">
        <table className="my-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Description</th>
              <th>Category</th>
              <th>Financial Statement</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {databaseEntries.map((account, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'white-row' : 'grey-row'} >
                <td>{account.number}</td>
                <td>{account.description}</td>
                <td>{account.category}</td>
                <td>{account.financialStatement}</td>
                <td>{account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChartOfAccounts;

{Array.from({ length: 13 }).map((_, rowIndex) => (
  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'white-row' : 'grey-row'}>
    <td>{}]</td>
    <td>Row {rowIndex + 1}, Col 2</td>
    <td>Row {rowIndex + 1}, Col 3</td>
    <td>Row {rowIndex + 1}, Col 4</td>
    <td>Row {rowIndex + 1}, Col 5</td>
  </tr>
))}