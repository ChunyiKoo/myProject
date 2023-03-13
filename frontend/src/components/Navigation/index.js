import React from "react";
import AppHeader from "../AppHeader";

function Navigation({ isLoaded }) {
  return (
    <div>
      <AppHeader isLoaded={isLoaded} />
    </div>
  );
}

export default Navigation;
