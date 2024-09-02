import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css"

const Home = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    const getUsers = () => {
        axios.get("https://reqres.in/api/users/")
        .then((res) => {
            setUsers(res.data.data);
        })
        .catch((err) => {
            console.log(err.response);
        })
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        getUsers();
    }, []);

    const isLoggedIn = localStorage.getItem("access_token");

    return (
        <div className="home-container">
            <Navbar onLogout={handleLogout} />

            <div className="users-list">
                {users.map((user) => (
                    <div className="user-card" key={user.id}>
                        <Link to={`/user-detail/${user.id}`}>
                            <img width={100} height={100} src={user.avatar} alt={`${user.first_name}'s avatar`} />
                            <h2>{user.first_name}</h2>
                            <div className="email-box">{user.email}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
