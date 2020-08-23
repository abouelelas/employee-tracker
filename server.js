const inquirer = require('inquirer');
const mysql = require('mysql');
// const Table = require('cli-table3');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3306,

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

const startQuestions =()=> {
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
                "View total department budget",
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
                case "View total department budget":
                    viewBudget();
                    break;
                default:
                    connection.end();
                    break;
                // default:
                //     startQuestions();
            }
        });
}
const viewEmployees = ()=> {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    })
}
const viewDepartments =()=> {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    });
}
const viewRoles =() => {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.log("\n");
        console.table(data);
        console.log("\n");
        startQuestions();
    });
}


const addEmployee =()=> {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err)
            throw (err);
        // console.log(results);
        let managerChoices = results.map(e => {
            return {
                name: e.first_name + " " + e.last_name,
                value: e.id
            }
        });
        managerChoices.push({
            name: "no manager", value: null
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
    const  addDepartment = () =>{
    let departmentList = [];
    let departmentIdList = [];

    connection.query("SELECT * FROM employee_db.department", function (
        err,
        res
    ) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departmentList.push(res[i].name);
            departmentIdList.push(res[i].id.toString());
        }

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "department",
                    message: "Enter Department Name",
                },
            ])
            .then((val) => {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: val.department,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("\n");
                        console.log("successfully added Department");
                        console.log("\n");
                        startQuestions();
                    }
                );
            });
    }
    );
};
const addRole = () => {
    let roleList = [];
    let roleIdList = [];

    let salaryList = [];
    let deptIdList = [];

    connection.query("SELECT role_id, title, salary, department_id FROM role LEFT JOIN department ON role.department_id = department.id;", function (
        err,
        res
    ) {
        if (err) console.log(err);
        for (var i = 0; i < res.length; i++) {
            roleList.push(res[i].title);
            roleIdList.push(res[i].id.toString());
            salaryList.push(res[i].salary);
            deptIdList.push(res[i].department_id)
        }

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleId",
                    message: "Enter Role Name"
                },
                {
                    type: "number",
                    name: "salary",
                    message: "Enter Salary"
                },
                {
                    type: "input",
                    name: "department",
                    message: "Enter Department ID"
                },
            ])
            .then((val) => {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: val.title,
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("\n");
                        console.log("successfully added Role");
                        console.log("\n");
                        startQuestions();
                    }
                );
            });
    }
    );
}

const updateEmployee = () => {

    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Enter employee ID",
        })
        .then(function (answer) {
            var id = answer.id;
            inquirer
                .prompt({
                    name: "roleId",
                    type: "input",
                    message: "Enter role ID",
                })
                .then(function (answer) {
                    var roleId = answer.roleId;
                    var query = "UPDATE employee SET role_id=? WHERE id=?";
                    connection.query(query, [roleId, id], function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('updating employee role');
                        startQuestions();
                    });
                });
        });
}
const viewBudget = () => {
    let departmentList = ["Engineering", "Sales", "Information Technology", "Finance"];
    inquirer
        .prompt({
            name: "departmentList",
            type: "list",
            message: "Choose a department to view the budget",
            choices: departmentList
        }).then(function (response) {
            var deptList = response.deptList;
            var query = "SELECT name, SUM(salary) FROM department LEFT JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id GROUP BY department.name;"
            connection.query(query, deptList, function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.table(res);
                startQuestions();
            });
        }
        )
}

function exit() {
    connection.end();

}