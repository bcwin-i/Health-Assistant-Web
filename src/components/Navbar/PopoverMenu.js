import { Popupmenu, MenuList, ListIconSignin } from "../../utils/styles";

const PopoverNavMenu = () => (
  <Popupmenu>
    <MenuList to="getStarted" smooth={true} duration={500}>
      Sign in <ListIconSignin />
    </MenuList>
    {/* <MenuList>Sign up<ListIconSignup/></MenuList> */}
    <MenuList to="about" smooth={true} duration={500}>
      About
    </MenuList>
    <MenuList to="footer" smooth={true} duration={500}>
      Contact
    </MenuList>
  </Popupmenu>
);

export default PopoverNavMenu;