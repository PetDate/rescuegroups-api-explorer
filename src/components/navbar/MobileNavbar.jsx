import React, { useState } from "react";
import { HeaderNavigation, ALIGN, StyledNavigationList, StyledNavigationItem } from 'baseui/header-navigation';
import { Button, KIND, SIZE } from 'baseui/button';
import { Menu } from "baseui/icon";
import { Drawer } from 'baseui/drawer';
import { StatefulMenu } from 'baseui/menu';
import { useHistory } from "react-router-dom";

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
        <StyledNavigationItem>Rescue Groups API Explorer</StyledNavigationItem>
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
            <StatefulMenu
              items={[
                { label: "Documentation", callback: () => { window.open("https://api.rescuegroups.org/v5/public/docs", "_blank") } },
                { label: "Dog Search", callback: () => { history.push("/dogsearch") }  }
              ]}
              onItemSelect={({ item }) => { item.callback(); setOpen(false); }}
              renderAll
            />
          </Drawer>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default MobileNavbar;