import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SignupLoginMenuButton from "./SignupLoginMenuButton";

function AppHeader({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <SignupLoginMenuButton />
      </div>
    );
  }

  return (
    <div className="app-header">
      <div className="app-header-container">
        <NavLink style={{ textDecoration: "none" }} exact to="/">
          <div className="home-icon-container">
            <i class="fa-regular fa-face-laugh-wink fa-2x"></i>
            <div className="home-icon-text">happybnb</div>
          </div>
        </NavLink>

        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default AppHeader;
