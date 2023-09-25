import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/getUser')
      .then(users => setUsers(users.data))
      .catch(err => console.log(err))
  }, [])
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the user data to the server here (e.g., using axios)
    // For demonstration purposes, I'm just logging the data
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);

    // Redirect to the admin page
    navigate("/admin");
  };

  // Disable the "Next" button if any of the fields are empty
  const isButtonDisabled = !firstName || !lastName || !email;

  return (
    <div className="container">
      <h4>Welcome</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={isButtonDisabled}>Next</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
