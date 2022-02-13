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

  return (
    <ServiceContainer id="getStarted">
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={effective} alt="signin" />
          <SeviceDescription>
            <ServiceTitle>Effectiveness</ServiceTitle>
            <ServiceParagraph>
              Effectiveness With just a few clicks, you can easily manage and
              publish all client-related tasks. Interact with clients as quickly
              as possible to learn about their well-being.
            </ServiceParagraph>
            <ServiceBottom onClick={() => handleScreen(0)}>
              Sign in
            </ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={launch} alt="signup" />
          <SeviceDescription>
            <ServiceTitle>Launch</ServiceTitle>
            <ServiceParagraph>
              {/* Create a secure account in a few easy steps and take control of
              your client and inventory management systems. Get going by
              creating an account. */}
              Subscribe to stay up to date on new and improved features and
              functionalities. And our committed team will provide you with the
              greatest health aide.
            </ServiceParagraph>
            <ServiceBottom onClick={() => handleScreen(1)}>
              Suscrube
            </ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
    </ServiceContainer>
  );
};

export default ServicesSection;
