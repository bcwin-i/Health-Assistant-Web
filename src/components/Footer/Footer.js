/* library files imported to assist funtionality of this file */
import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  FaFacebook,

} from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "../../utils/FooterStyles";

/* */
const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer id="footer">
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle></FooterLinkTitle>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle></FooterLinkTitle>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle></FooterLinkTitle>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle></FooterLinkTitle>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
              <FooterLink to="/"></FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              
            </SocialLogo>
            <WebsiteRights>
              © {new Date().getFullYear()}All rights reserved.
            </WebsiteRights>
      
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
