const inquirer = require('inquirer');
const mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "rootpassword",
    database: "employees_db"
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
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
            console.log("response".reponse);
            return viewDepartments();
        case "View all roles?":
            return viewRoles();
        case "View all employees":
            return viewEmployees();
        case "Add a department":
            return addDepartment();
        case "Add a Role":
            return addRole();
        case "Add an employee":
            return addEmployee();
        case "Update employee role":
            return updateEmployee();
        case "Exit":
            return connection.end();
        }
        
} 
})
}



