const mysql = require('mysql2');
const inquirer = require('inquirer');
const console_table = require('console.table');

const wyp = require('./db/index.js');
const connection = require('./db/connection');
const { allowedNodeEnvironmentFlags} = require('process');
const {doesNotMatch} = require('assert');
const { async } = require('rxjs');

let wpyAll 

async function init() {
    let newConnection = await connection
    wpyAll = new wyp(newConnection)
    loadQ()
}

async function loadQ() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'How can I assist you?',
            choices: ['view all employees', 'add employee', 'update employee role', 'view all roles', 'add role', 'view all departments', 'add department', 'exit'],
        },
    ]).then(async (data) => {
        switch (data.action) {
            case 'View all employees':
                await wpyAll.viewEmploy()
                loadQ()
                break
            case 'Add employee':
                addEmployee()
                break
            case 'Update employee role':
                updateEmployeeRole
                break
            case 'View all roles':
                await wpyAll.viewRoles()
                loadQ()
                break
            case 'Add role':
                addRole()
                break
            case 'View all departments':
                await wpyAll.viewDepartment()
                loadQ()
                break
            case 'All departments':
                addDepartmnet()
                break
            case 'Exit':
                let myConnection = await connection()
                myConnection.end()
        }
    })
}

async function addEmployee(){
    const roleChoices = await wpyAll.getRoles()
    const employeeChoices = await wpyAll.getEmployees()
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'The first name of employee?'
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'The last name of employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id?',
            choices: roleChoices
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager id?',
            choices: employeeChoices
        },
    ]).then(async (data) => {
        await wpyAll.addEmployee(data.firstname, data.lastname, data.role_id, data.manager_id)
        console.log('New employee created')

        loadQ()
    })
}

async function updateEmployeeRole() {
    const roleChoice = await wpyAll.getRoles()
    const employeeChoice = await wpyAll.getEmployees()
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'chooseEmployee',
            message: 'Choose employee role to update.',
            choices: employeeChoice
        },
        {
            type: 'input',
            name: 'updateRole',
            message: 'What is the employees new role?',
            choices: roleChoice
        },
    ]).then(async (data) => {
        await wpyAll.updateRole(data.chooseEmployee, data.updateRole)
        console.log('Role has been updated.')

        loadQ()
    })
}
async function addRole() {
    const departmentChoice = await wpyAll.getDepartments()
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What department is the role?',
            choices: departmentChoice
        },
    ]).then(async (data) => {
        await wpyAll.addrole(data.title, data.salary, data.department_id)
        console.log('Role created.')

        loadQ()
    })
}

async function addDepartmnet() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Name of department?'
        },
    ]).then(async (data) => {
        await wpyAll.addDepartmnet(data.department_name)
        console.log('Department created')
        loadQ()
    })
}

init()