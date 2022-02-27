import React, { useState } from "react";

import { MdSick } from "react-icons/md";
import { colors } from "../../utils/colors";
import {
  ListOfPatients,
  PatientProfileView,
  PatientsContainer,
  PatientsOverWrapper,
} from "../../utils/PatientStyles";
import { AccessTitle } from "../../utils/styles";
import PatientAppointmentsTable from "./PatientmentAppointmentTabke";
import PatientProfile from "./PatientProfileView";

const Patients = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <PatientsContainer>
      <MdSick size={40} color={colors.primary} />
      <PatientsOverWrapper style={{ marginTop: 10 }}>
        <ListOfPatients style={{ paddingRight: 8 }}>
          <AccessTitle style={{ fontWeight: "300", fontSize: 24 }}>
            Appointments list
          </AccessTitle>
          <PatientAppointmentsTable setSelectedUser={setSelectedUser}/>
        </ListOfPatients>
        <PatientProfileView>
          <PatientProfile selectedUser={selectedUser}/>
        </PatientProfileView>
      </PatientsOverWrapper>
    </PatientsContainer>
  );
};

export default Patients;
