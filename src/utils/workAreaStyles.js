import styled from "styled-components";

import { colors } from "./colors";

export const WorkContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin-top: 80px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
export const WorkAreaSectionsContainer = styled.ol`
  border-right: 2px solid ${colors.hover};
  display: flex;
  flex: 20%;
  flex-direction: column;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;
export const WorkSection = styled.li`
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
  background-color: ${(props) => (props.section ? colors.hover : "white")};
  box-sizing: border-box;
  border-right: ${(props) =>
    props.section ? `5px solid ${colors.red}` : null};
  width: 100%;
  &:hover {
    background-color: ${colors.hover};
  }
`;

export const WorkAreaDisplayField = styled.div`
  display: flex;
  flex: 80%;
  min-height: 100vh;
  padding: 2%;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;
