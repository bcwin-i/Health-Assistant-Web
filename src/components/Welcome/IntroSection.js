import React, { useEffect } from "react";
import AOS from "aos";

import {
  IntroContainer,
  IntroImageContainer,
  IntroImage,
  IntroTextContainer,
  IntroHeader,
  IntroDescription,
  IntroButton,
  RightArrow,
} from "../../utils/styles";

//Local imports
import welcome from "../../assets/welcome.svg";

const IntroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <IntroContainer>
      <IntroImageContainer data-aos="fade-right">
        <IntroImage alt="healAssis. home svg" src={welcome} />
      </IntroImageContainer>
      <IntroTextContainer>
        <IntroHeader data-aos="fade-up">
          Welcome, to a new world of modern health-care assistant
        </IntroHeader>
        <IntroDescription data-aos="fade-up">
          Easily and quickly manage all hospital inventories with a single
          system. With a secure and user-friendly UI, you can keep track of your
          patients' medical histories and dosage durations.
        </IntroDescription>
        <IntroButton data-aos="fade-up" to="getStarted" smooth={true} duration={500}>
          Get Started
          <RightArrow />
        </IntroButton>
      </IntroTextContainer>
    </IntroContainer>
  );
};

export default IntroSection;
