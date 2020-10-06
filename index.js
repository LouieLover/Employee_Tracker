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
    start();

});
// "View Employees", "View Departments", "Add Employee", "Add Department", "Add Role", "Update Employee Role"

function start() {
    inquirer
        .prompt({
            name: "Employee_Tracker",
            message: "What do you want to do?",
            choices: ["View Departments", "View Manager", "View Employees", "View Role", "Add Department", "Add Employee", "Add Role", "Update Employee Role", "Update Employee Manager", "Delete Department", "Delete Employee", "Delete Role", "Quit"],
            type: "list"

        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.Employee_Tracker === "View Employees") {
                viewEmployees();
            } else if (answer.Employee_Tracker === "View Departments") {
                viewDepartments();
            } else if (answer.Employee_Tracker === "View Role") {
                viewRole();
            } else if (answer.Employee_Tracker === "View Manager") {
                viewManager();
            } else if (answer.Employee_Tracker === "Add Employee") {
                createEmployee();
            } else if (answer.Employee_Tracker === "Add Department") {
                createDepartment();
            } else if (answer.Employee_Tracker === "Add Role") {
                createRole();
            } else if (answer.Employee_Tracker === "Update Employee Role") {
                updateEmployeeRole();
            } else if (answer.Employee_Tracker === "Update Employee Manager") {
                updateEmployeeManager();
            } else if (answer.Employee_Tracker === "Delete Department") {
                deleteDepartment();
            } else if (answer.Employee_Tracker === "Delete Role") {
                deleteRole();
            } else if (answer.Employee_Tracker === "Delete Employee") {
                deleteEmployee();
            } else {
                connection.end();
            }
        });
}


function createDepartment() {
    console.log("Inserting a new department...\n");
    inquirer
        .prompt([{
            name: "department",
            message: "Enter Department",
            type: "input"
        }]).then(answers => {
            var query = connection.query("INSERT INTO department SET ?", {
                    department: answers.department

                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Department added!\n");
                    // Call updateProduct AFTER the INSERT completes

                    console.log(res);

                    start();
                });

        });
}

// logs the actual query being r

function createRole() {
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
            var query = connection.query("INSERT INTO role SET ?", {
                    title: answers.role,
                    salary: answers.salary,
                    deparment_id: answers.department_id

                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Role added!\n");
                    // Call updateProduct AFTER the INSERT completes

                    console.log(res);

                    start();
                });

        });
}

function createEmployee() {
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
            var query = connection.query("INSERT INTO employee SET ?", {
                    first_name: answers.firstname,
                    last_name: answers.lastname,
                    role_id: answers.role_id,
                    manager_id: answers.manager_id

                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Employee Created!\n");
                    // Call updateProduct AFTER the INSERT completes

                    console.log(res);

                    start();
                });

        });
}


function updateEmployeeRole() {
    inquirer
        .prompt([{
                name: "Update_Role",
                message: "What is new role id?",
                type: "input",
            },
            {
                name: "employee_id",
                message: "Which employee do you want to update?",
                type: "input"
            }
        ]).then(answers => {
            var query = connection.query("UPDATE employee SET ? WHERE ? ", [{
                        role_id: answers.Update_Role

                    },
                    {
                        id: answers.employee_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Updated Employee Role!\n");
                    // Call updateProduct AFTER the INSERT completes

                    console.log(res);

                    start();
                });

        });
}

function updateEmployeeManager() {
    inquirer
        .prompt([{
                name: "Update_Manager",
                message: "What is new manager id?",
                type: "input",
            },
            {
                name: "manager_id",
                message: "Which manager do you want to update?",
                type: "input"
            }
        ]).then(answers => {
            var query = connection.query("UPDATE employee SET ? WHERE ? ", [{
                        manager_id: answers.Update_Manager

                    },
                    {
                        id: answers.manager_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Updated Manager id!\n");
                    // Call updateProduct AFTER the INSERT completes

                    console.log(res);

                    start();
                });

        });
}


function deleteDepartment() {
    let departments = [];
    connection.query("SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            departments = res;
            inquirer
                .prompt([{
                    name: "Delete_Department",
                    message: "Delete Department id?",
                    type: "list",
                    choices: departments.map(item => {
                        return {
                            name: item.department,
                            value: item.id
                        };
                    })
                }]).then(answers => {
                    var query = connection.query("DELETE FROM department WHERE ? ", [{
                            id: answers.Delete_Department
                        }],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " Deleted Department Role!\n");
                            // Call updateProduct AFTER the INSERT completes

                            console.log(res);

                            start();
                        });

                });
        });

}

function deleteRole() {
    let role = [];
    connection.query("SELECT * FROM role",
        function(err, res) {
            if (err) throw err;
            role = res;
            inquirer
                .prompt([{
                    name: "Delete_Role",
                    message: "Delete Role id?",
                    type: "list",
                    choices: role.map(item => {
                        return {
                            name: item.role,
                            value: item.id
                        };
                    })
                }]).then(answers => {
                    var query = connection.query("DELETE FROM role WHERE ? ", [{
                            id: answers.Delete_Role
                        }],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " Deleted Role!\n");
                            // Call updateProduct AFTER the INSERT completes

                            console.log(res);

                            start();
                        });

                });
        });

}

function deleteEmployee() {
    let employee = [];
    connection.query("SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            employee = res;
            inquirer
                .prompt([{
                    name: "Delete_Employee",
                    message: "Delete Employee id?",
                    type: "list",
                    choices: employee.map(item => {
                        return {
                            name: item.employee,
                            value: item.id
                        };
                    })
                }]).then(answers => {
                    var query = connection.query("DELETE FROM employee WHERE ? ", [{
                            id: answers.Delete_Employee
                        }],
                        function(err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " Deleted Employee!\n");
                            // Call updateProduct AFTER the INSERT completes

                            console.log(res);

                            start();
                        });

                });
        });

}

// l
// logs the actual query being run

function viewEmployees() {
    console.log("All employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}

function viewManager() {
    console.log("All managers...\n");
    connection.query("SELECT manager_id FROM employeeTrackerDb.employee", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}

function viewDepartments() {
    console.log("All departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}

function viewRole() {
    console.log("All roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
    });
}