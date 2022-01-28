import React from "react";
import TableRow from "./TableRow";
import { Table, Alert } from "reactstrap";

const ListUsers = ({ users }) => {
  return (
    <div className="container">
      {users.length === 0 ? (
        <Alert className="mt-5">No users to display</Alert>
      ) : (
        <Table className="mt-5">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Address</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.userId} user={user} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListUsers;
