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
const Pharmacy = ({ role }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const completedApp = (user, state) => {
    const db = getDatabase();

    update(ref(db, "pharmacy/" + user), {
      Completed: state,
    });
  };

  /*react controllers & CSS funtions defined */
  return (
    <PatientsContainer>
      <MdSick size={40} color={colors.primary} />
      <PatientsOverWrapper style={{ marginTop: 10 }}>
        <PatientProfileView>
          <PatientProfile selectedUser={selectedUser} role={role} lab={false} />
        </PatientProfileView>
        <ListOfPatients style={{ paddingLeft: 8 }}>
          <AccessTitle
            style={{ fontWeight: "500", fontSize: 18, marginBottom: -10 }}
          >
            Patient Prescription List
          </AccessTitle>
          <PatientAppointmentsTable
            setSelectedUser={setSelectedUser}
            done={false}
            completedApp={completedApp}
            role={role}
            lab={false}
          />
          <AccessTitle
            style={{ fontWeight: "500", fontSize: 18, marginTop: 20, marginBottom: -10 }}
          >
            Patient Completed Prescription List
          </AccessTitle>
          <PatientAppointmentsTable
            setSelectedUser={setSelectedUser}
            done={true}
            completedApp={completedApp}
            role={role}
            lab={false}
          />
        </ListOfPatients>
      </PatientsOverWrapper>
    </PatientsContainer>
  );
};

export default Pharmacy;
