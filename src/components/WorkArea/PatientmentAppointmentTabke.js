import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import "./table.css";

function TableRows({ info, setSelectedUser, addDeletes }) {
  const [clicked, setClicked] = useState(false);
  return info.map((userData, index) => {
    const { key, data } = userData;
    return (
      <tr
        key={key}
        onClick={() => setSelectedUser(data)}
        id={key}
        style={{cursor: "pointer"}}
      >
        <td>
          <input
            type="checkbox"
            onChange={(e) => addDeletes(key, e.target.checked)}
          />
        </td>
        <td>{data.LastName + " " + data.OtherNames + " " + data.FirstName}</td>
        <td>{data.DOB}</td>
        <td>{data.Gender}</td>
        <td>{data.AppointmentDate}</td>
      </tr>
    );
  });
}

const PatientAppointmentsTable = ({ completed, setSelectedUser }) => {
  const db = getDatabase();
  const [checked, setChecked] = useState(false);
  const starCountRef = ref(db, "customers/");
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = (key, data) => {
    console.log(key, data);
    setRowsData((rowsData) => [...rowsData, { key: key, data: data }]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const checkedBox = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      setRowsData([]);
      snapshot.forEach(function (childSnapshot) {
        let data = childSnapshot.val();
        console.log("Parent: ", childSnapshot.key);
        addTableRows(childSnapshot.key, data);
      });
    });
  }, []);

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Complete</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Appointment Date</th>
        </tr>
      </thead>
      <tbody>
        {rowsData.length > 0 ? (
          <TableRows info={rowsData} completed={completed} setSelectedUser={setSelectedUser}/>
        ) : null}
      </tbody>
    </table>
  );
};

export default PatientAppointmentsTable;
