/* library files imported to assist funtionality of the HOD file */
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
import { getDatabase, ref, update } from "firebase/database";

/*controllers that enable functions operate with CRUD */
const Patients = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const completedApp = (user, state) => {
    const db = getDatabase();

    update(ref(db, "customers/" + user), {
      Completed: state
    });
  };

/*react controllers & CSS funtions defined */
  return (
    <PatientsContainer>
      <MdSick size={40} color={colors.primary} />
      <PatientsOverWrapper style={{ marginTop: 10 }}>
        <PatientProfileView>
          <PatientProfile selectedUser={selectedUser} />
        </PatientProfileView>
        <ListOfPatients style={{ paddingLeft: 8 }}>
          <AccessTitle
            style={{ fontWeight: "500", fontSize: 18, marginBottom: -10 }}
          >
            Pending Appointments list
          </AccessTitle>
          <PatientAppointmentsTable
            setSelectedUser={setSelectedUser}
            done={false}
            completedApp={completedApp}
          />
          <AccessTitle
            style={{
              fontWeight: "500",
              fontSize: 18,
              marginBottom: -10,
              marginTop: 40,
            }}
          >
            Completed Appointments list
          </AccessTitle>
          <PatientAppointmentsTable
            setSelectedUser={setSelectedUser}
            done={true}
            completedApp={completedApp}
          />
        </ListOfPatients>
      </PatientsOverWrapper>
    </PatientsContainer>
  );
};

export default Patients;
