// frontend/src/components/Navigation/ProfileButton.js
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="dropdown">
        {/* <button onClick={openMenu}>
          <i className="fas fa-user-circle fa-2x" />
        </button> */}

        <button className="profile-button" onClick={openMenu}>
          <div className="profile-icon-container">
            <i className="fa-solid fa-bars"></i>
            <i className="fas fa-user-circle fa-lg" onClick={openMenu} />
          </div>
        </button>
        <div className={ulClassName} ref={ulRef}>
          <div>{"Hello, " + user.firstName}</div>
          <div>{user.email}</div>
          <NavLink to="/spots/current">Manage Spots </NavLink>
          <div className="logout-button-container">
            <button className="logout-button" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
