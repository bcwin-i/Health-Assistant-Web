/* library files imported to assist funtionality of this file */
import React, { useState, useCallback } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";
import {
  AccessaccountContainer,
  AccessAccountWrapper,
  AccessButton,
  AccessButtonsWrap,
  AccessCloseBtn,
  AccessErrorMessage,
  AccessForgotPassword,
  AccessFormWrapper,
  AccessGoogleButton,
  AccessGoogleWraper,
  AccessHeader,
  AccessHeaderWrapper,
  AccessInputEmail,
  AccessInputPassword,
  AccessTextLabelTitle,
  AccessTitle,
  AccessTypeImage,
} from "../../utils/styles";

import { colors } from "../../utils/colors";
import { useAuthState } from "../../firebase";

/*react controllers & CSS funtions defined */
const type = [
  {
    title: "Sign in",
    header: "Here, your customers will be happier.",
    button: "Sign in",
    action: "login",
  },
  // {
  //   title: "Sign up",
  //   header: "This choice will be well received by your clients.",
  //   button: "Get Started",
  //   action: "register",
  // },
  {
    title: "Suscribe",
    header: "This choice will be well received by your clients.",
    button: "Suscribe",
    action: "suscribe",
  },
];

const AccessAccount = ({ screen, isOpen, closeAccess }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setUser } = useAuthState();

  const handleSignin = () => {
    setLoading(true);
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((e) => {
          console.log(e);
          setUser(e.user);
          // const db = getDatabase();
          // set(ref(db, "users/" + e.user.uid), {
          //   name: "Bekoe Kojo Isaac",
          //   admin: "admin",
          //   role: "HOD",
          //   email: e.user.email,
          //   url: ""
          // })
          //   .then((db) => {
          //     setUser(e.user);
          //     console.info("Database added: ", db)
          //     console.info("New detail is: ", isAuthenticated);
          //   })
          //   .catch((er) => {
          //     setError(er);
          //   });
        })
        .catch((e) => {
          console.error(e);
          setError("Wrong user credentials.");
          setLoading(false);
        });
      // createUserWithEmailAndPassword(auth, email, password).then((e) => {
      //   const user = res.user;
      //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
      //   const docs = await getDocs(q);
      //   if (docs.docs.length === 0) {
      //     await addDoc(collection(db, "users"), {
      //       uid: user.uid,
      //       name: user.displayName,
      //       authProvider: "google",
      //       email: user.email,
      //     });
      //   }
      // });
    } catch (e) {
      console.error("Login failed: ", e);
      setLoading(false);
    }
  };

  /*react controllers & CSS funtions defined */
  return (
    <AccessaccountContainer isOpen={isOpen}>
      {/* <AccessAccountWrapper> */}
      {/* <AccessTypeImage src={type[screen].image} /> */}
      <AccessFormWrapper>
        <AccessHeaderWrapper>
          <AccessTitle>{type[screen].title}</AccessTitle>
          <AccessCloseBtn onClick={closeAccess} />
        </AccessHeaderWrapper>
        <AccessHeader>{type[screen].header}</AccessHeader>
        <AccessTextLabelTitle>Email</AccessTextLabelTitle>
        <AccessInputEmail
          type="email"
          onChange={(text) => setEmail(text.target.value)}
        />
        {screen !== 1 ? (
          <>
            <AccessTextLabelTitle>Password</AccessTextLabelTitle>
            <AccessInputPassword
              type="password"
              onChange={(text) => setPassword(text.target.value)}
            />
          </>
        ) : null}
        {/* {screen !== 1 ? (
          <>
            <AccessTextLabelTitle>Confirm Password</AccessTextLabelTitle>
            <AccessInputPassword type="password" />
          </>
        ) : null} */}
        {error !== "" ? <AccessErrorMessage>{error}</AccessErrorMessage> : null}
        {screen !== 1 ? (
          <AccessForgotPassword></AccessForgotPassword>
        ) : null}
        <AccessButtonsWrap>
          {loading ? (
            <ClipLoader loading={true} size={35} color={colors.primary} />
          ) : (
            <AccessButton onClick={() => handleSignin()}>
              {type[screen].button}
            </AccessButton>
          )}
          {screen !== 1 ? <AccessGoogleButton /> : null}
        </AccessButtonsWrap>

        {screen !== 1 ? (
          <AccessGoogleWraper>
             {}
          </AccessGoogleWraper>
        ) : null}
      </AccessFormWrapper>
      {/* </AccessAccountWrapper> */}
    </AccessaccountContainer>
  );
};

export default AccessAccount;
