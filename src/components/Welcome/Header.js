import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

import {
  HeaderContainer,
  TextLogo,
  NavigationButton,
  NavigationButtonContainer,
  Popupmenu,
  MenuList,
  ListIconSignin,
  ListIconSignup,
} from "../../utils/styles";

const PopoverMenu = () => (
  <Popupmenu>
    <MenuList>Sign in <ListIconSignin/></MenuList>
    <MenuList>Sign up<ListIconSignup/></MenuList>
    <MenuList>Contact</MenuList>
    <MenuList>About</MenuList>
  </Popupmenu>
);

const Header = () => {
  const [isNavPopoverOpen, setIsNavPopoverOpen] = useState(false);

  return (
    <HeaderContainer>
      <TextLogo>healAssis.</TextLogo>
      <Popover
        isOpen={isNavPopoverOpen}
        positions={["bottom"]} // preferred positions by priority
        reposition={true}
        onClickOutside={() => setIsNavPopoverOpen(false)}
        content={<PopoverMenu />}
      >
        <NavigationButtonContainer
          onClick={() => setIsNavPopoverOpen(!isNavPopoverOpen)}
        >
          <NavigationButton />
        </NavigationButtonContainer>
      </Popover>
    </HeaderContainer>
  );
};

export default Header;
