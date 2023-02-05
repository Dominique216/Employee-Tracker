USE office_db;

INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Warehouse"),
       ("Finance"), 
       ("Sales");
       
       

INSERT INTO role (title, salary, department_id)
VALUES ("Head of Human Resouces", 65000, 1),
       ('Human Resources Rep', 50000, 1),
       ('Warehouse Foreman', 55000, 2),
       ('Warehouse Worker', 42000, 2),
       ('Head Accountant', 65000, 3),
       ('AccountantI', 52000, 3),
       ('AccountantII', 57000, 3),
       ('Sales Manager', 67000, 4),
       ('Sales Representative', 50000, 4),
       ('Salesman', 58000, 4);

       


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Toby', 'Flenderson', 1, NULL),
       ('Kelly', 'Kapoor', 2, 1),
       ('Darryl', 'Philbin', 3, NULL),
       ('Val', 'Johnson', 4, 3),
       ('Angela', 'Martin', 5, NULL),
       ('Kevin', 'Malone', 6, 5),
       ('Oscar', 'Martinez', 7, 5),
       ('Jim', 'Halpert', 8, NULL),
       ('Phyllis', 'Vance', 9, 8),
       ('Dwight', 'Schrute', 10, 8); 
        
