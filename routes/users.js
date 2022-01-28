const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let users = [];

router.get("/", (req, res) => {
  if (!users) return res.status(404).json({ msg: "No users available" });

  return res.status(200).json({ users });
});

router.post("/", (req, res) => {
  const { name, email, address, joiningDate } = req.body;
  if (!name || !email || !address || !joiningDate)
    return res.status(400).json({ msg: "Please Enter all fields" });

  const user = {
    userId: uuidv4(),
    name: name,
    email: email,
    address: address,
    joiningDate: joiningDate,
  };

  users.push(user);

  return res.status(201).json({ user });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ msg: "Please enter the ID" });

  //Deleting the user from the list
  if (users.length != 0) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].userId === id) {
        users.splice(i, 1);
        return res.status(200).json({ msg: "user deleted successfully" });
      }
    }
  } else {
    return res.status(400).json({ msg: "No users in the database" });
  }

  return res.status(400).json({ msg: "No user exits with this ID" });
});

module.exports = router;
