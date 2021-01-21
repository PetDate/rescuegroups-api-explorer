import React from "react";
import { HeaderNavigation, ALIGN, StyledNavigationList, StyledNavigationItem } from 'baseui/header-navigation';
import { Button, KIND } from 'baseui/button';
import { Link, useHistory } from "react-router-dom";

const NavButton = (props) => {
  const history = useHistory();

  return (
    <Button
      {...props}
      kind={KIND.minimal}
      onClick={() => history.push(props.to)}
    >
      {props.children}
    </Button>
  );
};

const DesktopNavbar = () => {
  return (
    <HeaderNavigation
      style={{
        padding: "10px",
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit", }}>
            Rescue Groups API Explorer
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <NavButton to="dogsearch">
            Dog Search
          </NavButton>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button
            onClick={() => window.open("https://api.rescuegroups.org/v5/public/docs", "_blank")}
          >
            Documentation
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default DesktopNavbar;