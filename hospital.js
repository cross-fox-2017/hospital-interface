"use strict"
const faker = require('faker')
const readline = require('readline');
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Interface{
  constructor(){
    this.user = []
    this.pass = []
    this.active = {}
  }
  header(){
    console.log(`Welcome to ${rumahSehat.name} ${rumahSehat.location} Hospital`);
    console.log("-------------------------------------------");
  }
  login(){
    rl.prompt()
    rl.question('Please enter your username: ', (username) => {
      rl.question('Please enter your password: ', (password) => {
        this.user.push(`${username}`);
        this.pass.push(`${password}`);
        if (this.cek()){
          this.mainPage()
          this.option()
        } else {
          console.log("user atau password anda salah")
          rl.close()
        }
        rl.close()
      });
    });
  };
  cek(){
    for (var i = 0; i <rumahSehat.employeesList.length; i++){
      if (rumahSehat.employeesList[i].username == this.user[0]){
        if (rumahSehat.employeesList[i].password == this.pass[0]){
          this.active = rumahSehat.employeesList[i]
          return true
        }
      }
    }
    return false
  };
  mainPage(){
    console.log("-----------------------------------");
    console.log(`Selamat datang, ${this.active.name}. Your access level is ${this.active.position}`);
    console.log("-----------------------------------");
  }
  option(){
    if (this.active.position === "dokter"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_patients\n 2 -- view_records <patient_id>\n 3 -- add_record <patient_id> \n 4 -- remove_record <patient_id><record_id>\n`)
    } else if(this.active.position === "administrator"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_karyawan\n 2 -- tambah_karyawan\n 3 -- pecat_karyawan\n 4 -- tambah_pasien\n`)
    };
  }
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

var rumahSehat = new Hospital(faker.company.companyName(), faker.address.city(), 15, 70);
rumahSehat.addEmployee(faker.name.findName(), "administrator", "admin", "12345")
rumahSehat.addEmployee(faker.name.findName(), "dokter", "doctor", "54321")
var menu = new Interface();
menu.header()
menu.login()
