const inquirer = require('inquirer');
// const db = require('./config/connection');

// need function for main question (use inquierer to ask qestion, then depending on data go to next functino for next set of questions)
// run this functino in an inint funciton at the end of the program

// Shoudl have a function for each main question that hadles dq quieries and asks additon questions needed

// Should have seperate functions for add and update employees/roles. 

// Askes the inital question and will go to the next function depending on answer
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

}

// TODO: DEFINE ALL ROLES DB QUERY
allRoles = () => {

}

// TODO: DEFINE ALL EMPLOYEES DB QUERY
allEmployees = () => {

}

// TODO: ADD DEPARTMENT FUNCTION
addDepartment = () => {

}

// TODO: ADD ROLE FUNCTION
addRole = () => {

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