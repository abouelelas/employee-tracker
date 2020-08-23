# Unit 12 MySQL Homework: Employee Tracker

As full stack developers we were tasked with creating an interface that could make it easy for non-developers to view and interact with information stored in databases. These interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, I architected and built a solution for managing a company's employees using node, inquirer, and MySQL.

I designed these 3 tables in mySQL Workbench.

* **department**:
  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:
  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
The user will be  able to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * View total budget by department 

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```
I installed the mysql, console.table, inquirer npm packages.
* A video demonstrating the entirety of the app's functionality 
![Employee Tracker](https://drive.google.com/file/d/1DLy5PyzBRG6HYIp9qdaWN46iI8y4oyd5/view)

* The URL of the GitHub repository
(Employee Tracker)[https://github.com/abouelelas/employee-tracker]





