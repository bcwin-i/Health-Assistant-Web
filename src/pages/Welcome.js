import React, { useState } from "react";

//Local imports
import Header from "../components/Navbar/Header";
import IntroSection from "../components/Welcome/IntroSection";
import ServicesSection from "../components/Welcome/ServicesSection";
import AccessAccount from "../components/Welcome/AccessAccount";
import Footer from "../components/Footer/Footer";

const Welcome = () => {
  const [screen, setScreen] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleScreen = (screen) => {
    setIsOpen(true);
    setScreen(screen);
  };

  const closeAccess = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Header />
      <IntroSection />
      <ServicesSection handleScreen={handleScreen} />
      <AccessAccount
        screen={screen}
        handleScreen={handleScreen}
        isOpen={isOpen}
        closeAccess={closeAccess}
      />
      <Footer />
    </>
  );
};

export default Welcome;
