import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Admin.css";

function Admin() {
  // Create separate state variables for each "Deactivate" button
  const [button1Text, setButton1Text] = useState("Deactivate");
  const [button2Text, setButton2Text] = useState("Deactivate");
  const [button3Text, setButton3Text] = useState("Deactivate");
  
  // Create separate state variables for each username edit mode
  const [user1Edit, setUser1Edit] = useState(false);
  const [user2Edit, setUser2Edit] = useState(false);
  const [user3Edit, setUser3Edit] = useState(false);
  
  // Create state variables for user names
  const [user1Name, setUser1Name] = useState("User 1");
  const [user2Name, setUser2Name] = useState("User 2");
  const [user3Name, setUser3Name] = useState("User 3");

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
          <div className="user-name">
            {user1Edit ? (
              <input
                type="text"
                value={user1Name}
                onChange={(e) => setUser1Name(e.target.value)}
              />
            ) : (
              user1Name
            )}
          </div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => setUser1Edit(!user1Edit)}
            >
              {user1Edit ? "Save" : "Edit"}
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(1)}
            >
              {button1Text === "Deactivate" ? "Deactivate" : "Activate"}
            </button>
            <Link to="/tempSuspend">
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
          <div className="user-name">
            {user2Edit ? (
              <input
                type="text"
                value={user2Name}
                onChange={(e) => setUser2Name(e.target.value)}
              />
            ) : (
              user2Name
            )}
          </div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => setUser2Edit(!user2Edit)}
            >
              {user2Edit ? "Save" : "Edit"}
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(2)}
            >
              {button2Text === "Deactivate" ? "Deactivate" : "Activate"}
            </button>
            <Link to="/tempSuspend">
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
          <div className="user-name">
            {user3Edit ? (
              <input
                type="text"
                value={user3Name}
                onChange={(e) => setUser3Name(e.target.value)}
              />
            ) : (
              user3Name
            )}
          </div>
          <div className="user-buttons">
            <button
              className="user-button"
              onClick={() => setUser3Edit(!user3Edit)}
            >
              {user3Edit ? "Save" : "Edit"}
            </button>
            <button
              className="user-button"
              onClick={() => handleButtonClick(3)}
            >
              {button3Text === "Deactivate" ? "Deactivate" : "Activate"}
            </button>
            <Link to="/tempSuspend">
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
