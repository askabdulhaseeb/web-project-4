/*

Here, we have some important things going on:

In the first lines, we’re importing the reactstrap components for the first time including 
Form, Button, etc, which will comprise our form.

Then, we created our state object with the corresponding properties of our Student’s model. 
This is going to be useful to manipulate each prop individually.

The componentDidMount function is from react lifecycle and will run after the component 
finishes its startup, so we can recover the student’s props from the parent component 
(this.props) here, and set the state with them (if they exist, for the editing scenario.)

The onChange function will handle the update of each state’s prop with the current value 
typed in each respective field

The createStudent function will deal with the HTTP POST requests of our form. Every time we 
press the submit button, this function will be called, triggering the axios’ post() function 
and passing the current state in the request’s body. Once it’s completed, we’ll call the props 
functions resetState (to refresh the table) and toggle (to close the modal), they’ll be created 
further

editStudent function works almost like the previous one, but calling our PUT operation

The defaultIfEmpty function was created as a random function that’ll check the current value of 
each field in order to determine if they’re going to be filled with the value of the state 
(in case any exists, for editing) or not (when creating a new student)

The render function will just compose our form with the help of reactstrap components. Nothing 
special here, except for the onSubmit property, which checks for a props’ property called 
students: if it does exist, the submit function will be for editing (the value was passed by 
the parent component); otherwise, it’s for creation.


*/

import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewStudentForm extends React.Component {
  state = {
    pk: 0,
    firstName: "",
    lastName: "",
    registrationDate: "",
  };

  componentDidMount() {
    if (this.props.student) {
      const { pk, firstName, lastName, registrationDate } = this.props.student;
      this.setState({ pk, firstName, lastName, registrationDate });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = (e) => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = (e) => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  render() {
    return this.props.detailsView ? (
      <Form
        onSubmit={this.props.student ? this.editStudent : this.createStudent}
      >
        <FormGroup>
          <Label for="firstName">First Name:</Label>
          <Input
            type="text"
            name="firstName"
            disabled
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.firstName)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            disabled
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.lastName)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="registrationDate">Registration Date:</Label>
          <Input
            type="date"
            name="registrationDate"
            disabled
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.registrationDate)}
          />
        </FormGroup>
        <Button onClick={this.props.toggle}>Back</Button>
      </Form>
    ) : (
      <Form
        onSubmit={this.props.student ? this.editStudent : this.createStudent}
      >
        <FormGroup>
          <Label for="firstName">First Name:</Label>
          <Input
            type="text"
            name="firstName"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.firstName)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name:</Label>
          <Input
            type="text"
            name="lastName"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.lastName)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="registrationDate">Registration Date:</Label>
          <Input
            type="date"
            name="registrationDate"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.registrationDate)}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default NewStudentForm;
