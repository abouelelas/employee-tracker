
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
-- * **department**:

--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name

CREATE TABLE departments(
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id),
FOREIGN KEY (department_id),
REFERENCES department(id)
);
-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to

CREATE TABLE role (
id INT AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(8,2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY(department_id), 
REFERENCES departments(id),
PRIMARY KEY(id)
);
-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. 
--   This field may be null if the employee has no manager
CREATE TABLE employee(
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id);
FOREIGN KEY(role_id),
REFERENCES role(id),
FOREIGN KEY (manager_id) 
REFERENCES employee(id)
);


