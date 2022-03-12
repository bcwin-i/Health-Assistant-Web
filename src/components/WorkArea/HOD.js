import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdSocialDistance, MdAdd } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { RiSubtractFill } from "react-icons/ri";
import { getDatabase, ref, set, remove } from "firebase/database";
import { ClipLoader } from "react-spinners";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import dateFormat, { masks } from "dateformat";
import { initializeApp } from "firebase/app";

import { colors } from "../../utils/colors";
import {
  AdddApp,
  AppointmentContainer,
  AppointmentDelete,
  AppointmentForm,
  AppointmentsTopHeader,
  ButtonsWrapper,
  NamesField,
} from "../../utils/workAreaStyles";
import AnimateHeight from "react-animate-height";
import {
  AccessErrorMessage,
  AccessInputEmail,
  AccessTextLabelTitle,
  AccessTitle,
} from "../../utils/styles";
import { sendSMS } from "../../Calls";
import EmployeesTable from "./EmployeesTable";
import { firebaseApp } from "../../firebase";

const HOD = () => {
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

  const sendMessage = async (selectedUser) => {
    const data = {
      phone: "+233" + selectedUser.Phone,
      message:
        "Hello " +
        selectedUser.LastName +
        " " +
        selectedUser.FirstName +
        " from Health Assistant, welcome to Polyclinic HIMS madina. Please use the following credential to access your account. Email " +
        selectedUser.email +
        " Password " +
        selectedUser.Password,
    };

    const res = await sendSMS(data);
    console.log(res);
    if (res !== "Message send successfully") setError(true);
  };

  const submitForm = async (e) => {
    setLoading(true);
    setError("");
    e.preventDefault();
    console.log(e.target.elements);
    const patientData = {
      LastName: e.target[0].value,
      OtherNames: e.target[1].value,
      FirstName: e.target[2].value,
      DOB: e.target[3].value,
      email: e.target[4].value,
      Gender: e.target[5].value,
      Phone: e.target[6].value,
      Role: e.target[7].value,
      EmploymentDate: e.target[8].value,
    };
    console.log(
      patientData.email,
      patientData.LastName + patientData.DOB.split("-")[0]
    );
    const auth = getAuth(initializeApp(
      {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      },
      "secondary"
    ));
    createUserWithEmailAndPassword(
      auth,
      patientData.email.trim(),
      patientData.LastName.trim() + patientData.DOB.split("-")[0]
    )
      .then(async (res) => {
        const db = getDatabase();
        await set(ref(db, "users/" + res.user.uid), {
          FirstName: e.target[0].value,
          OtherNames: e.target[1].value,
          LastName: e.target[2].value,
          DOB: e.target[3].value,
          email: e.target[4].value,
          Gender: e.target[5].value,
          Phone: e.target[6].value,
          Role: e.target[7].value,
          EmploymentDate: e.target[8].value,
        })
          .then((v) => {
            sendMessage({
              Phone: e.target[6].value,
              LastName: e.target[2].value,
              FirstName: e.target[2].value,
              email: patientData.email,
              Password: e.target[2].value + patientData.DOB.split("-")[0],
            });
            e.target.reset();
            signOut(auth);
          })
          .catch((e) => {
            console.error(e);
            setError("Error setting up appointment.");
          });
      })
      .catch((e) => setError(e));
    setLoading(false);
  };

  return (
    <AppointmentContainer>
      <AppointmentsTopHeader>
        <BsPeopleFill size={40} color={colors.primary} />
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
                Add Employee
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
          <AccessTitle>Employee Form</AccessTitle>
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
              <AccessTextLabelTitle>Email</AccessTextLabelTitle>
              <AccessInputEmail type="email" name="Height" required />
            </label>
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
              <AccessTextLabelTitle>Employment role</AccessTextLabelTitle>
              <AccessInputEmail type="text" list="role" name="Role" required />
              <datalist id="role">
                <option value="Receptionist" />
                <option value="Doctor" />
                <option value="Human Resource Manager" />
                <option value="System Admin" />
              </datalist>
            </label>
            <label>
              <AccessTextLabelTitle>Employment date</AccessTextLabelTitle>
              <AccessInputEmail type="date" name="EmpDate" required />
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
      <EmployeesTable />
    </AppointmentContainer>
  );
};

export default HOD;
