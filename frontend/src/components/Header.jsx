import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import logo from "../assets/walkie-talkie.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo large-logo">
        <Link to="/" style={{ display: "flex" }}>
          <img
            alt="logo"
            style={{ width: "60px", height: "55px" }}
            src={logo}
          />
          <h3 style={{ alignSelf: "center", paddingTop: "12px" }}>
            Codec Support
          </h3>
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>{" "}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
