import React, { useState } from "react";
import {
  WorkAreaDisplayField,
  WorkAreaSectionsContainer,
  WorkContainer,
  WorkSection,
} from "../../utils/workAreaStyles";
import Appontments from "./Appontments";
import Patients from "./Patients";

const WorkArea = () => {
  const [section1, setSection1] = useState(true);
  const [section2, setSection2] = useState(false);

  const changeSection = () => {
    setSection1(!section1);
    setSection2(!section2);
    console.log(section1, section2)
  };

  return (
    <WorkContainer>
      <WorkAreaSectionsContainer>
        <WorkSection section={section1} onClick={() => changeSection()}>
          Appointments
        </WorkSection>
        <WorkSection section={section2} onClick={() => changeSection()}>
          Patients
        </WorkSection>
      </WorkAreaSectionsContainer>
      <WorkAreaDisplayField>
        {section1 ? <Appontments /> : <Patients />}
      </WorkAreaDisplayField>
    </WorkContainer>
  );
};

export default WorkArea;
