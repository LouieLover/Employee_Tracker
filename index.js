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
    database: "employeeDB"
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
    console.log(query.sql);
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
            message: "Title, Salary, Department id",
            type: "input",

        }])
    );

    // logs the actual query being run
    console.log(query.sql);
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
            message: "First Name, Last Name, Role id, Manager id",
            type: "input",

        }])
    );

    // logs the actual query being run
    console.log(query.sql);
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
    console.log(query.sql);
}

function deleteProduct() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
        "DELETE FROM products WHERE ?", {
            flavor: "strawberry"
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}