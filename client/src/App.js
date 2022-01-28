import AddUser from "./components/AddUser";
import { useState, useEffect } from "react";
import RemoveUser from "./components/RemoveUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import ListUsers from "./components/ListUsers";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      console.log(res.data);
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  const refreshUsers = () => {
    fetchUsersData();
  };
  return (
    <Router>
      <AppNavbar refreshUsers={refreshUsers} />
      <Routes>
        <Route path="/addUser" element={<AddUser />} />
        <Route
          path="/removeUser"
          element={<RemoveUser users={users} refreshUsers={refreshUsers} />}
        />
        <Route path="/" exact element={<ListUsers users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;
