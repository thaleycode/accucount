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

  // Function to render a single table row
  const renderTableRow = (ratio) => (
    <tr key={ratio.name}>
      <td className={`status-circle ${ratio.status}`}></td>
      <td>{ratio.name}</td>
      <td>{ratio.value}</td>
    </tr>
  );


  return (
    <div>
        <div className="top-links">
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
          <NavLink to="/journal">Journal Entries</NavLink>
          <NavLink to="/generateReports">Generate Reports</NavLink>
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
    </div>
  );
}

export default Home;
