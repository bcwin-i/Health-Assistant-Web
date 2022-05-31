/* library files imported to assist funtionality of this file */
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import "./table.css";

function TableRows({ info, allCheck, addDeletes }) {

  return info.map((userData, index) => {
    const { key, data } = userData;
    return (
      <tr key={key}>
        {/* <td>
          <input
            type="checkbox"
            onChange={(e) => addDeletes(key, e.target.checked)}
          />
        </td> */}
        <td>
          {data.LastName +
            " " +
            data.OtherNames +
            " " +
            data.FirstName}
        </td>
        <td>{data.email}</td>
        <td>{data.Gender}</td>
        <td>{data.Phone}</td>
        <td>{data.Role}</td>
      </tr>
    );
  });
}
/*controllers that enable functions operate with CRUD */
const EmployeesTable = ({addDeletes}) => {
  const db = getDatabase();
  const [checked, setChecked] = useState(false);
  const starCountRef = ref(db, "users/");
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = (key, data) => {
    console.log(key, data)
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
          {/* <th>
             <input type="checkbox" onClick={(e) => checkedBox(e)} /> 
          </th> */}
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Employee Role</th>
        </tr>
      </thead>
      <tbody>
        {rowsData.length > 0 ? (
          <TableRows info={rowsData} allCheck={checked} addDeletes={addDeletes}/>
        ) : null}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
