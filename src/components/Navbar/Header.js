import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

import {
  HeaderContainer,
  TextLogo,
  NavigationButton,
  NavigationButtonContainer,
} from "../../utils/styles";
import PopoverNavMenu from "./PopoverMenu";

const Header = () => {
  const [isNavPopoverOpen, setIsNavPopoverOpen] = useState(false);

  return (
    <HeaderContainer>
      <TextLogo>Health Assis-Madina</TextLogo>
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
