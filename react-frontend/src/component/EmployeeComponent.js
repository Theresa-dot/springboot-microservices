import React, { Component } from 'react';
import EmployeeService from '../service/EmployeeService';

class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: '',
            employee: {},
            department: {},
            organization: {},
            error: null,
        };
    }

    handleInputChange = (event) => {
        this.setState({ employeeId: event.target.value });
    };

    fetchEmployeeDetails = () => {
        const { employeeId } = this.state;
        if (employeeId) {
            EmployeeService.getEmployee(employeeId)
                .then((response) => {
                    this.setState({
                        employee: response.data.employee,
                        department: response.data.department,
                        organization: response.data.organization,
                        error: null,
                    });
                    console.log(this.state.employee);
                    console.log(this.state.department);
                    console.log(this.state.organization);
                })
                .catch((error) => {
                    this.setState({ error: 'Error fetching employee details' });
                    console.error('There was an error fetching the employee data!', error);
                });
        } else {
            this.setState({ error: 'Please enter a valid Employee ID' });
        }
    };

    render() {
        const { employee, department, organization, error } = this.state;
        return (
            <div>
                <br /> <br />
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center card-header'>View Employee Details</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <input
                                type='text'
                                value={this.state.employeeId}
                                onChange={this.handleInputChange}
                                placeholder='Enter Employee ID'
                                className='form-control'
                            />
                            <button onClick={this.fetchEmployeeDetails} className='btn btn-primary'>
                                Get Employee
                            </button>
                        </div>
                        {error && (
                            <div className='alert alert-danger' role='alert'>
                                {error}
                            </div>
                        )}
                        {employee && department && organization && (
                            <>
                                <div className='row'>
                                    <p><strong>Employee First Name: </strong> {employee.firstName}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Employee Last Name: </strong> {employee.lastName}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Employee Email: </strong> {employee.email}</p>
                                </div>
                                <h3 className='text-center card-header'>View Department Details</h3>
                                <div className='row'>
                                    <p><strong>Department Name: </strong> {department.departmentName}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Department Description: </strong> {department.departmentDescription}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Department Code: </strong> {department.departmentCode}</p>
                                </div>
                                <h3 className='text-center card-header'>View Organization Details</h3>
                                <div className='row'>
                                    <p><strong>Organization Name: </strong> {organization.organizationName}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Organization Description: </strong> {organization.organizationDescription}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Organization Code: </strong> {organization.organizationCode}</p>
                                </div>
                                <div className='row'>
                                    <p><strong>Organization Created Date: </strong> {organization.createdDate}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeComponent;
