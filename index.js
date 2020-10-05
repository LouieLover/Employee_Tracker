var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "$Mothership24",
    database: "employeeTrackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}


function start() {
    inquirer
        .prompt({
            name: "Employee_Tracker",
            message: "What do you want to do?",
            choices: ["View Employees", "View Departments", "Add Employee", "Add Department", "Add Role", "Update Employee Role"]
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
                updateEmployee();
            } else {
                connection.end();
            }
        });
}


function createDeparment() {
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
        }])
    );

    // logs the actual query being run
    console.log("Created Department");

    start();
}

function createRole() {
    console.log("Creating a new Role...\n");
    var query = connection.query(
        "INSERT INTO role SET ?", {
            title: "",
            salary: "",
            department_id: "",

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
                message: "Salary",
                type: "input"
            },
            {
                message: "Department id",
                type: "input"
            }
        ])
    );

    // logs the actual query being run
    console.log("Created Role");

    start();
}

function createEmployee() {
    console.log("Creating a new Employee...\n");
    var query = connection.query(
        "INSERT INTO employee SET ?", {
            first_name: "",
            last_name: "",
            role_id: "",
            manager_id: "",

        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " New Employee added!\n");
            // Call updateProduct AFTER the INSERT completes
            updateEmployee();
        },
        inquirer
        .prompt([{
                name: "Employee",
                message: "First Name",
                type: "input",
            },
            {
                message: "Last Name",
                type: "input",
            },
            {
                message: "Role id",
                type: "input",
            },
            {
                message: "Manager id",
                type: "input",
            }
        ])
    );

    // logs the actual query being run
    console.log("Added Employee");

    start();
}

function updateEmployeeRole() {
    console.log("Updating employee role...\n");
    var query = connection.query(
        "UPDATE employee SET ? WHERE ?", [{
                quantity: 100
            },
            {
                flavor: "Rocky Road"
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            updatedEmployeeRole();
        },
        inquirer
        .prompt([{
            name: "Update Role",
            message: "Update Role",
            type: "input",

        }])
    );

    // logs the actual query being run
    console.log("Updated Role");

    start();
}

function viewEmployees() {
    console.log("All employees...\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}

function viewDepartments() {
    console.log("All departments...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        start();
    });
}