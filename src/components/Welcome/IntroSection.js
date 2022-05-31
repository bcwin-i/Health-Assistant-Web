/* library files imported to assist funtionality of this file */
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
  IntroTitle,
} from "../../utils/styles";

//Local imports
import welcome from "../../assets/welcome.svg";

const IntroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

/*react controllers & CSS funtions defined */
  return (
    <IntroContainer id="about">
      <IntroImageContainer data-aos="fade-right">
        <IntroImage alt="healAssis. home svg" src={welcome} />
      </IntroImageContainer>
      <IntroTextContainer>
        <IntroTitle data-aos="fade-up">Polyclinic HIMS</IntroTitle>
        <IntroHeader data-aos="fade-up">
          Welcome, to a new world of modern health-care.
        </IntroHeader>
        <IntroDescription data-aos="fade-up">
          Easily and quickly manage all clinics inventories with a single
          system. With a secure and user-friendly UI, keep track of your
          patients' medical histories and dosage durations.
        </IntroDescription>
        <IntroButton
          data-aos="fade-up"
          to="getStarted"
          smooth={true}
          duration={500}
        >
          Start Working
          <RightArrow />
        </IntroButton>
      </IntroTextContainer>
    </IntroContainer>
  );
};

export default IntroSection;
