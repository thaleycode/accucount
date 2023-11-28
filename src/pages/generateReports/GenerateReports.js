import React, { useState } from "react"
import { NavLink } from 'react-router-dom';
import './GenerateReports.css';

function GenerateReports() {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  
  const handleReportChange = (e) => {
    setReportType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const generateReport = () => {
    // Here you can add your logic to generate the report
    console.log(`Generating ${reportType} from ${startDate} to ${endDate}`);
    // Possible API call or other operations
  };

  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
        <NavLink to="/journal" activeClassName="active">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
      </div>
      <div className="main-container">
        <h1>Generate Reports</h1>
        <table className='table-container'>
          <thead>
            <th>Select Report Type</th>
            <th>Start Date</th>
            <th>End Date</th>
          </thead>
          <tbody>
            <td>
              <select id="reportType" value={reportType} onChange={handleReportChange}>
                  <option value="trialBalance">Trial Balance</option>
                  <option value="incomeStatement">Income Statement</option>
                  <option value="balanceSheet">Balance Sheet</option>
                  <option value="retainedEarnings">Retained Earnings Statement</option>
              </select>
            </td>
            <td>
              <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
            </td>
            <td>
              <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
            </td>
          </tbody>
        </table>
        <NavLink to='/reports'><button onClick={generateReport}>Generate Report</button></NavLink>
      </div>
    </div>
  );
}

export default GenerateReports;
