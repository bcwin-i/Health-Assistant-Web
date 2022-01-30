import styled from "styled-components";
// import {Menu2} from "@styled-icons/evaicons-solid/Menu2"
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiChevronRight } from "react-icons/bi";
import {FiUser, FiUserPlus} from "react-icons/fi"

import background from "../assets/background.jpg";

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background: none;
  padding: 20px;
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
`
export const ListIconSignup = styled(FiUserPlus)`
  margin-left: 10px;
  height: 18px;
  width: 18px;
`

export const IntroContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
`;

export const IntroImageContainer = styled.div`
  flex: 50%;
  height: fit-content;
  @media (max-width: 767px) {
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
  @media (max-width: 767px) {
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

export const IntroButton = styled.button`
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
  -webkit-transition: background-color 1s ease-in-out;
  -moz-transition: background-color 1s ease-in-out;
  -o-transition: background-color 1s ease-in-out;
  transition: background-color 1s ease-in-out;
  &:hover {
    background-color: ${colors.primary};
  }
`;

export const RightArrow = styled(BiChevronRight)`
  width: 1.2rem;
  height: 1.2rem;
  color: white;
  align-self: center;
`;
