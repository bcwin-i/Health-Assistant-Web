/* library files imported to assist funtionality of this file */
import React, { useRef, useState } from "react";
import { MdSocialDistance, MdAdd } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiSubtractFill } from "react-icons/ri";
import AnimateHeight from "react-animate-height";
import { getDatabase, ref, set, remove, update } from "firebase/database";
import { MdModeEdit } from "react-icons/md";
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
const Appontments = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editable, setEditable] = useState(false);
  const form = useRef(null);
  const [deletes, setDeletes] = useState([]);

  const addDeletes = (id, bool, data) => {
    console.log(bool, data);
    bool ? setEditable(data) : setEditable(false);
    console.log(form.current);
    // const patientData = {
    //   LastName: e.target[0].value,
    //   OtherNames: e.target[1].value,
    //   FirstName: e.target[2].value,
    //   DOB: e.target[3].value,
    //   Height: e.target[4].value,
    //   Weight: e.target[5].value,
    //   Gender: e.target[6].value,
    //   Phone: e.target[7].value,
    //   AppointmentDate: e.target[8].value,
    //   Description: e.target[9].value,
    // };
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

    !editable
      ? await set(ref(db, "customers/" + Date.now()), {
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
            console.error(v);
            e.target.reset();
          })
          .catch((e) => {
            console.error(e);
            setError("Error setting up appointment.");
          })
      : await update(ref(db, "customers/" + editable.key), {
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
            console.error(v);
            e.target.reset();
          })
          .catch((e) => {
            console.error(e);
            setError("Error setting up appointment.");
          });
    setEditable(false);
    setLoading(false);
  };

  /*controllers that enable functions operate with CRUD, including some CSS funtions defined */
  return (
    <AppointmentContainer>
      {role === "System Admin" ? null : (
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
            {deletes.length === 1 ? (
              <MdModeEdit
                color={colors.red}
                size={25}
                onClick={() => setIsOpen(!isOpen)}
              />
            ) : null}
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
      )}
      <AnimateHeight duration={500} height={isOpen ? "auto" : "0%"}>
        <AppointmentForm ref={form} onSubmit={(e) => submitForm(e)}>
          <AccessTitle>Patient Form</AccessTitle>
          <NamesField>
            <label>
              <AccessTextLabelTitle>First name</AccessTextLabelTitle>
              <AccessInputEmail
                type="text"
                name="FirstName"
                required
                defaultValue={editable ? editable.FirstName : ""}
              />
            </label>
            <label>
              <AccessTextLabelTitle>
                Other names (optional)
              </AccessTextLabelTitle>
              <AccessInputEmail
                type="text"
                name="OtherName"
                defaultValue={editable ? editable.OtherNames : ""}
              />
            </label>
            <label>
              <AccessTextLabelTitle>Last name</AccessTextLabelTitle>
              <AccessInputEmail
                type="text"
                name="LastName"
                required
                defaultValue={editable ? editable.LastName : ""}
              />
            </label>
          </NamesField>
          <NamesField>
            <label>
              <AccessTextLabelTitle>Date of birth</AccessTextLabelTitle>
              <AccessInputEmail
                type="date"
                name="DOB"
                required
                defaultValue={editable ? editable.DOB : ""}
              />
            </label>
            <label>
              <AccessTextLabelTitle>Height (metres)</AccessTextLabelTitle>
              <AccessInputEmail
                type="text"
                name="Height"
                required
                defaultValue={editable ? editable.Height : ""}
              />
            </label>
            <label>
              <AccessTextLabelTitle>Weight (kilograms)</AccessTextLabelTitle>
              <AccessInputEmail
                type="number"
                name="Weight"
                required
                defaultValue={editable ? editable.Weight : ""}
              />
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
                defaultValue={editable ? editable.Gender : ""}
              />
              <datalist id="gender">
                <option value="Male" />
                <option value="Female" />
              </datalist>
            </label>
            <label>
              <AccessTextLabelTitle>Phone</AccessTextLabelTitle>
              <AccessInputEmail
                type="tel"
                name="Phone"
                required
                defaultValue={editable ? editable.Phone : ""}
              />
            </label>
            <label>
              <AccessTextLabelTitle>Appointment date</AccessTextLabelTitle>
              <AccessInputEmail
                type="datetime-local"
                name="AppDate"
                required
                defaultValue={editable ? editable.AppointmentDate : ""}
              />
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
                defaultValue={editable ? editable.Description : ""}
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
