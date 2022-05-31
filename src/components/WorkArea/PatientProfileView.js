/* library files imported to assist funtionality of the HOD file */
import React, { useState, useEffect, useRef } from "react";
import { FcManager, FcBusinesswoman } from "react-icons/fc";
import dateFormat, { masks } from "dateformat";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaSms } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { colors } from "../../utils/colors";
import { AdddApp, Appointmentdescription } from "../../utils/workAreaStyles";
import AnimateHeight from "react-animate-height";
import ClipLoader from "react-spinners/ClipLoader";
import { sendSMS } from "../../Calls";
import { AccessErrorMessage } from "../../utils/styles";
import { async } from "@firebase/util";
import { getDatabase, ref, set, update } from "firebase/database";

/*controllers that enable functions operate with CRUD */
const PatientProfile = ({ selectedUser, role, lab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [prescription, setPrescription] = useState(false);
  const [pharmacy, setPharmacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const messageDesc = useRef(null);

  const mesgHandler = (type) => {
    setMessage(false);
    setPrescription(false);
    setPharmacy(false);
    console.log("Current type: ", type)
    if (type === "message") setMessage(true);
    if (type === "prescription") setPrescription(true);
    if (type === "pharmacy") setPharmacy(true);
  };

  useEffect(() => {
    console.log("Role: ", role);
  }, []);

  const addPharmacy = async () => {
    if (typedMessage.length < 1) return "Message form can't be empty";

    const data = {
      ...selectedUser,
      ...{ message: typedMessage, Completed: false },
    };
    const db = getDatabase();

    const res = await set(ref(db, "pharmacy/" + Date.now()), data)
      .then((v) => {
        console.error(v);
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });

    return res;
  };

  const addPrescription = async () => {
    if (typedMessage.length < 1) return "Message form can't be empty";

    const data = {
      ...selectedUser,
      ...{ message: typedMessage, Completed: false, results: "" },
    };
    const db = getDatabase();

    const res = await set(ref(db, "prescription/" + data.key), data)
      .then((v) => {
        console.error(v);
        return true;
      })
      .catch((e) => {
        console.error(e);
        return false;
      });

    return res;
  };

  const updateResults = async () => {
    if (typedMessage.length < 1) return;
    setError(false);
    setIsLoading(true);
    const db = getDatabase();

    update(ref(db, "prescription/" + selectedUser.key), {
      results: typedMessage,
    });
    // update(ref(db, "customers/" + selectedUser.key), {
    //   Completed: false
    // });

    setError(false);
    setIsLoading(false);
  };

  const sendMessage = async () => {
    setError(false);
    setIsLoading(true);
    const data = {
      phone: "+233" + selectedUser.Phone,
      message: !message
        ? "Hello " +
          selectedUser.LastName +
          " " +
          selectedUser.FirstName +
          " from Health Assistant, please be informed that you have an appointment at " +
          dateFormat(
            selectedUser?.AppointmentDate,
            "dddd, mmmm dS, yyyy, h:MM TT"
          )
        : "Hello " +
          selectedUser.LastName +
          " " +
          selectedUser.FirstName +
          " from Health Assistant, " +
          typedMessage,
    };

    const res = prescription ? await addPrescription() : await sendSMS(data);
    console.log(res);
    if (!prescription) {
      if (res !== "Message send successfully") setError(true);
    } else {
      if (res === false) setError(true);
    }
    setTypedMessage("");
    setIsLoading(false);
  };

  /*CSS functions defined */
  return selectedUser === null ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: 30,
      }}
    >
      <GiEmptyHourglass
        size={80}
        color="#F3F3F3"
        style={{ display: "flex", alignSelf: "center" }}
      />
      <p style={{ display: "flex", alignSelf: "center" }}>
        ..waiting for a selected patient
      </p>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        paddingRight: 8,
        borderRight: `2px solid ${colors.hover}`,
      }}
    >
      {selectedUser.Gender === "Male" ? (
        <FcManager size={80} style={{ display: "flex" }} />
      ) : (
        <FcBusinesswoman size={80} style={{ display: "flex" }} />
      )}
      <h3 style={{ color: colors.primary, fontSize: 20 }}>
        {selectedUser.LastName +
          " " +
          selectedUser.OtherNames +
          " " +
          selectedUser.FirstName}
        <span style={{ fontWeight: "400", fontSize: 18 }}>
          {", "}
          {new Date().getFullYear() - selectedUser.DOB.split("-")[0]}
          {" years"}
        </span>
      </h3>
      <h4 style={{ fontWeight: "500", fontSize: 24 }}>
        <span style={{ fontWeight: "300", fontSize: 18 }}>Gender:</span>{" "}
        {selectedUser.Gender}
      </h4>
      <p style={{ fontWeight: "500", fontSize: 24 }}>
        <span style={{ fontWeight: "300", fontSize: 18 }}>Height:</span>{" "}
        {selectedUser.Height + " m "}
        <span style={{ fontWeight: "300", fontSize: 18 }}>Weight:</span>{" "}
        {selectedUser.Weight + " kg"}
      </p>
      <p style={{ fontWeight: "500", fontSize: 24, marginTop: 10 }}>
        <span style={{ fontWeight: "300", fontSize: 18 }}>
          <MdPhone /> :{" "}
        </span>{" "}
        {selectedUser.Phone}
      </p>
      <p style={{ fontWeight: "400", fontSize: 18, marginTop: 10 }}>
        <span style={{ fontWeight: "500", fontSize: 18 }}>Description: </span>
        {selectedUser.Description}
      </p>
      {selectedUser.message ? (
        <p style={{ fontWeight: "400", fontSize: 18, marginTop: 10 }}>
          <span style={{ fontWeight: "500", fontSize: 18 }}>
            {/* Prescription */}
            {role === "Pharmacy" ? "Prescription" : "Lab Tests"} :{" "}
          </span>
          {selectedUser.message}
        </p>
      ) : null}
      {selectedUser.results ? (
        <p style={{ fontWeight: "400", fontSize: 18, marginTop: 10 }}>
          <span style={{ fontWeight: "500", fontSize: 18 }}>
            Test results:{" "}
          </span>
          {selectedUser.results}
        </p>
      ) : null}
      {role !== "Doctor" ? null : (
        <>
          <AnimateHeight
            duration={500}
            height={isOpen ? "auto" : "0%"}
            style={{
              width: "100%",
              overflow: "hidden",
              borderTop: "2px solid " + colors.primary,
              borderBottom: "2px solid " + colors.primary,
              paddingTop: 15,
              paddingBottom: 15,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                minHeight: "min-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  id="rm"
                  name="type"
                  value="Appointment reminder"
                  style={{ marginRight: 10 }}
                  onChange={(e) => mesgHandler(null)}
                />
                <label
                  for="rm"
                  style={{ color: colors.primary, fontWeight: "500" }}
                >
                  Appointment reminder
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  id="pr"
                  name="type"
                  value="Prescription"
                  style={{ marginRight: 10 }}
                  onChange={(e) => mesgHandler("prescription")}
                />
                <label
                  for="rm"
                  style={{ color: colors.primary, fontWeight: "500" }}
                >
                  {/* Prescription */}
                  Lab Tests
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  id="pr"
                  name="type"
                  value="Prescription"
                  style={{ marginRight: 10 }}
                  onChange={(e) => mesgHandler("pharmacy")}
                />
                <label
                  for="rm"
                  style={{ color: colors.primary, fontWeight: "500" }}
                >
                  Prescription
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="radio"
                  id="rm"
                  name="type"
                  style={{ marginRight: 10 }}
                  onChange={(e) => mesgHandler("message")}
                />
                <label
                  for="rm"
                  style={{ color: colors.primary, fontWeight: "500" }}
                >
                  Message
                </label>
              </div>
              {message || pharmacy || prescription ? (
                <Appointmentdescription
                  type="text"
                  name="ConditionDescription"
                  placeholder={
                    pharmacy
                      ? "Type recommended lab test"
                      : message
                      ? "Type message"
                      : prescription
                      ? "Type prescribed drug"
                      : null
                  }
                  rows="3"
                  style={{ fontSize: 16, fontWeight: "400", marginTop: 15 }}
                  onChange={(e) => setTypedMessage(e.target.value)}
                />
              ) : null}
            </div>
          </AnimateHeight>
          {error ? (
            <AccessErrorMessage>Error sending message</AccessErrorMessage>
          ) : null}
          {isLoading ? (
            <ClipLoader loading={true} size={35} color={colors.primary} />
          ) : (
            <AdddApp
              onClick={() => pharmacy ? addPharmacy() : sendMessage()}
              style={{ marginTop: 20, marginHorizontal: 0 }}
            >
              <FaSms color="white" style={{ marginRight: 15 }} size={20} /> Send
              SMS
            </AdddApp>
          )}
        </>
      )}

      {lab ? (
        <>
          <Appointmentdescription
            ref={messageDesc}
            type="text"
            name="ConditionDescription"
            placeholder={"Test results"}
            rows="3"
            style={{ fontSize: 16, fontWeight: "400", marginTop: 15 }}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          <AdddApp
            onClick={() => updateResults()}
            style={{ marginTop: 20, marginHorizontal: 0 }}
          >
            <FaSms color="white" style={{ marginRight: 15 }} size={20} />
            Send results
          </AdddApp>
        </>
      ) : null}
    </div>
  );
};

export default PatientProfile;
