import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/UserDetail.css";
const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getUser = () => {
    setLoading(true);
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="user-detail-container">
        <div key={user.id}>
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <div className="user-detail-header">
            <h4>{user.first_name}</h4>
            <h4>{user.last_name}</h4>
          </div>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
