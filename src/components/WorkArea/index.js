/* library files imported to assist funtionality of this file */
import { child, get, getDatabase, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { useAuthState } from "../../firebase";
import {
  WorkAreaDisplayField,
  WorkAreaSectionsContainer,
  WorkContainer,
  WorkSection,
} from "../../utils/workAreaStyles";
import Appontments from "./Appontments";
import HOD from "./HOD";
import Patients from "./Patients";
import ClipLoader from "react-spinners/ClipLoader";
import { colors } from "../../utils/colors";

/*controllers that enable functions operate with CRUD */
const WorkArea = () => {
  const [section1, setSection1] = useState(true);
  const [section2, setSection2] = useState(false);
  const [section3, setSection3] = useState(false);
  const [role, setRole] = useState(false);
  const { isAuthenticated } = useAuthState();

  const changeSection = (section) => {
    setSection1(false);
    setSection2(false);
    setSection3(false);
    if (section === 1) setSection1(true);
    else if (section === 2) setSection2(true);
    else setSection3(true);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${isAuthenticated?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const role = snapshot.val().Role;
          if (role !== "System Admin") {
            role === "Receptionist"
              ? changeSection(1)
              : role === "Doctor"
              ? changeSection(2)
              : changeSection(3);
          }
          setRole(snapshot.val().Role);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        //console.error(error);
      });
  }, []);

  /*controllers that enable functions operate with CRUD */
  return (
    <WorkContainer style={{ justifyContent: "center" }}>
      {!role ? (
        <ClipLoader loading={true} size={35} color={colors.primary} />
      ) : (
        <WorkAreaSectionsContainer>
          {role === "System Admin" ? (
            <WorkAreaSectionsContainer>
              <WorkSection section={section1} onClick={() => changeSection(1)}>
                Appointments
              </WorkSection>
              <WorkSection section={section2} onClick={() => changeSection(2)}>
                Patients
              </WorkSection>
              <WorkSection section={section3} onClick={() => changeSection(3)}>
                Human Resource
              </WorkSection>
            </WorkAreaSectionsContainer>
          ) : role === "Receptionist" ? (
            <WorkSection section={section1} onClick={() => changeSection(1)}>
              Appointments
            </WorkSection>
          ) : role === "Doctor" ? (
            <WorkSection section={section2} onClick={() => changeSection(2)}>
              Patients
            </WorkSection>
          ) : role === "Human Resource Manager" ? (
            <WorkSection section={section3} onClick={() => changeSection(3)}>
              Human Resource
            </WorkSection>
          ) : null}
        </WorkAreaSectionsContainer>
      )}
      {!role ? null : (
        <WorkAreaDisplayField>
          {section1 ? <Appontments /> : section2 ? <Patients /> : <HOD />}
        </WorkAreaDisplayField>
      )}
    </WorkContainer>
  );
};

export default WorkArea;
