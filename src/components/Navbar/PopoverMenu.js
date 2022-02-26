import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../../firebase";
import { Popupmenu, MenuList, ListIconSignin } from "../../utils/styles";

const PopoverNavMenu = () => {
  const { isAuthenticated, setUser } = useAuthState();
  const handleSignout = () => {
    signOut(getAuth())
      .then((e) => {
        console.info("Logout: ", e);
        setUser();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Popupmenu>
      {isAuthenticated ? (
        <>
          <MenuList
            onClick={() => handleSignout()}
            to="footer"
            smooth={true}
            duration={500}
          >
            Sign out
          </MenuList>
        </>
      ) : (
        <>
          <MenuList to="getStarted" smooth={true} duration={500}>
            Sign in <ListIconSignin size={18} color={isAuthenticated ? 0 : 3}/>
          </MenuList>
          {/* <MenuList>Sign up<ListIconSignup/></MenuList> */}
          <MenuList to="about" smooth={true} duration={500}>
            About
          </MenuList>
          <MenuList to="footer" smooth={true} duration={500}>
            Contact
          </MenuList>
        </>
      )}
    </Popupmenu>
  );
};

export default PopoverNavMenu;
