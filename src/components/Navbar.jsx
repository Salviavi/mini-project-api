import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ onLogout }) => {
    const token = localStorage.getItem("access_token");

    return (
        <div className="navbar">
            <div className="navbar-links">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-buttons">
                {!token ? (
                    <>
                        <Link to="/login" className="login-button">Login</Link>
                        <Link to="/register" className="signup-button">Sign Up</Link>
                    </>
                ) : (
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
