import React from "react";

import {
  AccessaccountContainer,
  AccessAccountWrapper,
  AccessButton,
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
  {
    title: "Sign up",
    header: "This choice will be well received by your clients.",
    button: "Get Started",
    action: "register",
  },
];

const AccessAccount = ({ screen, handleScreen }) => {
  return (
    <AccessaccountContainer>
      {/* <AccessAccountWrapper> */}
      {/* <AccessTypeImage src={type[screen].image} /> */}
      <AccessFormWrapper>
        <AccessHeaderWrapper>
          <AccessTitle>{type[screen].title}</AccessTitle>
          <AccessCloseBtn onClick={() => handleScreen(3)} />
        </AccessHeaderWrapper>
        <AccessHeader>{type[screen].header}</AccessHeader>
        <AccessTextLabelTitle>Email</AccessTextLabelTitle>
        <AccessInputEmail type="email" />
        <AccessTextLabelTitle>Password</AccessTextLabelTitle>
        <AccessInputPassword type="password" />
        {screen === 1 ? (
          <>
            <AccessTextLabelTitle>Confirm Password</AccessTextLabelTitle>
            <AccessInputPassword type="password" />
          </>
        ) : null}
        <AccessForgotPassword>Forgot Password?</AccessForgotPassword>
        <AccessButton>{type[screen].button}</AccessButton>
        <AccessGoogleWraper>
          Or you can {type[screen].action} with your{" "}
          <AccessGoogleButton>Google</AccessGoogleButton> account.
        </AccessGoogleWraper>
      </AccessFormWrapper>
      {/* </AccessAccountWrapper> */}
    </AccessaccountContainer>
  );
};

export default AccessAccount;
