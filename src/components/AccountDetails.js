import React from 'react';

function AccountDetails (props) {
  
  const { account } = props;

  return (
    <div>
      <h2>Account Details</h2>
      <p>Number: {account.number}</p>
      <p>Description: {account.description}</p>
      <p>Category: {account.category}</p>
      <p>Financial Statement: {account.financialStatement}</p>
      <p>Balance: {account.balance}</p>
    </div>
  );
}

export default AccountDetails;