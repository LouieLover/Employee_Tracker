DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) ,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) ,
  salary DECIMAL (8,2),
  deparment_id INT ,
  PRIMARY KEY (id)
 
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) ,
  last_name VARCHAR(30) ,
  role_id INT ,
  manager_id INT ,
  PRIMARY KEY (id)
 
);

INSERT INTO department (Deparment) 
VALUES();

INSERT INTO role (title, salary, department_id)
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manger_id)
VALUES ();

REPLACE role (first_name, last_name, role_id, manger_id)
VALUES ();

SELECT * FROM employee;
SELECT * FROM deparment;
SELECT * FROM role;