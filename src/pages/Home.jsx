import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();

  const handlePagePrev = () => {
    setPage((prev) => prev - 1);
  };

  const handlePageNext = () => {
    setPage((prev) => prev + 1);
  };

  const getUsers = () => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      })

      .then((res) => {
        setUsers(res.data.data);
        setTotalPage(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const isLoggedIn = localStorage.getItem("access_token");

  return (
    <div className="home-container">
      <Navbar onLogout={handleLogout} />

      <div className="users-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <Link to={`/user-detail/${user.id}`}>
              <img
                width={100}
                height={100}
                src={user.avatar}
                alt={`${user.first_name}'s avatar`}
              />
              <h2>{user.first_name}</h2>
              <div className="email-box">{user.email}</div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <button disabled={page <= 1} onClick={handlePagePrev}>
          Prev
        </button>
        <button disabled={page >= totalPage} onClick={handlePageNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
