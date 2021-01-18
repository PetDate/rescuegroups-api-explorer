import React from "react";
import { HeaderNavigation, ALIGN, StyledNavigationList, StyledNavigationItem } from 'baseui/header-navigation';
import { Button } from 'baseui/button';

const AppNavbar = () => {
  return (
    <HeaderNavigation
      style={{
        padding: "10px",
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Rescue Groups API Explorer</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button
            onClick={() => window.location.href = "https://api.rescuegroups.org/v5/public/docs"}
          >
            Documentation
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default AppNavbar;