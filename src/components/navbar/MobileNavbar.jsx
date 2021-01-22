import React, { useState } from "react";
import { HeaderNavigation, ALIGN, StyledNavigationList, StyledNavigationItem } from 'baseui/header-navigation';
import { Button, KIND, SIZE } from 'baseui/button';
import { Menu } from "baseui/icon";
import { Drawer } from 'baseui/drawer';
import { Link, useHistory } from "react-router-dom";

const MobileNavButton = (props) => {
  return (
    <Button
      {...props}
      $style={{
        width: "100%"
      }}
    >
      {props.children}
    </Button>
  );
}

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

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
          <Button
            kind={KIND.minimal}
            size={SIZE.mini}
            onClick={() => setOpen(true)}
          >
            <Menu size={32} />
          </Button>
          <Drawer
            isOpen={open}
            renderAll
            onClose={() => setOpen(false)}
          >
            <div
              style={{
                display: "block",
                padding: "10px"
              }}
            >
              <MobileNavButton
                onClick={() => {
                  window.open("https://api.rescuegroups.org/v5/public/docs", "_blank");
                  setOpen(false);
                }}
              >
                Documentation
              </MobileNavButton>
              <MobileNavButton
                onClick={() => {
                  history.push("dogsearch")
                  setOpen(false);
                }}
              >
                Dog Search
              </MobileNavButton>
              <MobileNavButton
                onClick={() => {
                  history.push("animalsearch")
                  setOpen(false);
                }}
              >
                Animal Search
              </MobileNavButton>
            </div>
          </Drawer>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default MobileNavbar;