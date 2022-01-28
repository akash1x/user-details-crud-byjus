import React from "react";

const TableRow = ({ user }) => {
  return (
    <tr>
      <th scope="row">{user.userId}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.joiningDate}</td>
    </tr>
  );
};

export default TableRow;
