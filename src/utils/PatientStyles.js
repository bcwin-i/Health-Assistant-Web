import styled from "styled-components";

import { colors } from "./colors";

export const PatientsContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const PatientsOverWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ListOfPatients = styled.div`
  display: flex;
  flex: 65%;
  flex-direction: column;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;

export const PatientProfileView = styled.div`
  display: flex;
  flex: 35%;
  @media (max-width: 600px) {
    flex: 100%;
  }
`;
