USE office_db;

INSERT INTO department (name)
VALUES ("Finance"), 
       ("Sales"),
       ("Human Resources"),
       ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES ("Head of Human Resouces", 60000, 3),
       ('Human Resources Rep', 45000, 3),
       ('Warehouse Foreman', 50000, 4),
       ('Warehouse Worker', 40000, 4),
       ('Accountant', 42000, 1),
       ('Accountant', 45000, 1),
       ('Head Accountant', 57000, 1),
       ('Sales Representative', 40000, 2),
       ('Salesman', 50000, 2),
       ('Sales Manager', 60000, 2);

       


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Toby', 'Flenderson', 1, 1),
       ('Kelly', 'Kapoor', 2, NULL),
       ('Darryl', 'Philbin', 3, 3),
       ('Val', 'Johnson', 4, NULL),
       ('Kevin', 'Malone', 5, NULL),
       ('Oscar', 'Martinez', 6, NULL),
       ('Angela', 'Martin', 7, 7),
       ('Phyllis', 'Vance', 8, NULL),
       ('Dwight', 'Schrute', 9, NULL), 
       ('Jim', 'Halpert', 10, 10); 

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
