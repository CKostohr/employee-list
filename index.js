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
    wypAll = new wyp(newConnection)
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
                await wypAll.viewEmploy()
                loadQ()
                break
            case 'Add employee':
                addEmployee()
                break
        }
    })
}