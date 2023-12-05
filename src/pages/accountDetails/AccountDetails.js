import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './AccountDetails.css';

function AccountDetails() {
  const { accountNumber } = useParams(); // Get the account number from the URL params
  const [accountDetails, setAccountDetails] = useState(null); // State to store account details

  // Define state and useEffect for fetching journal entries related to the account
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Fetch account details for the specific account using accountNumber
    fetch(`http://localhost:3001/account/${accountNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setAccountDetails(data); // Set account details in the state
      })
      .catch((error) => {
        console.error('Error fetching account details:', error);
      });

    // Fetch journal entries for the specific account using accountNumber
    fetch(`http://localhost:3001/journalEntries/${accountNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setJournalEntries(data);
      })
      .catch((error) => {
        console.error('Error fetching journal entries:', error);
      });
  }, [accountNumber]);

  // Check if account details are available before rendering
  if (!accountDetails) {
    return <div>Loading...</div>;
  }

  const calculateDebitCredit = (entry) => {
    let debit = null;
    let credit = null;

    // Loop through transAmt array to find the matching entry
    for (const item of entry.transAmt) {
      if (item.account == accountNumber) {
        if (item.side === 'Debit') {
          debit = item.amount;
        } else if (item.side === 'Credit') {
          credit = item.amount;
        }
      }
    }
    return { debit, credit };
  };
  
  const calculateRunningBalance = (entries, category) => {
    let balance = 0;

    return entries.map((entry) => {
      const debit = entry.transAmt.find((item) => item.account == accountNumber && item.side === 'Debit');
      const credit = entry.transAmt.find((item) => item.account == accountNumber && item.side === 'Credit');

      if (category === 'asset' || category === 'expense') {
        // For asset and expense categories, debit increases balance, credit decreases it
        balance += (debit ? debit.amount : 0) - (credit ? credit.amount : 0);
      } else if (category === 'equity' || category === 'revenue' || category === 'liability') {
        // For equity, revenue, and liability categories, debit decreases balance, credit increases it
        balance += (credit ? credit.amount : 0) - (debit ? debit.amount : 0);
      }

      return { ...entry, balance };
    });
  };

  const formatCurrency = (value) => {
    if (value === null) {
      return ''; //for blank debit/credit columns
    }
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  const entriesWithBalance = calculateRunningBalance(journalEntries, accountDetails.category);

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
      <h3>{`Account Details for Account ${accountDetails.number} ${accountDetails.name}`}</h3>

      <table className="journal-entries-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>JE Number</th>
            <th>Comment</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {entriesWithBalance.map((entry) => (
            <tr key={entry.transNumber}>
              <td>{new Date(entry.transDate).toLocaleDateString()}</td>
              <td>{entry.transNumber}</td>
              <td>{entry.comments}</td>
              <td>{formatCurrency(calculateDebitCredit(entry).debit)}</td>
              <td>{formatCurrency(calculateDebitCredit(entry).credit)}</td>
              <td>{formatCurrency(entry.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountDetails;
