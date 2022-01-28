const express = require("express");
const app = express();
const users = require("./routes/users");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/users", users);

app.listen(5000, () => {
  console.log("Server Started");
});
