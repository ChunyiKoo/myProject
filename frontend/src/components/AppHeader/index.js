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
      <div className="spotform-usermenu-container">
        <NavLink
          style={{
            textDecoration: "none",
            color: "rgb(3, 101, 182)",
            fontSize: "16pt",
            // color: "#00525E",
            //fontWeight: "bolder",
          }}
          exact
          to="/spots/new"
          //activeClassName="AppHeader-create-a-spot-link"
        >
          Create a New Spot!
        </NavLink>
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
        {/* home button */}
        <NavLink style={{ textDecoration: "none" }} exact to="/">
          <div className="home-icon-container">
            <i className="fa-regular fa-face-laugh-wink fa-2x"></i>
            <div className="home-icon-text">happybnb</div>
          </div>
        </NavLink>

        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default AppHeader;
