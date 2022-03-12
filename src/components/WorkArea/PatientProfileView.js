import React, { useState, useEffect } from "react";
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

const PatientProfile = ({ selectedUser }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async () => {
    setError(false);
    setIsLoading(true);
    const data = {
      phone: "+233" + selectedUser.Phone,
      message: !message
        ? "Hello "+ selectedUser.LastName +" "+ selectedUser.FirstName+" from Health Assistant, please be informed that you have an appointment at " +
          dateFormat(
            selectedUser?.AppointmentDate,
            "dddd, mmmm dS, yyyy, h:MM TT"
          )
        :  "Hello "+ selectedUser.LastName +" "+ selectedUser.FirstName+" from Health Assistant, " + typedMessage,
    };

    const res = await sendSMS(data);
    console.log(res);
    if (res !== "Message send successfully") setError(true);
    setTypedMessage("");
    setIsLoading(false);
  };

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
              onChange={(e) => setMessage(false)}
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
              id="rm"
              name="type"
              style={{ marginRight: 10 }}
              onChange={(e) => setMessage(true)}
            />
            <label
              for="rm"
              style={{ color: colors.primary, fontWeight: "500" }}
            >
              Message
            </label>
          </div>
          {message ? (
            <Appointmentdescription
              type="text"
              name="ConditionDescription"
              placeholder="Type message"
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
          onClick={() => sendMessage()}
          style={{ marginTop: 20, marginHorizontal: 0 }}
        >
          <FaSms color="white" style={{ marginRight: 15 }} size={20} /> Send SMS
        </AdddApp>
      )}
    </div>
  );
};

export default PatientProfile;
