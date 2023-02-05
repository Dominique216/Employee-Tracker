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
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
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
    : options(); 
}

// TODO: DEFINE ALL DEPARTMENTS DB QURERY
allDepartments = () => {
    db.query(`SELECT id, name AS department FROM department;`, (err, results) => {
        err ? console.log(err) : console.table(results)
        options()
    })
    
}

// TODO: DEFINE ALL ROLES DB QUERY
allRoles = () => {
    db.query(`SELECT role.title,role.id, name AS department, role.salary FROM department
    JOIN role ON department_id = department.id;`, (err, results) => {
        err ? console.log(err) : console.table(results)
        options()
    })
}

// TODO: DEFINE ALL EMPLOYEES DB QUERY
allEmployees = () => {

}

// TODO: ADD DEPARTMENT FUNCTION
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
        options()
    }) 
        })
    
}

// TODO: ADD ROLE FUNCTION
// choicesofDepartments = () => {
//     db.query(`SELECT name FROM department;`, (err, results) => {
//                     err ? console.log(err) : results.forEach(obj => obj.name)
//                 })

// }

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
                choices: []
            },
        ])
        .then((data) => {
            db.query(`INSERT INTO role (title, salary, id)
 VALUE (?)`, )
        })
 
}

// TODO: ADD AN EMPLOYEE FUNCTION
addEmployee = () => {

}

// TODO: UPDATE EMPLOYMEE FUNCTION
updateEmployee = () => {
    
}

init = () => {
    options()
};

init()

