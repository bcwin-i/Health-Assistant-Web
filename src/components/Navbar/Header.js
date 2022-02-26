import React, { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { useAuthState } from "../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

import {
  HeaderContainer,
  TextLogo,
  NavigationButton,
  NavigationButtonContainer,
  ListIconSignin,
} from "../../utils/styles";
import PopoverNavMenu from "./PopoverMenu";

const Header = () => {
  const [isNavPopoverOpen, setIsNavPopoverOpen] = useState(false);
  const { isAuthenticated, setUser } = useAuthState();
  const [username, setUsername] = useState(isAuthenticated?.email);

  useEffect(() => {
    getName(isAuthenticated?.uid);
  }, []);

  const getName = (uid) => {
    const db = getDatabase();
    // const starCountRef = ref(db, "users/" + uid);
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setUsername(data?.name);
    //   //console.log("User bd: ", data.name)
    //   //updateStarCount(postElement, data);
    // });

    const dbRef = ref(db);
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val().name);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        //console.error(error);
      });
  };

  return (
    <HeaderContainer shadow={isAuthenticated ? true : false}>
      <TextLogo color={1}>
        {isAuthenticated ? username : "Health Assis-Madina"}{" "}
        {isAuthenticated ? <ListIconSignin color={1} size={25} /> : null}
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
