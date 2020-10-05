var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "$Mothership24",
    database: "playlistDB"
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

function createDeparment() {
    console.log("Inserting a new department...\n");
    var query = connection.query(
        "INSERT INTO department SET ?", {
            department: "",

        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " Department added!\n");
            // Call updateProduct AFTER the INSERT completes
            updateDepartment();
        }
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
        }
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
        }
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
        }
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