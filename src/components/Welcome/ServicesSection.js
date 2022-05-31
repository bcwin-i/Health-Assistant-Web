/* library files imported to assist funtionality of this file */
import React, { useEffect } from "react";
import AOS from "aos";

//Local imports
import {
  CardViewContainer,
  ServiceImage,
  ServiceTitle,
  ServiceBottom,
  ServiceParagraph,
  SeviceDescription,
  ServiceContainer,
  CardWrapper,
} from "../../utils/styles";
import effective from "../../assets/effective.svg";
import launch from "../../assets/launch.svg";

const ServicesSection = ({ handleScreen }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const openLink =()=> {
    window.open("https://www.who.int/news")
  }

  return (
    <ServiceContainer id="getStarted">
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={effective} alt="signin" />
          <SeviceDescription>
            <ServiceTitle>WORK</ServiceTitle>
            <ServiceParagraph>
              EASILY MANAGE PATIENT-RELATED TASKS.
            </ServiceParagraph>
            <ServiceBottom onClick={() => handleScreen(0)}>
              Sign In
            </ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={launch} alt="signup" />
          <SeviceDescription>
            <ServiceTitle>HEALTH NEWS</ServiceTitle>
            <ServiceParagraph>
              {/*t */}
              STAY UP TO DATE ON HEALTH NEWS
            </ServiceParagraph>
            <ServiceBottom onClick={()=> openLink()}>
              Stay Health
            </ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
    </ServiceContainer>
  );
};

export default ServicesSection;
