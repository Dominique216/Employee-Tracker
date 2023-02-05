const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');
const cTable = require('console.table');

options = () => {
    inquirer
        .prompt([
            {
                type: 'checkbox', 
                name: 'options', 
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'View the total utilized budget of a department']
            }
        ])
        .then((data) => {
            nextQuesitonSet(data.options[0])
        })
}

nextQuesitonSet = (data) => {
    (data === 'View All Departments') ?  allDepartments()
    : (data === 'View All Roles') ? allRoles()
    : (data === 'View All Employees') ? allEmployees()
    : (data === 'Add A Department') ? addDepartment()
    : (data === 'Add A Role') ? addRole()
    : (data === 'Add An Employee') ? addEmployee()
    : (data === 'Update An Employee Role') ? updateEmployee() 
    : (data === 'View the total utilized budget of a department') ? budget()
    : options(); 
}

// ALL DEPARTMENTS 
allDepartments = () => {
    db.query(`SELECT id, name AS department FROM department;`, (err, results) => {
        err ? console.log(err) : console.table(results)
        options()
    })
    
}

// ALL ROLES
allRoles = () => {
    db.query(`SELECT role.title,role.id, name AS department, role.salary FROM department
    JOIN role ON department_id = department.id;`, (err, results) => {
        err ? console.log(err) : console.table(results)
        options()
    })
}

// ALL EMPLOYEES
allEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, name AS department, role.salary, employee.manager_id
    FROM department
    JOIN role ON department_id = department.id
    JOIN employee ON role_id = role.id;`, (err, results) => {
        err ? console.log(err) : console.table(results)
        options()
    })

}

// ADD DEPARTMENT FUNCTION
addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                name: 'newDepartment',
                message: 'What is the new department name?'
            }
        ])
        .then((data) => {
           db.query(`INSERT INTO department (name)
    VALUE (?)`, data.newDepartment, (err, results) => {
        err ? console.log(err) : console.log(`Added ${data.newDepartment} to the database!`) 
                                departmentArr.push(data.newDepartment);
        options()
    }) 
        })
    
}

// ADD ROLE FUNCTION
const departmentArr = []
db.query(`SELECT name FROM department;`, (err, results) => {
                    err ? console.log(err) : results.forEach(obj => departmentArr.push(obj.name))    
                })


addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                name: 'roleName',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input', 
                name: 'roleSalary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'checkbox', 
                name: 'roleDepartment',
                message: 'What department is the new role in?',
                choices: departmentArr
            },
        ])
        .then((data) => {
            const index = departmentArr.indexOf(data.roleDepartment[0])
            const id = index + 1
            db.query(`INSERT INTO role (title, salary, department_id)
 VALUE (?, ?, ?)`, [data.roleName, data.roleSalary, id], (err, results) => {
    err ? console.log(err) : console.log(`Added ${data.roleName} to the database`)
                            roleArr.push(data.roleName);
    options()
 })
        })
 
}

// ADD AN EMPLOYEE FUNCTION
const roleArr = []
db.query(`SELECT title FROM role;`, (err, results) => {
                    err ? console.log(err) : results.forEach(obj => roleArr.push(obj.title))    
                })

const employeeArr1 = []
const employeeArr2 = []
let employeeArrTotal = []

db.query(`SELECT last_name, first_name FROM employee;`, (err, results) => {
                    if(err) {
                        console.log(err)
                    } else {
                        results.forEach(obj => {
                            employeeArr1.push(`${obj.first_name} `)
                            employeeArr2.push(obj.last_name)
                            
                        }) 
                       employeeArrTotal.push(employeeArr1.map((e,i) => e + employeeArr2[i])) 
                    }  
                })


addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input', 
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input', 
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'checkbox', 
                name: 'employeeRole',
                message: "What is the employee's role?",
                choices: roleArr
            },
            {
                type: 'checkbox', 
                name: 'employeeManager',
                message: "Who is the new employee's manager? (If no manager just press enter)",
                choices: employeeArrTotal[0]
            },
        ])
    .then((data) => {
        const roleindex = roleArr.indexOf(data.employeeRole[0]);
        const roleid = roleindex + 1;
        const managerindex = employeeArrTotal[0].indexOf(data.employeeManager[0]);
        const managerid = () => {
            if(managerindex === -1) {
                return null
            } else {
                return managerindex+1
            }
        }
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUE(?, ?, ?, ?)`,[data.firstName, data.lastName, roleid, managerid()], (err, result) => {
            err ? console.log(err) : console.log(`Added new employee to the database`)
            options()
        })
    })
}

// UPDATE EMPLOYMEE FUNCTION
updateEmployee = () => {
    inquirer
    .prompt([      
        {
            type: 'checkbox', 
            name: 'employeeUpdate',
            message: "Who is the employee you want to update?",
            choices: employeeArrTotal[0]
        },
        {
            type: 'checkbox', 
            name: 'employeeNewRole',
            message: "What is the employee's new role?",
            choices: roleArr
        },
    ])
    .then((data) => {
        const newroleindex = roleArr.indexOf(data.employeeNewRole[0]);
        const newroleid = newroleindex + 1;
        const employeeindex = employeeArrTotal[0].indexOf(data.employeeUpdate[0]);
        const employeeid = employeeindex +1;
        db.query(`UPDATE employee SET role_id  = ? WHERE id = ? `, [newroleid, employeeid], (err, result) => {
            err ? console.log(err) : console.log(`Updated employee in the database`)
            options()
        })
    })
}

// BUDGET FUCNTION
budget = () => {
    inquirer
    .prompt([
        {
            type: 'checkbox', 
            name: 'budget',
            message: 'Which department would yo ulike to view?',
            choices: departmentArr
        },
    ])
    .then((data) => {
        db.query(`SELECT name, SUM(salary) AS total_department_salary
        FROM role
        JOIN department ON department_id = department.id
        WHERE name = ?`, data.budget[0], (err, results) => {
            (err) ? console.log(err) : console.table(results)
        options()
        })
    })
}

init = () => {
    options()
};

init()

