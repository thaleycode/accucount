import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Journal.css';

function Journal() {
  const [data, setData] = useState([
    {
      date: '',
      account1: '',
      account2: '',
      debit: '',
      credit: '',
    },
  ]);

  const handleAddRow = () => {
    setData((prevData) => [
      ...prevData,
      {
        date: '',
        account1: '',
        account2: '',
        debit: '',
        credit: '',
      },
    ]);
  };

  const handleClear = () => {
    setData([
      {
        date: '',
        account1: '',
        account2: '',
        debit: '',
        credit: '',
      },
    ]);
    setComments('');
    setAttachedDocument(null);
  };

  const [comments, setComments] = useState('');
  const [attachedDocument, setAttachedDocument] = useState(null);

  const handleSelectChange = (index, fieldName, value) => {
    const newData = [...data];
    newData[index][fieldName] = value;
    setData(newData);
  };

  
  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setAttachedDocument(file);
  };

  return (
    <div>
        <div className="top-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chartOfAccounts">Chart of Accounts</NavLink>
          <NavLink to="/journal" activeClassName="active">Journal Entries</NavLink>
        <NavLink to="/generateReports">Generate Reports</NavLink>
        <NavLink to="/userManagement">User Management</NavLink>
        </div>
      <h1>Journal Entry</h1>
      <table className='table-container'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleSelectChange(index, 'date', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.account1}
                  onChange={(e) => handleSelectChange(index, 'account1', e.target.value)}
                  style={{ width: '100%' }} // Fill the cell width
                >
                  <option value=""></option>
                  <option value="Account A">1001 Cash</option>
                  <option value="Account B">1002 Accounts Receivable</option>
                  <option value="Account C">1003 Inventory</option>
                </select>
              </td>
              <td>
                <select
                  value={row.account2}
                  onChange={(e) => handleSelectChange(index, 'account2', e.target.value)}
                  style={{ width: '100%' }} 
                >
                  <option value=""></option>
                  <option value="Account A">1001 Cash</option>
                  <option value="Account B">1002 Accounts Receivable</option>
                  <option value="Account C">1003 Inventory</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={row.debit}
                  onChange={(e) => handleSelectChange(index, 'debit', e.target.value)}
                  min="0"
                  style={{ width: '100%' }} 
                  inputMode="numeric" 
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.credit}
                  onChange={(e) => handleSelectChange(index, 'credit', e.target.value)}
                  min="0"
                  style={{ width: '100%' }} // Fill the cell width
                  inputMode="numeric" // Set inputMode for numeric input
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button   onClick={handleAddRow}>Add Row</button>

      <div className="comments-section">
        <textarea
          className='comment'
          placeholder="Comments"
          value={comments}
          onChange={handleCommentsChange}
        ></textarea>
        </div>
        <div>
        <input
            className='doc-submit'
          type="file"
          accept=".pdf, .doc, .docx, .csv, .png, .jpg"
          onChange={handleDocumentChange}
        />
      </div>


      <div className="button-container">
        <button className="button">Submit</button>
        <button className="button" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default Journal;
