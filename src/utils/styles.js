import styled from "styled-components";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiChevronRight } from "react-icons/bi";
import {RiCloseCircleFill} from "react-icons/ri"
import { FiUser, FiUserPlus } from "react-icons/fi";
import {FcGoogle} from "react-icons/fc"
import { Link as LinkScroll } from "react-scroll";

const colors = {
  primary: "#003049",
  secondary: "#ff9f1c",
  accent: "#2ec4b6",
  hover: "#F3F3F3",
  red: "#e71d36",
};

//...................Welcome page...................//

export const LandinPageCover = styled.div`
  min-height: 100vh;
  /* background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover; */
`;

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  z-index: 5;
`;

export const TextLogo = styled.h1`
  color: white;
  font-size: 1.5rem;
  color: ${colors.red};
  cursor: pointer;
`;

export const NavigationButtonContainer = styled.button`
  height: fit-content;
  width: fit-content;
  border: none;
  background: none;
`;

export const NavigationButton = styled(HiOutlineMenuAlt3)`
  width: 2rem;
  height: 2rem;
  color: ${colors.secondary};
  cursor: pointer;
  -webkit-transition: color 1s ease-in-out;
  -moz-transition: color 1s ease-in-out;
  -o-transition: color 1s ease-in-out;
  transition: color 1s ease-in-out;
  &:hover {
    border-radius: 10px;
    color: ${colors.red};
  }
`;

export const Popupmenu = styled.ul`
  border: 1px solid ${colors.hover};
  border-radius: 0.6rem;
  width: 150px;
  margin-right: 1.6rem;
  background-color: white;
  overflow: hidden;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  padding: 0;
  z-index: 50;
`;

export const MenuList = styled.li`
  list-style: none;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 500;
  -webkit-transition: background-color 0.5s ease-in-out;
  -moz-transition: background-color 0.5s ease-in-out;
  -o-transition: background-color 0.5s ease-in-out;
  transition: background-color 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    color: white;
    background-color: ${colors.red};
  }
`;

export const ListIconSignin = styled(FiUser)`
  margin-left: 10px;
  height: 18px;
  width: 18px;
`;
export const ListIconSignup = styled(FiUserPlus)`
  margin-left: 10px;
  height: 18px;
  width: 18px;
`;

export const IntroContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  min-height: 100vh;
  padding-top: 80px;
`;

export const IntroImageContainer = styled.div`
  flex: 50%;
  height: fit-content;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;

export const IntroImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const IntroTextContainer = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-content: flex-end;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;

export const IntroHeader = styled.h1`
  text-align: end;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: ${colors.primary};
  margin-bottom: 2rem;
`;

export const IntroDescription = styled.p`
  text-align: end;
  color: grey;
  font-size: large;
  line-height: 30px;
`;

export const IntroButton = styled(LinkScroll)`
  color: white;
  font-weight: 600;
  background-color: ${colors.red};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  border: 0;
  border-radius: 1.5rem;
  margin-top: 4rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primary};
    -webkit-transition: background-color 1s ease-in-out;
    -moz-transition: background-color 1s ease-in-out;
    -o-transition: background-color 1s ease-in-out;
    transition: background-color 1s ease-in-out;
  }
`;

export const RightArrow = styled(BiChevronRight)`
  width: 1.2rem;
  height: 1.2rem;
  color: white;
  align-self: center;
`;

export const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${colors.hover};
`;

export const CardWrapper = styled.div`
  flex: 50%;
  padding: 3% 7%;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;

export const CardViewContainer = styled.div`
  background-color: white;
  height: min-content;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

export const ServiceImage = styled.img.attrs((props) => ({
  src: props.src,
}))`
  height: 300px;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
`;

export const ServiceTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

export const SeviceDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5%;
  background-color: ${colors.primary};
  min-height: 210px;
`;

export const ServiceParagraph = styled.p`
  color: white;
  margin: 2% 0px;
`;

export const ServiceBottom = styled.button`
  color: ${colors.primary};
  font-weight: 500;
  background-color: white;
  align-self: flex-start;
  padding: 6px 11px;
  border: 0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-top: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.red};
    color: white;
    -webkit-transition: background-color 1s ease-in-out;
    -moz-transition: background-color 1s ease-in-out;
    -o-transition: background-color 1s ease-in-out;
    transition: background-color 1s ease-in-out;
  }
`;

export const AccessaccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5%;
  background: rgba(0, 0, 0, 0.9);
  transition: all 1s;
  height: 100vh;
`
export const AccessAccountWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
`

export const AccessFormWrapper =  styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  background-color: white;
  border-radius: 10px;
  height: min-content;
  flex: 0.4;
  @media (max-width: 600px) {
    flex: 1;
  }
`

export const AccessHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AccessTitle = styled.h1`
color: white;
font-size: 1.2rem;
color: ${colors.red};
margin-bottom: 20px;
cursor: pointer;
`;

export const AccessCloseBtn = styled(RiCloseCircleFill)`
  font-size: 28px;
  color: ${colors.red};
  cursor: pointer;
`

export const AccessHeader = styled.h3`
  color: ${colors.primary};
  font-weight: 500;
  margin-bottom: 30px;
  font-size: 28px;
`
export const AccessTextLabelTitle = styled.h5`
  color: black;
  font-size: 15px;
  margin-bottom: 10px;
`

export const AccessInputEmail = styled.input`
  border: none;
  border-bottom: 2px solid ${colors.primary};
  font-size: 24px;
  color: black;
  font-weight: 500;
  margin-bottom: 30px;
  &:active {
    border: none;
    border-bottom: 2px solid ${colors.red};
  }
  &:focus{
    outline: none;
    border-bottom: 2px solid ${colors.red};
  }
`

export const AccessInputPassword = styled.input`
border: none;
  border-bottom: 2px solid ${colors.primary};
  font-size: 24px;
  color: black;
  font-weight: 500;
  margin-bottom: 15px;
  &:active {
    border: none;
    border-bottom: 2px solid ${colors.red};
  }
  &:focus{
    outline: none;
    border-bottom: 2px solid ${colors.red};
  }
`

export const AccessForgotPassword = styled.a`
  font-size: 15px;
  align-self: flex-end;
  margin-bottom: 30px;
`

export const AccessButton = styled.button`
color: white;
  font-weight: 600;
  background-color: ${colors.red};
  display: flex;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
  padding: 12px 20px;
  border: 0;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primary};
    -webkit-transition: background-color 1s ease-in-out;
    -moz-transition: background-color 1s ease-in-out;
    -o-transition: background-color 1s ease-in-out;
    transition: background-color 1s ease-in-out;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const AccessGoogleWraper = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 15px;
  align-items: center;
  justify-items: center;
  align-content: center;
`

export const AccessGoogleButton =  styled(FcGoogle)`
  font-size: 25px;
  cursor: pointer;
  margin: 0 5px;
`
