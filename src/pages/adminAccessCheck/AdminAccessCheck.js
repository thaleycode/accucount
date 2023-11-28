import React, { useEffect } from "react";
import Admin from "../admin/Admin";
import NotAllowed from "../notAllowed/NotAllowed";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminAccessCheck() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect = (() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.valid) {
                    setRole(res.data.role);
                } else {
                    navigate('/notAllowed')
                }
            })
    })

    return (
    <div>
        {role == "admin" && <Admin />}
        {role !== "admin" && <NotAllowed />}
    </div>
  )
};

export default AdminAccessCheck;