import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Admin.css";

function Admin() {
  // Create separate state variables for each "Deactivate" button
  const [button1Text, setButton1Text] = useState("Deactivate");
  const [button2Text, setButton2Text] = useState("Deactivate");
  const [button3Text, setButton3Text] = useState("Deactivate");

  // Function to handle button click and toggle text
  const handleButtonClick = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        setButton1Text((prevText) =>
          prevText === "Deactivate" ? "Activate" : "Deactivate"
        );
        break;
      case 2:
        setButton2Text((prevText) =>
          prevText === "Deactivate" ? "Activate" : "Deactivate"
        );
        break;
      case 3:
        setButton3Text((prevText) =>
          prevText === "Deactivate" ? "Activate" : "Deactivate"
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="admin">
        <h1>Welcome to the Administrative Page</h1>
        <h3>User Reports:</h3>
      </div>

      <div className="user-list">
        <div className="user-info">
          <div className="user-name">User 1</div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => handleButtonClick(1)}
            >
              Edit
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(1)}
            >
            </button>
            <Link href="../tempSuspend">
              <button className="user-button">Temporary Suspend</button>
            </Link>
            <button
              className="user-button"
              onClick={() => handleButtonClick(1)}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>

      <div className="user-list">
        <div className="user-info">
          <div className="user-name">User 2</div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => handleButtonClick(2)}
            >
              Edit
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(2)}
            >
            </button>
            <Link href="../TempSuspend">
              <button className="user-button">Temporary Suspend</button>
            </Link>
            <button
              className="user-button"
              onClick={() => handleButtonClick(2)}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>

      <div className="user-list">
        <div className="user-info">
          <div className="user-name">User 3</div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => handleButtonClick(3)}
            >
              Edit
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(3)}
            >
            </button>
            <Link href="../TempSuspend">
              <button className="user-button">Temporary Suspend</button>
            </Link>
            <button
              className="user-button"
              onClick={() => handleButtonClick(3)}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;