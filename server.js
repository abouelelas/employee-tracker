const inquirer = require('inquirer');
const mysql = require('mysql');
// const Table = require('cli-table3');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port
    // port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootpassword",
    database: "employee_db"

});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to");
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
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all departments":
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
                default:
                    connection.end();
                    break;
                // default:
                //     startQuestions();
            }
        });
}
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    })
}
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    });
}
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    });
}


function addEmployee() {
    connection.query("SELECT * FROM employee", (err, results)=>{
        if (err)
        throw(err);
            // console.log(results);
        let managerChoices = results.map( e => {
            return {
                name: e.first_name + " " + e.last_name,
                value: e.id
            }
        });
        managerChoices.push({
            name: "no manager",value: null
        })
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
            type: "list",
            name: "managerId",
            message: "What is the employees manager's ID?",
            choices: managerChoices
        }
        ]).then(function (res) {
            connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
                if (err) throw err;
                console.table("Successfully Inserted");
                startQuestions();
            })
        })
    });


}
