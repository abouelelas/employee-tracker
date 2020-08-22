USE employee_db;

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Information Technology");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Salespersom", 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 110000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 90000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", 2, 21);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Layla", "Mouse", 1, 22);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Adam", "Fortnite", 3, 23);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jane", "Doe", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Wilson", "Ball", 5, null);