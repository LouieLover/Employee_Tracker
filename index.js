var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1234",
    database: "employeeTrackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();

});

function afterConnection() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

start();

function start() {
    inquirer
        .prompt({
            name: "Employee_Tracker",
            message: "What do you want to do?",
            choices: ["View Employees", "View Departments", "Add Employee", "Add Department", "Add Role", "Update Employee Role"],
            type: "checkbox"

        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.Employee_Tracker === "View Employees") {
                viewEmployees();
            } else if (answer.Employee_Tracker === "View Departments") {
                viewDepartments();
            } else if (answer.Employee_Tracker === "Add Employee") {
                createEmployee();
            } else if (answer.Employee_Tracker === "Add Department") {
                createDepartment();
            } else if (answer.Employee_Tracker === "Add Role") {
                createRole();
            } else if (answer.Employee_Tracker === "Update Employee Role") {
                updateEmployeeRole();
            } else {
                connection.end();
            }
        });
}


function createDepartment() {
    console.log("Inserting a new department...\n");
    var query = connection.query(
        "INSERT INTO department SET ?", {
            department: "answer.department",

        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Department added!\n");
            // Call updateProduct AFTER the INSERT completes
            updateDepartment();
        },
        inquirer
        .prompt([{
            name: "department",
            message: "Enter Department",
            type: "input"
        }]).then(answers => {
            const department = new Department(answers.department);
            department.save(employeeTrackerDB.sql);
            console.log(department);
        })
    );

    // logs the actual query being run
    console.log("Created Department");

    start();
}

function createRole() {
    console.log("Creating a new Role...\n");
    var query = connection.query(
        "INSERT INTO role SET ?", {
            title: "answers.title",
            salary: "answers.salary",
            department_id: "answer.department_id",

        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Role added!\n");
            // Call updateProduct AFTER the INSERT completes
            updateRole();
        },
        inquirer
        .prompt([{
                name: "role",
                message: "Title",
                type: "input",
            },
            {
                name: "salary",
                message: "Salary",
                type: "input"
            },
            {
                name: "department_id",
                message: "Department id",
                type: "input"
            }
        ]).then(answers => {
            const role = new updateRole(answers.role, answers.salary, answers.department_id);
            role.save(employeeTrackerDB.sql);
            console.log(updatedRole);
        })
    );

    // logs the actual query being run
    console.log("Created Role");

    start();
}

function createEmployee() {
    console.log("Creating a new Employee...\n");
    var query = connection.query(
        "INSERT INTO employee SET ?", {
            first_name: "answers.first_name",
            last_name: "answers.last_name",
            role_id: "answer.role_id",
            manager_id: "answer.manger_id",

        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " New Employee added!\n");
            // Call updateProduct AFTER the INSERT completes
            updateEmployee();
        },
        inquirer
        .prompt([{
                name: "firstname",
                message: "First Name",
                type: "input",
            },
            {
                name: "lastname",
                message: "Last Name",
                type: "input",
            },
            {
                name: "role_id",
                message: "Role id",
                type: "input",
            },
            {
                name: "manager_id",
                message: "Manager id",
                type: "input",
            }
        ]).then(answers => {
            const employee = new UpdateEmployee(answers.firstname, answers, lastname, answers.role_id, answers.manager_id);
            employee.save(employeeTrackerDB.sql);
            console.log(UpdatedEmployee);
        })
    );

    // logs the actual query being run
    console.log("Added Employee");

    start();
}

function updateEmployeeRole() {
    console.log("Updating employee role...\n");
    var query = connection.query(
        "UPDATE employee SET ? WHERE ?", [{
                employee: "answers.employee"
            },

        ],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            updatedEmployeeRole();
        },
        inquirer
        .prompt([{
            name: "Update_Role",
            message: "Update Role",
            type: "input",

        }]).then(answers => {
            const employeeRoll = new updatedEmployeeRole(answers.Update_Role);
            employeeRoll.save(employeeTrackerDB.sql);
            console.log(updateEmployeeRole);
        })
    );

    // logs the actual query being run
    console.log("Updated Role");

    start();
}

function viewEmployees() {
    console.log("All employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}

function viewDepartments() {
    console.log("All departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}