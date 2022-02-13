import React, { useState, useCallback } from "react";
import { useAuth, useAuthState } from "../../context/AuthContext";

import {
  AccessaccountContainer,
  AccessAccountWrapper,
  AccessButton,
  AccessButtonsWrap,
  AccessCloseBtn,
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
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);
      console.log("Loading")
      await signup(email, password);
    } catch {
      setError("Failed to create an account");
    }
  };

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
        {screen !== 1 ? (
          <AccessForgotPassword>Forgot Password?</AccessForgotPassword>
        ) : null}
        <AccessButtonsWrap>
          <AccessButton onClick={() => handleSubmit()}>
            {type[screen].button}
          </AccessButton>
          {screen !== 1 ? <AccessGoogleButton /> : null}
        </AccessButtonsWrap>
        {screen !== 1 ? (
          <AccessGoogleWraper>
            Or you can {type[screen].action} with your account.
          </AccessGoogleWraper>
        ) : null}
      </AccessFormWrapper>
      {/* </AccessAccountWrapper> */}
    </AccessaccountContainer>
  );
};

export default AccessAccount;
