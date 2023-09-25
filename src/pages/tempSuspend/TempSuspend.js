import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./TempSuspend.css";

function TempSuspend() {
  // Create state variables to store start and end dates for each user
  const [user1StartDate, setUser1StartDate] = useState("");
  const [user1EndDate, setUser1EndDate] = useState("");
  const [user2StartDate, setUser2StartDate] = useState("");
  const [user2EndDate, setUser2EndDate] = useState("");
  const [user3StartDate, setUser3StartDate] = useState("");
  const [user3EndDate, setUser3EndDate] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the selected start and end dates here
    console.log("User 1 Start Date:", user1StartDate);
    console.log("User 1 End Date:", user1EndDate);
    console.log("User 2 Start Date:", user2StartDate);
    console.log("User 2 End Date:", user2EndDate);
    console.log("User 3 Start Date:", user3StartDate);
    console.log("User 3 End Date:", user3EndDate);
  };

  return (
    <div>
      <h1>Temporary Suspend Page</h1>
      <h3> User Suspended Timeframe: </h3>
      <form onSubmit={handleSubmit}>
        <div className="user-container">
          <div className="user-label">User 1:</div>
          <div className="user-buttons">
            <input
              type="date"
              value={user1StartDate}
              onChange={(e) => setUser1StartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={user1EndDate}
              onChange={(e) => setUser1EndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <div className="user-container">
          <div className="user-label">User 2:</div>
          <div className="user-buttons">
            <input
              type="date"
              value={user2StartDate}
              onChange={(e) => setUser2StartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={user2EndDate}
              onChange={(e) => setUser2EndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <div className="user-container">
          <div className="user-label">User 3:</div>
          <div className="user-buttons">
            <input
              type="date"
              value={user3StartDate}
              onChange={(e) => setUser3StartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={user3EndDate}
              onChange={(e) => setUser3EndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      <button type="submit">
      <Link to="/admin">Back to Admin</Link>
      </button>
    </div>
  );
}

export default TempSuspend;
