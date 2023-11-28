import React from 'react';

function MockTrialBalance() {
    function convertToCSV(objArray) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = 'Account Name,Debit (USD),Credit (USD)\r\n';
    
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in array[i]) {
                if (line !== '') line += ',';
    
                line += array[i][index];
            }
    
            str += line + '\r\n';
        }
    
        return str;
    }

    const handleBack = () => {
        // Logic to go back, e.g., using React Router or history API
    };

    const handleSave = () => {
        const csvData = convertToCSV(["fas", "gfbsdf"]);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'trial_balance.csv'); // File name for download
        link.style.visibility = 'hidden';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Save functionality triggered');
    };

    const handleEmail = () => {
        // Implement email logic (e.g., open email client with trial balance)
        console.log('Email functionality triggered');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container">
            <div className="header">
                <div className="back-button">
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="save-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEmail}>Email</button>
                    <button onClick={handlePrint}>Print</button>
                </div>
            </div>
            <div className="report-container">
                <h2>Trial Balance Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Account Name</th>
                            <th>Debit (USD)</th>
                            <th>Credit (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Inserting complete mock trial balance data */}
                        <tr>
                            <td>Cash</td>
                            <td>5,000</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Accounts Receivable</td>
                            <td>3,000</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Office Supplies</td>
                            <td>500</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Equipment</td>
                            <td>8,000</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Accounts Payable</td>
                            <td>-</td>
                            <td>3,000</td>
                        </tr>
                        <tr>
                            <td>Loan Payable</td>
                            <td>-</td>
                            <td>10,500</td>
                        </tr>
                        <tr>
                            <td>Service Revenue</td>
                            <td>-</td>
                            <td>9,000</td>
                        </tr>
                        <tr>
                            <td>Salaries Expense</td>
                            <td>4,000</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Rent Expense</td>
                            <td>1,200</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Utility Expense</td>
                            <td>800</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>22,500</strong></td>
                            <td><strong>22,500</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MockTrialBalance;