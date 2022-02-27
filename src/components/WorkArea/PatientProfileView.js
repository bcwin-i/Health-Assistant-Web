import React from "react";
import { FcManager, FcBusinesswoman } from "react-icons/fc";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaSms } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { colors } from "../../utils/colors";
import { AdddApp } from "../../utils/workAreaStyles";

const PatientProfile = ({ selectedUser }) => {
  return selectedUser === null ? (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingTop: 30 }}>
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
        paddingLeft: 8,
        borderLeft: `2px solid ${colors.hover}`,
      }}
    >
      <FcManager size={80} style={{ display: "flex" }} />
      {/* <FcBusinesswoman
        size={80}
        style={{ display: "flex", justifySelf: "center" }}
      /> */}
      <h3 style={{ color: colors.primary, fontSize: 20 }}>
      {selectedUser.LastName +
            " " +
            selectedUser.OtherNames +
            " " +
            selectedUser.FirstName}
        <span style={{ fontWeight: "400", fontSize: 18 }}>{selectedUser.DOB}</span>
      </h3>
      <h4 style={{ fontWeight: "500", fontSize: 24 }}>
        <span style={{ fontWeight: "300", fontSize: 18 }}>Gender:</span> {selectedUser.Gender}
      </h4>
      <p style={{ fontWeight: "500", fontSize: 24 }}>
        <span style={{ fontWeight: "300", fontSize: 18 }}>Height:</span> {selectedUser.Height + " m "}
        <span style={{ fontWeight: "300", fontSize: 18 }}>Weight:</span> {selectedUser.Weight + " kg"}
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
      <AdddApp onClick={() => console.log("SMS")} style={{ marginTop: 20 }}>
        <FaSms color="white" style={{ marginRight: 15 }} size={20} /> Send SMS
      </AdddApp>
    </div>
  );
};

export default PatientProfile;
