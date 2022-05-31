/* library files imported to assist funtionality of this file */
import React, { useState } from "react";
import { MdSocialDistance, MdAdd } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiSubtractFill } from "react-icons/ri";
import AnimateHeight from "react-animate-height";
import { getDatabase, ref, set, off, remove } from "firebase/database";
import { colors } from "../../utils/colors";
import {
  AccessErrorMessage,
  AccessInputEmail,
  AccessTextLabelTitle,
  AccessTitle,
  AccessGoogleButton,
} from "../../utils/styles";
import {
  AdddApp,
  AppointmentContainer,
  AppointmentDelete,
  Appointmentdescription,
  AppointmentForm,
  AppointmentsTopHeader,
  ButtonsWrapper,
  NamesField,
  NamesField2,
} from "../../utils/workAreaStyles";
import AppointmentsTable from "./AppointmentsTable";
import { ClipLoader } from "react-spinners";

/*controllers that enable functions operate with CRUD */
const Appontments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletes, setDeletes] = useState([]);

  const addDeletes = (id, bool) => {
    console.log(id, bool);
    bool ? setDeletes((deletes) => [...deletes, id]) : deleteRow(id);
  };

  const deleteRow = (id) => {
    const dels = [...deletes];
    const index = deletes.indexOf(id);
    if (index !== -1) {
      dels.splice(index, 1);
      setDeletes(dels);
    }
  };

  const deleteSelectedApp = () => {
    deletes.forEach(async (element) => {
      const db = getDatabase();
      const reference = ref(db, "customers/" + element);
      await remove(reference);

      const dels = [...deletes];
      const index = deletes.indexOf(element);
      if (index !== -1) {
        dels.splice(index, 1);
        setDeletes(dels);
      }
    });
  };

  const resetForm = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const submitForm = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    //e.target.reset();
    //console.log(e.target.elements)

    const patientData = {
      LastName: e.target[0].value,
      OtherNames: e.target[1].value,
      FirstName: e.target[2].value,
      DOB: e.target[3].value,
      Height: e.target[4].value,
      Weight: e.target[5].value,
      Gender: e.target[6].value,
      Phone: e.target[7].value,
      AppointmentDate: e.target[8].value,
      Description: e.target[9].value,
    };
    // for (let i = 0; i < e.target.length; i++) {
    //   console.log(i + " : " + e.target[i].value);
    // }

    const db = getDatabase();
    await set(ref(db, "customers/" + Date.now()), {
      LastName: patientData.LastName,
      OtherNames: patientData.OtherNames,
      FirstName: patientData.FirstName,
      Completed: false,
      DOB: patientData.DOB,
      Height: patientData.Height,
      Weight: patientData.Weight,
      Gender: patientData.Gender,
      Phone: patientData.Phone,
      AppointmentDate: patientData.AppointmentDate,
      Description: patientData.Description,
    })
      .then((v) => {
        e.target.reset();
      })
      .catch((e) => {
        console.error(e);
        setError("Error setting up appointment.");
      });
    setLoading(false);
  };

  /*controllers that enable functions operate with CRUD, including some CSS funtions defined */
  return (
    <AppointmentContainer>
      <AppointmentsTopHeader>
        <MdSocialDistance
          size={40}
          color={colors.primary}
          style={{ display: "flex", justifySelf: "flex-end" }}
        />
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {deletes.length === 0 ? null : (
            <AppointmentDelete
              color={colors.red}
              onClick={() => deleteSelectedApp()}
            />
          )}
          <AdddApp onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? (
              <>
                Add Appointments
                <MdAdd size={25} color={"white"} style={{ marginLeft: 10 }} />
              </>
            ) : (
              <>
                Hide Form
                <RiSubtractFill
                  size={25}
                  color={"white"}
                  style={{ marginLeft: 10 }}
                />
              </>
            )}
          </AdddApp>
        </span>
      </AppointmentsTopHeader>
      <AnimateHeight duration={500} height={isOpen ? "auto" : "0%"}>
        <AppointmentForm onSubmit={(e) => submitForm(e)}>
          <AccessTitle>Patient Form</AccessTitle>
          <NamesField>
            <label>
              <AccessTextLabelTitle>First name</AccessTextLabelTitle>
              <AccessInputEmail type="text" name="FirstName" required />
            </label>
            <label>
              <AccessTextLabelTitle>
                Other names (optional)
              </AccessTextLabelTitle>
              <AccessInputEmail type="text" name="OtherName" />
            </label>
            <label>
              <AccessTextLabelTitle>Last name</AccessTextLabelTitle>
              <AccessInputEmail type="text" name="LastName" required />
            </label>
          </NamesField>
          <NamesField>
            <label>
              <AccessTextLabelTitle>Date of birth</AccessTextLabelTitle>
              <AccessInputEmail type="date" name="DOB" required />
            </label>
            <label>
              <AccessTextLabelTitle>Height (metres)</AccessTextLabelTitle>
              <AccessInputEmail type="text" name="Height" required />
            </label>
            <label>
              <AccessTextLabelTitle>Weight (kilograms)</AccessTextLabelTitle>
              <AccessInputEmail type="number" name="Weight" required />
            </label>
          </NamesField>
          <NamesField>
            <label>
              <AccessTextLabelTitle>Gender</AccessTextLabelTitle>
              <AccessInputEmail
                type="text"
                list="gender"
                name="Gender"
                required
              />
              <datalist id="gender">
                <option value="Male" />
                <option value="Female" />
              </datalist>
            </label>
            <label>
              <AccessTextLabelTitle>Phone</AccessTextLabelTitle>
              <AccessInputEmail type="tel" name="Phone" required />
            </label>
            <label>
              <AccessTextLabelTitle>Appointment date</AccessTextLabelTitle>
              <AccessInputEmail type="datetime-local" name="AppDate" required />
            </label>
          </NamesField>
          <NamesField>
            <label style={{ width: "100%" }}>
              <AccessTextLabelTitle>Condition description</AccessTextLabelTitle>
              <Appointmentdescription
                type="text"
                name="ConditionDescription"
                cols="30"
                rows="5"
                required
              />
            </label>
          </NamesField>
          {error !== "" ? (
            <AccessErrorMessage>{error}</AccessErrorMessage>
          ) : null}
          <ButtonsWrapper>
            <AdddApp style={{ marginRight: 20 }} onClick={(e) => resetForm(e)}>
              Reset
              <BiReset size={25} color={"white"} style={{ marginLeft: 10 }} />
            </AdddApp>
            {loading ? (
              <ClipLoader loading={true} size={35} color={colors.primary} />
            ) : (
              <AdddApp
                type="submit"
                style={{ backgroundColor: colors.primary }}
              >
                Submit
                <MdAdd size={25} color={"white"} style={{ marginLeft: 10 }} />
              </AdddApp>
            )}
          </ButtonsWrapper>
          {/* <input type="submit" value="Submit" /> */}
        </AppointmentForm>
      </AnimateHeight>
      <AppointmentsTable addDeletes={addDeletes} />
    </AppointmentContainer>
  );
};

export default Appontments;
