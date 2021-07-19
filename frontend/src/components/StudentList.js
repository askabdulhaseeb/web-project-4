/*
Here, the focus is explicitly the listing of the students and nothing else.

Be careful not to mix different logic and rules that don’t belong here.

The heart of this component is the iteration over the students prop we’ll receive from the 
parent component (Home).

The map function will take care of the iteration by providing a variable (student) for us to 
access each value.

NewStudentModal and ConfirmRemovalModal components are just placed under the last <td>.









*/

import React, { Component } from "react";
import { Table } from "reactstrap";
import NewStudentModal from "./NewStudentModal";
import DetailsModal from "./DetailsModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class StudentList extends Component {
  render() {
    const students = this.props.students;
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No Record Found</b>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.pk}>
                <td>{student.pk}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.registrationDate}</td>
                <td>
                  <NewStudentModal
                    create={false}
                    student={student}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={student.pk}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <DetailsModal
                    student={student}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
