import React, { useState } from "react";

//Local imports
import Header from "../components/Welcome/Header";
import IntroSection from "../components/Welcome/IntroSection";
import ServicesSection from "../components/Welcome/ServicesSection";
import AccessAccount from "../components/Welcome/AccessAccount";

const Welcome = () => {
  const [screen, setScreen] = useState(3);

  const handleScreen = (screen) => {
    setScreen(screen);
  };

  return (
    <>
      <Header />
      <IntroSection />
      <ServicesSection handleScreen={handleScreen} />
      {screen !== 3 ? (
          <AccessAccount screen={screen} handleScreen={handleScreen}/>
      ) : null}
    </>
  );
};

export default Welcome;
