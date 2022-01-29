import React from "react";
import {
  IntroContainer,
  IntroImageContainer,
  IntroImage,
  IntroTextContainer,
  IntroHeader,
  IntroDescription,
  IntroButton,
  RightArrow
} from "../../utils/styles";

//Local imports
import welcome from "../../assets/welcome.svg";

const IntroSection = () => {
  return (
    <IntroContainer>
      <IntroImageContainer>
        <IntroImage alt="healAssis. home svg" src={welcome} />
      </IntroImageContainer>
      <IntroTextContainer>
        <IntroHeader>
          Welcome, to a new world of modern health-care assistant
        </IntroHeader>
        <IntroDescription>
          Easily and quickly manage all hospital inventories with a single
          system. With a secure and user-friendly UI, you can keep track of your
          patients' medical histories and dosage durations.
        </IntroDescription>
        <IntroButton>
            Get Started
            <RightArrow/>
        </IntroButton>
      </IntroTextContainer>
    </IntroContainer>
  );
};

export default IntroSection;
