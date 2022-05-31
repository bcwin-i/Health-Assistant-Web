/* library files imported to assist funtionality of this file */
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import dateFormat, { masks } from "dateformat";

import "./table.css";

/*controllers that enable functions operate with CRUD */
function TableRows({ info, setSelectedUser, changeStatus, role, pres }) {
  console.info("received: ", info);
  return info.map((userData, index) => {
    const { key, data } = userData;
    const callFucntions = (key, e) => {
      changeStatus(key, e);
    };
    try {
      console.log("Comple ", data.Completed);
    } catch (e) {
      console.error(e);
    }
    return (
      <tr
        key={key}
        onClick={() => setSelectedUser({ ...data, key })}
        id={key}
        style={{ cursor: "pointer" }}
      >
        {role !== "Doctor" && pres ? null : (
          <td>
            <input
              type="checkbox"
              checked={data.Completed}
              onChange={(e) => callFucntions(key, e.target.checked)}
            />
          </td>
        )}

        <td>{data.LastName + " " + data.OtherNames + " " + data.FirstName}</td>
        <td>{data.DOB}</td>
        <td>{data.Gender}</td>
        <td>{dateFormat(data.AppointmentDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
      </tr>
    );
  });
}

/*controllers that enable functions operate with CRUD */
const PatientAppointmentsTable = ({
  completed,
  setSelectedUser,
  done,
  completedApp,
  role,
  lab,
  pres,
}) => {
  const db = getDatabase();
  const [checked, setChecked] = useState(false);
  const starCountRef = ref(
    db,
    role === "Pharmacy" ? "pharmacy/" : lab ? "prescription/" : "customers/"
  );
  const [rowsData, setRowsData] = useState([]);
  const [comrowsData, setComRowsData] = useState([]);

  const changeStatus = (key, data) => {
    if (done !== undefined || done !== null) completedApp(key, data);
  };

  const addTableRows = (key, data) => {
    // console.info("Completed No: ", data.Completed)
    // console.log(key, data);
    setRowsData((rowsData) => [...rowsData, { key: key, data: data }]);
  };

  const addComTableRows = (key, data) => {
    console.info("Completed Yes: ", data.Completed);
    // console.log(key, data);
    setComRowsData((comrowsData) => [...comrowsData, { key: key, data: data }]);
  };

  useEffect(() => {
    console.log("done: ", pres);
    onValue(starCountRef, (snapshot) => {
      setRowsData([]);
      setComRowsData([]);
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        // console.log("Parent: ", childSnapshot.key);
        console.log("Completed output: ", data.Completed);
        !data.Completed
          ? addTableRows(childSnapshot.key, data)
          : addComTableRows(childSnapshot.key, data);
      });
    });
    console.log("Not completed size: ", rowsData.length);
    console.log("Completed size: ", comrowsData.length);
  }, []);

  /*form returned with users input information */
  return (
    <table className="styled-table">
      <thead>
        <tr>
          {pres && role !== "Doctor" ? null : <th>Complete</th>}
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>{role === "Pharmacy" ? "Prescription Date" : "Appointment Date"}</th>
        </tr>
      </thead>
      <tbody>
        {pres ? (
          <TableRows
            info={comrowsData}
            completed={completed}
            setSelectedUser={setSelectedUser}
            changeStatus={changeStatus}
            role={role}
            pres={pres}
          />
        ) : !done ? (
          rowsData.length > 0 ? (
            <TableRows
              info={rowsData}
              completed={completed}
              setSelectedUser={setSelectedUser}
              changeStatus={changeStatus}
              role={role}
            />
          ) : null
        ) : comrowsData.length > 0 ? (
          <TableRows
            info={comrowsData}
            completed={completed}
            setSelectedUser={setSelectedUser}
            changeStatus={changeStatus}
            role={role}
          />
        ) : null}
      </tbody>
    </table>
  );
};

export default PatientAppointmentsTable;
