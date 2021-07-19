/*
the only state prop we’re creating is the modal’s state in order to check whether it must be 
open or closed.

The toggle function (the one our form receives as param) will switch the current modal’s value 
to the opposite every time it’s called.

In the render function, we’re first checking if a create boolean was passed as param from the 
parent caller to decide if the button is for editing or creating action.

The buttons are created dynamically depending on what the parent said to us.

Then, the Modal component can be mounted upon these conditions further down. Pay attention to 
where we’re placing the <NewStudentForm /> component. 





*/













import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStudentForm from "./NewStudentForm";

class NewStudentModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Student";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New Student";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewStudentForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              student={this.props.student}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewStudentModal;