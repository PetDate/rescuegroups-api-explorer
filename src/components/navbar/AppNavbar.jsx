import React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import "./navbar.css";

const AppNavbar = () => {
  return (
    <React.Fragment>
      <div className="desktop">
        <DesktopNavbar />
      </div>
      <div className="mobile">
        <MobileNavbar />
      </div>
    </React.Fragment>
  );
};

export default AppNavbar;
