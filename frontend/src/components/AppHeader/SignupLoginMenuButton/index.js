import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "./OpenModalButton";
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";

function SignupLoginMenuButton() {
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
          <div className="button-container">
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </div>
          <div className="button-container">
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupLoginMenuButton;
