USE office_db;


-- all departments
SELECT id, name AS department FROM department;

-- all roles
SELECT role.title,role.id, name AS department, role.salary 
FROM department
JOIN role
ON department_id = department.id;

-- all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, employee.manager_id
FROM department
JOIN role ON department_id = department.id
JOIN employee ON role_id = role.id;


-- add department 
INSERT INTO department (name)
    VALUE (?)

-- add Role 
INSERT INTO role (title, salary, id)
    VALUE (?)

-- add employee (will need to )
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE(?, ?, ?, ?)

-- update employee
UPDATE employee SET role_id  = 10 WHERE id = 7;



-- SELECT m.manager_id 
-- FROM employee m
-- JOIN employee e ON e.last_name = m.id;
-- WITH employee AS (
--     SELECT last_name, manager_id
--     FROM employee
--     WHERE manager_id IS NULL
--     UNION ALL

--     SELECT e.last_name, e.manager_id
--     FROM employee e INNER JOIN employee m 
--     ON e.manager_id = m.id
-- )

-- SELECT * FROM employee ;

-- WITH RECURSIVE Emp_CTE (manager_id)
-- AS (
--     SELECT last_name,
--         manager_id, 
--     FROM employee
--     WHERE manager_id IS NULL
--     UNION ALL 
--         SELECT e.last_name,
--             e.manager_id, 
--         FROM employee e
--         INNER JOIN Emp_CTE ON Emp_CTE.id = e.manager_id
-- )
-- SELECT * FROM Emp_CTE;

-- SELECT m.id, m.last_name AS manager, e.manager_id
-- FROM employee e
-- INNER JOIN employee m
-- ON (m.id = e.manager_id);

-- SELECT last_name, manager_id FROM employee;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, employee.manager_id
-- FROM department
-- JOIN role ON department_id = department.id
-- JOIN employee ON role_id = role.id;




-- SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, m.id, m.last_name
-- FROM employee e
-- JOIN employee m ON (e.manager_id = m.id)
-- JOIN role ON role_id = role.id
-- JOIN department ON department_id = ; 