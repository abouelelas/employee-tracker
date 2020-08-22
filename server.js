const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require('cli-table3');


const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootpassword",
    database: "employee_db"
});
connection.connect(function (err) {
    if (err) throw err;
    startQuestions();
});

function startQuestions() {
    inquirer
        .prompt({
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Exit"
            ]
        }).then(answer => {
            switch (answer.choice) {
                case "View all roles?":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View a department":
                    viewDepartments();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    startQuestions();
            }
        });
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
       startQuestions();
    })
}
    function viewDepartments() {
        connection.query("SELECT * FROM department", function (err, data) {
            console.table(data);
            console.log("\n");
            startQuestions();
        });
    };

function addEmployee(){
        inquirer.prompt([{
                type: "input",
                name: "firstName",
                message: "What is the employees first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employees last name?"
            },
            {
                type: "number",
                name: "roleId",
                message: "What is the employees role ID"
            },
            {
                type: "number",
                name: "managerId",
                message: "What is the employees manager's ID?"
            }
        ]).then(function(res) {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
                if (err) throw err;
                console.table("Successfully Inserted");
                startQuestions();
            })
        })
    }
