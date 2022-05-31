/* library files imported to assist funtionality of this file */
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "../../firebase";
import { Popupmenu, MenuList, ListIconSignin } from "../../utils/styles";
import { getDatabase, ref, child, get } from "firebase/database";


/*controllers that enable functions operate with CRUD */
const PopoverNavMenu = () => {
  const { isAuthenticated, setUser } = useAuthState();
  const [username, setUsername] = useState(isAuthenticated?.email);

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

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${isAuthenticated?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().LastName);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        //console.error(error);
      });
  }, []);
/*controllers that enable functions operate with CRUD */
  return (
    <Popupmenu>
      {isAuthenticated ? (
        <>
          <MenuList
            onClick={() => handleSignout()}
            to=""
            smooth={true}
            duration={500}
          >
            {username} <ListIconSignin color={1} size={20} />
          </MenuList>
          <MenuList
            onClick={() => handleSignout()}
            to=""
            smooth={true}
            duration={500}
          >
            Sign out
          </MenuList>
        </>
      ) : (
        <>
          <MenuList to="getStarted" smooth={true} duration={500}>
            Sign in <ListIconSignin size={18} color={isAuthenticated ? 0 : 3} />
          </MenuList>
          {/* <MenuList>Sign up<ListIconSignup/></MenuList> */}
          <MenuList to="about" smooth={true} duration={500}>
            About
          </MenuList>

        </>
      )}
    </Popupmenu>
  );
};

export default PopoverNavMenu;
