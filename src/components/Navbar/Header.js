import React, { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { useAuthState } from "../../firebase";

import {
  HeaderContainer,
  TextLogo,
  NavigationButton,
  NavigationButtonContainer,
  ListIconSignin,
} from "../../utils/styles";
import PopoverNavMenu from "./PopoverMenu";
import logo256 from "../../assets/logo256.png";

const Header = () => {
  const [isNavPopoverOpen, setIsNavPopoverOpen] = useState(false);
  const { isAuthenticated, setUser } = useAuthState();

  return (
    <HeaderContainer shadow={isAuthenticated ? true : false}>
      <TextLogo
        color={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo256}
          style={{ height: 20, width: 20, marginRight: 10 }}
          alt="healAssis logo"
        />
        Health Assis-Madina
      </TextLogo>
      <Popover
        isOpen={isNavPopoverOpen}
        positions={["bottom"]} // preferred positions by priority
        reposition={true}
        onClickOutside={() => setIsNavPopoverOpen(false)}
        content={<PopoverNavMenu />}
        containerStyle={{ zIndex: 6 }}
      >
        <NavigationButtonContainer
          onClick={() => setIsNavPopoverOpen(!isNavPopoverOpen)}
        >
          <NavigationButton aria-label="navigation button" />
        </NavigationButtonContainer>
      </Popover>
    </HeaderContainer>
  );
};

export default Header;
