import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

function Home(){

  const liquidityRatios = [
    {
      name: "Current Ratio",
      value: 1.65,
      status: "good",
    },
    {
      name: "Quick Ratio",
      value: 0.94,
      status: "warning",
    },
    // Add more liquidity ratios here...
  ];

  const operatingEfficiencyRatios = [
    {
      name: "Inventory Turnover",
      value: 4.2,
      status: "alert",
    },
    {
      name: "Asset Turnover",
      value: 1.5,
      status: "good",
    },
    {
      name: "Accounts Receivable Days",
      value: 50,
      status: "warning",
    },
    {
      name: "Accounts Payable Days",
      value: 27,
      status: "good",
    },
    {
      name: "Operating Expense Margin",
      value: "58%",
      status: "warning",
    },

    // Add more operating efficiency ratios here...
  ];

  const profitabilityRatios = [
    {
      name: "Gross Profit Margin",
      value: "42%",
      status: "alert",
    },
    {
      name: "Net Profit Margin",
      value: "6%",
      status: "warning",
    },
    // Add more profitability ratios here...
  ];

  const leverageRatios = [
    {
      name: "Debt Ratio",
      value: 2,
      status: "alert",
    },
    {
      name: "Debt to Equity Ratio",
      value: 1.2,
      status: "good",
    },
    // Add more leverage ratios here...
  ];

  const pendingJournalEntries = [
    {
      date: "2023-11-22",
      entryNumber: 12323,
      user: "thal1023",
    },
    {
      date: "2023-10-30",
      entryNumber: 12344,
      user: "jsmi1123",
    },
    // Add more pending journal entries here...
  ];

  const renderPendingJournalEntry = (entry) => (
    <tr key={entry.entryNumber}>
      <td>{entry.date}</td>
      <td>{entry.entryNumber}</td>
      <td>{entry.user}</td>
      <td>
        <button className="view-button">View</button>
      </td>
    </tr>
  );

  // Function to render a single table row
  const renderTableRow = (ratio) => (
    <tr key={ratio.name}>
      <td className={`status-text ${ratio.status}`}>
        {ratio.status === "good" && "Good"}
        {ratio.status === "warning" && "Warning"}
        {ratio.status === "alert" && "Alert"}
      </td>
      <td>{ratio.name}</td>
      <td>{ratio.value}</td>
    </tr>
  );


  return (
    <div style={{ marginBottom: '50px' }}>
      <div className="top-links">
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
        <NavLink to="/journal">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
      </div>
      <h1>Financial Ratios</h1>
      <h3>Liquidity Ratios</h3>
      <table className="ratio-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {liquidityRatios.map((ratio) => renderTableRow(ratio))}
        </tbody>
      </table>
      <h3>Operating Efficiency Ratios</h3>
      <table className="ratio-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {operatingEfficiencyRatios.map((ratio) => renderTableRow(ratio))}
        </tbody>
      </table>
      <h3>Profitability Ratios</h3>
        <table className="ratio-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {profitabilityRatios.map((ratio) => renderTableRow(ratio))}
          </tbody>
        </table>
      <h3>Leverage Ratios</h3>
      <table className="ratio-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {leverageRatios.map((ratio) => renderTableRow(ratio))}
        </tbody>
      </table>
      <br></br>
      <hr></hr>
      <br></br>
      <h1>Pending Journal Entries</h1>
      <table className="pending-entry-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Entry Number</th>
            <th>User</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingJournalEntries.map((entry) => renderPendingJournalEntry(entry))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
