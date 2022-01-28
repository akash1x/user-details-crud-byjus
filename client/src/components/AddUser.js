import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { useState, useEffect } from "react";
import { v4 as _id } from "uuid";
import axios from "axios";
const AddUser = () => {
  const initialValues = {
    name: "",
    email: "",
    address: "",
    joiningDate: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleAlert = () => {
    setVisible(!visible);
    setIsSubmit(false);
    setFormValues(initialValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setVisible(false);
  };

  const addUser = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(async () => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      const user = {
        name: formValues.name,
        email: formValues.email,
        address: formValues.address,
        joiningDate: formValues.joiningDate,
      };
      const body = JSON.stringify(user);
      const res = await axios.post("http://localhost:5000/users", body, {
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(res.data);
      setVisible(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.address) {
      errors.address = "Addresss is required";
    }

    if (!values.joiningDate) {
      errors.joiningDate = "Joining date is required";
    }
    return errors;
  };

  return (
    <div className="container mt-5">
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            value={formValues.name}
            placeholder="Enter Name"
            type="text"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.name}</p>

          <Label>Email</Label>
          <Input
            name="email"
            value={formValues.email}
            placeholder="Enter Email"
            type="email"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.email}</p>

          <Label>Address</Label>
          <Input
            name="address"
            value={formValues.address}
            placeholder="Enter Address"
            type="textarea"
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.address}</p>

          <Label>Joining Date</Label>
          <Input
            name="joiningDate"
            type="date"
            value={formValues.joiningDate}
            onChange={handleChange}
          />
          <p className="text-danger">{formErrors.joiningDate}</p>

          <Button type="submit" className="mt-3" onClick={(e) => addUser(e)}>
            Add User
          </Button>
        </FormGroup>
      </Form>
      {isSubmit && (
        <Alert color="primary" isOpen={visible} toggle={toggleAlert}>
          User Details Saved
        </Alert>
      )}
    </div>
  );
};

export default AddUser;
