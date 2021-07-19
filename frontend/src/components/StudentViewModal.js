import React, { Component, Fragment } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";


class StudentViewModal extends Component {
  state = {
        mymodal: false,
        FName: "",
        LName: "",
        regDate: "",
  };

  toggle = () => {
    this.setState(previous => ({
      mymodal: !previous.mymodal
    }));
  };
  componentDidMount() {
    if (this.props.student) {
      const { pk, firstName, lastName, registrationDate } = this.props.student;
      this.setState({ FName:firstName, LName: lastName, regDate: registrationDate });
    }
  }
 
  render() {
    return (
      <Fragment>
        <Button color="success" onClick={() => this.toggle()}>
          View Student 
        </Button>
        <Modal isOpen={this.state.mymodal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
           View the Student Details
          </ModalHeader>
          <Form  style={{margin:'13px'}}>
        <FormGroup>
          <Label for="firstName">First Name </Label>
          <Input
            value={this.state.FName}
            disabled  
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            value={this.state.LName}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="registrationDate">Registration Date</Label>
          <Input
            value={this.state.regDate}
            disabled
          />
        </FormGroup>
      </Form>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.toggle()}
            >
              Go Back
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default StudentViewModal;