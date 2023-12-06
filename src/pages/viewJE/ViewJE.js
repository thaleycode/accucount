import React, { useState, useEffect } from 'react';
import './ViewJE.css';

function ViewJE() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Fetch journal entries from your API or data source
    // Replace this with your actual API endpoint or data fetching logic
    fetch('http://localhost:3001/journalEntries')
      .then((response) => response.json())
      .then((data) => {
        setJournalEntries(data);
      })
      .catch((error) => {
        console.error('Error fetching journal entries:', error);
      });
  }, []);

  return (
    <div className="view-je">
      <h1>View Journal Entries</h1>
      <table className="journal-entries-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Journal Entry Number</th>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {journalEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.journalEntryNumber}</td>
              <td>{entry.account}</td>
              <td>{entry.debit}</td>
              <td>{entry.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewJE;
