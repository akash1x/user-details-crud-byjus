import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const RemoveUser = ({ users, refreshUsers }) => {
  const [id, setId] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleAlert = () => {
    setVisible(!visible);
    setIsSubmit(false);
    setId("");
  };

  const handleChange = (e) => {
    setId(e.target.value);
    setVisible(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(id));
    setIsSubmit(true);
  };

  useEffect(async () => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(id);
      try {
        const res = await axios.delete(`http://localhost:5000/users/${id}`);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
      refreshUsers();
      setVisible(true);
    }
  }, [formErrors]);

  const validate = (id) => {
    let errors = {};
    if (!id) {
      errors.id = "User Id is required!";
    } else {
      if (users.length != 0) {
        for (let user of users) {
          if (user.userId === id) {
            errors = {};
            break;
          } else {
            errors.id = "Invalid Id, no such user with this ID";
          }
        }
      } else {
        errors.id = "No users in the database";
      }
    }
    return errors;
  };

  return (
    <div className="container mt-5">
      <Form>
        <FormGroup>
          <Label>User ID</Label>
          <Input
            type="text"
            name="userId"
            value={id}
            onChange={(e) => handleChange(e)}
          />
          <p className="text-danger">{formErrors.id}</p>
          <Button
            className="mt-3"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Remove User
          </Button>
        </FormGroup>
      </Form>
      <Alert color="primary" isOpen={visible} toggle={toggleAlert}>
        User deleted successfully!
      </Alert>
    </div>
  );
};

export default RemoveUser;
