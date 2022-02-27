import styled from "styled-components";
import {MdDelete} from "react-icons/md";

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

//Appointments
export const AppointmentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const AppointmentsTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
`;

export const AdddApp = styled.button`
  color: white;
  font-weight: 600;
  background-color: ${colors.red};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  border: 0;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 1s ease-in-out;
  &:hover {
    background-color: ${colors.primary};
  }
`;

export const AppointmentForm = styled.form`
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  padding: 20px 0;
  margin-top: 20px;
`;

export const NamesField = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
  /* align-items: flex-end; */
`;

export const NamesField2 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
  /* align-items: flex-end; */
`;

export const Appointmentdescription = styled.textarea`
  display: flex;
  border: none;
  padding: 10px;
  border-bottom: 2px solid ${colors.primary};
  resize: none;
  font-size: 24px;
  color: black;
  width: 100%;
  border-radius: 5px;
  background-color: ${colors.hover};
  &:active {
    border: none;
    border-bottom: 2px solid ${colors.red};
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid ${colors.red};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

export const AppointmentDelete = styled(MdDelete)`
  font-size: 32px;
  cursor: pointer;
  margin: 0 10px;
  padding: 2px;
  background-color: white;
  border-radius: 50%;
  transition: all 1s ease-in-out;
  &:hover {
    background-color: #492849;
    color: white;
  }
`;