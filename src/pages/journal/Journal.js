import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Journal.css';

function Journal() {
  const [journalData, setJournalData] = useState([
    {
      date: '',
      account1: '',
      account2: '',
      debitAmount: '',
      creditAmount: '',
    },
  ]);

  const [accounts, setAccounts] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null); // Allow null for optional file submission

  useEffect(() => {
    // Fetch all accounts data
    fetch('http://localhost:3001/api/accounts')
      .then((response) => response.json())
      .then((data) => {
        const accountsData = data.map((account) => ({
          number: account.number,
          name: account.name,
        }));
        console.log(accountsData)
        setAccounts(accountsData);
      })
      .catch((error) => console.error('Error fetching accounts:', error));
  }, []);

  const handleAddRow = () => {
    setJournalData((prevData) => [
      ...prevData.map((row) => ({ ...row })),
      {
        date: '',
        account1: '',
        account2: '',
        debitAmount: '',
        creditAmount: '',
      },
    ]);
  };

  const handleSelectChange = (index, fieldName, value) => {
    const newData = [...journalData];
    newData[index][fieldName] = value;
    setJournalData(newData);
  };

  const handleAmountChange = (index, fieldName, value) => {
    if (/^\d+(\.\d{0,2})?$/.test(value) || value === '') {
      const newData = [...journalData];
      newData[index][fieldName] = value;
      setJournalData(newData);
    }
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setSelectedDocument(file);
  };

  const handleClear = () => {
    setJournalData([
      {
        date: '',
        account1: '',
        account2: '',
        debitAmount: '',
        creditAmount: '',
      },
    ]);

    const docInput = document.querySelector('.doc-submit');
    if (docInput) {
      docInput.value = '';
    }
  };

  const handleSubmit = async () => {
    try {
      // Variables to track total debit and credit amounts
      let totalDebit = 0;
      let totalCredit = 0;

      // Loop through all rows in journalData and calculate total debit and credit amounts
      for (const row of journalData) {
        const debitAmount = parseFloat(row.debitAmount);
        const creditAmount = parseFloat(row.creditAmount);

        if (!isNaN(debitAmount)) {
          totalDebit += debitAmount;
        }

        if (!isNaN(creditAmount)) {
          totalCredit += creditAmount;
        }
      }

      // Check if total debit and total credit amounts are equal
      if (totalDebit !== totalCredit) {
        alert('Debit and credit amounts are not equal. Please balance the transaction.');
        return; // Prevent further submission
      }

      // If the amounts match, proceed with journal entry submission (with optional file)
      const transAmt = [];

      // Loop through all rows in journalData and add them to transAmt array
      for (const row of journalData) {
        const debitAmount = parseFloat(row.debitAmount);
        const creditAmount = parseFloat(row.creditAmount);

        if (!isNaN(debitAmount)) {
          transAmt.push({
            account: row.account1,
            side: 'Debit',
            amount: debitAmount,
          });
        }

        if (!isNaN(creditAmount)) {
          transAmt.push({
            account: row.account2,
            side: 'Credit',
            amount: creditAmount,
          });
        }
      }

      // Construct the schema to submit
      const journalEntry = {
        transDate: journalData[0].date,
        transAmt: transAmt,
        comments: document.querySelector('.comment').value,
        filePath: selectedDocument ? selectedDocument.name : '', // Optional file attachment
        user: '',
        submitDateTime: new Date(),
        transNumber: 1, // Needs to be made
      };

      // Send the data to the server for MongoDB insertion
      const response = await fetch('http://localhost:3001/submit-journal-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ journalEntry }),
      });

      if (response.status === 200) {
        // Clear the file input
        setSelectedDocument(null);

        // Clear the form and show a success message
        setJournalData(
          Array.from({ length: journalData.length }, () => ({
            date: '',
            account1: '',
            account2: '',
            debitAmount: '',
            creditAmount: '',
          }))
        );
        handleClear();
        document.querySelector('.comment').value = '';
        alert('Journal entry submitted successfully.');
      } else {
        alert('Failed to submit journal entry.');
      }
    } catch (error) {
      console.error('Error submitting journal entry:', error);
    }
  };


  return (
    <div>
      <div className="top-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
        <NavLink to="/journal" activeClassName="active">
          Journal Entries
        </NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
      </div>
      <h1>Journal Entry</h1>
      <table className="table-container">
        <thead>
          <tr>
            <th>Date</th>
            <th>Debit Account</th>
            <th>Credit Account</th>
            <th>Debit Amount</th>
            <th>Credit Amount</th>
          </tr>
        </thead>
        <tbody>
          {journalData.map((row, index) => (
            <tr key={index}>
              <td>
                {index === 0 ? (
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleSelectChange(index, 'date', e.target.value)}
                  />
                ) : null}
              </td>
              <td>
                {index === 0 ? (
                  <select
                    value={row.account1}
                    onChange={(e) => handleSelectChange(index, 'account1', e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option key={account.number} value={account.number}>
                        {`${account.number} ${account.name}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={row.account1}
                    onChange={(e) => handleSelectChange(index, 'account1', e.target.value)}
                    style={{ width: '100%' }}
                    disabled={row.account2 !== ''}
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option key={account.number} value={account.number}>
                        {`${account.number} ${account.name}`}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {index === 0 ? (
                  <select
                    value={row.account2}
                    onChange={(e) => handleSelectChange(index, 'account2', e.target.value)}
                    style={{ width: '100%' }}
                    disabled={row.account1 !== ''}
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option key={account.number} value={account.number}>
                        {`${account.number} ${account.name}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={row.account2}
                    onChange={(e) => handleSelectChange(index, 'account2', e.target.value)}
                    style={{ width: '100%' }}
                    disabled={row.account1 !== ''}
                  >
                    <option value=""></option>
                    {accounts.map((account) => (
                      <option key={account.number} value={account.number}>
                        {`${account.number} ${account.name}`}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                {index === 0 ? (
                  <input
                    type="text"
                    value={row.debitAmount}
                    onChange={(e) => handleAmountChange(index, 'debitAmount', e.target.value)}
                    min="0"
                    style={{ width: '100%' }}
                    inputMode="numeric"
                  />
                ) : (
                  <input
                    type="text"
                    value={row.debitAmount}
                    onChange={(e) => handleAmountChange(index, 'debitAmount', e.target.value)}
                    min="0"
                    style={{ width: '100%' }}
                    inputMode="numeric"
                    disabled={row.account2 !== ''}
                  />
                )}
              </td>
              <td>
                {index === 0 ? (
                  <input
                    type="text"
                    value={row.creditAmount}
                    onChange={(e) => handleAmountChange(index, 'creditAmount', e.target.value)}
                    min="0"
                    style={{ width: '100%' }}
                    inputMode="numeric"
                    disabled={true}
                  />
                ) : (
                  <input
                    type="text"
                    value={row.creditAmount}
                    onChange={(e) => handleAmountChange(index, 'creditAmount', e.target.value)}
                    min="0"
                    style={{ width: '100%' }}
                    inputMode="numeric"
                    disabled={row.account1 !== ''}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>


      </table>
      <div className="form-controls">
        <div className="form-control">
          <button onClick={handleAddRow}>Add Row</button>
        </div>
        <div className="form-control">
          <div className="comments-section">
            <textarea className="comment" placeholder="Comments"></textarea>
          </div>
        </div>
        <div>
          <input
            className="doc-submit"
            type="file"
            accept=".pdf, .doc, .docx, .csv, .png, .jpg"
            onChange={handleDocumentChange}
          />
        </div>
        <div className="form-control">
          <div className="buttons">
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="button" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journal;
