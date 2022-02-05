import React, { useEffect } from "react";
import AOS from "aos";

//Local imports
import {
  IntroContainer,
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

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <ServiceContainer id="getStarted">
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={effective} />
          <SeviceDescription>
            <ServiceTitle>Effectiveness</ServiceTitle>
            <ServiceParagraph>
              Effectiveness With just a few clicks, you can easily manage and
              publish all client-related tasks. Interact with clients as quickly
              as possible to learn about their well-being.
            </ServiceParagraph>
            <ServiceBottom>Sign in</ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
      <CardWrapper>
        <CardViewContainer>
          <ServiceImage src={launch} />
          <SeviceDescription>
            <ServiceTitle>Launch</ServiceTitle>
            <ServiceParagraph>
              Create a secure account in a few easy steps and take control of
              your client and inventory management systems. Get going by
              creating an account.
            </ServiceParagraph>
            <ServiceBottom>Sign up</ServiceBottom>
          </SeviceDescription>
        </CardViewContainer>
      </CardWrapper>
    </ServiceContainer>
  );
};

export default ServicesSection;
