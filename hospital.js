"use strict"
const faker = require('faker')
const readline = require('readline');
const fs = require('fs')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

class Interface{
  constructor(){
    this.user = []
    this.pass = []
  }
  header(){
    console.log(`Welcome to ${rumahSehat.name} Hospital`);
    console.log("-------------------------------------------");
  }
  login(){
    rl.prompt()
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', (password) => {
        this.user.push(`${username}`);
        this.pass.push(`${password}`);
        console.log(this.user, this.pass);
        rl.close()
      });
    });
  };
}

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.employeesList = []
  }
  addEmployee(name, position, username, password){
    this.employeesList.push(new Employee(name, position, username, password))
    return this.employeesList
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

var rumahSehat = new Hospital('Rumah Sehat', 'Pondok Indah', 15, 70);
console.log(rumahSehat.addEmployee(faker.name.findName(), "admin", faker.name.firstName(), "12345"))
// console.log(rumahSehat);
// var menu = new Interface();
// menu.header()
// menu.login()
