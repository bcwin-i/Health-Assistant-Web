import React from "react";

//Local imports
import Header from "../components/Welcome/Header";
import IntroSection from "../components/Welcome/IntroSection";
import ServicesSection from "../components/Welcome/ServicesSection";

const Welcome = () => {
  return (
    <>
      <Header />
      <IntroSection />
      <ServicesSection />
    </>
  );
};

export default Welcome;
