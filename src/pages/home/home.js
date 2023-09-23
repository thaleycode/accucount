import React from "react"
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/getUser')
    .then(users => setUsers(users.data))
    .catch(err => console.log(err))
  }, [])
  
  return (
    <div>
      <h4>Home Page</h4>
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
        <table className="table">
          <thead>
            <tr>
              First Name
            </tr>
            <tr>
              Last Name
            </tr>
            <tr>
              Email
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              <tr>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.name.email}</td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
};

export default Home;
