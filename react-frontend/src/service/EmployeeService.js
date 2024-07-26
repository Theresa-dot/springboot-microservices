import axios from 'axios';

const employee_service_base_url = "http://localhost:9191/api/employees";

class EmployeeService {
    getEmployee(employee_id) {
        return axios.get(`${employee_service_base_url}/${employee_id}`);
    }
}

export default new EmployeeService();
