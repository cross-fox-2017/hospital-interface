"use strict"
const faker = require('faker')
const readline = require('readline');
const fs = require('fs')
const chalk = require('chalk');
const Table = require('cli-table');

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
    console.log(`Welcome to ${chalk.bold.blue(rumahSehat.name)} ${chalk.bold.blue(rumahSehat.location)} Hospital`);
    console.log(chalk.bold.green("-------------------------------------------"));
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
          this.choose()
        } else {
          console.log(chalk.bold.red("user atau password anda salah"))
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
    console.log(`Selamat datang, ${chalk.bold.blue(this.active.name)}. Anda Memiliki Akses sebagai ${chalk.bold.blue(this.active.position)}`);
    console.log("-----------------------------------");
  }
  option(){
    if (this.active.position === "dokter"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_patients\n 2 -- view_records <patient_id>\n 3 -- add_record <patient_name><diagnosis> \n 4 -- remove_record <patient_id>\n`)
    } else if(this.active.position === "administrator"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_karyawan\n 2 -- tambah_karyawan\n 3 -- pecat_karyawan\n`)
    };
  }
  choose(){
    if (this.active.position === "dokter"){
      rl.question('Apa yang ingin anda lakukan? >', (answer) => {
        switch (answer) {
          case 1:
            rumahSehat.list_patients
            break;
          case 2:
            rumahSehat.view_records(id)
            break;
          case 3:
            rumahSehat.addPatient(nama, diagnosis)
            break;
          case 4:
            rumahSehat.removePatient(id)
            break;
          default:

        }
      });
    } else if(this.active.position === "administrator"){
      rl.question('Apa yang ingin anda lakukan? >', (answer) => {
        switch (answer) {
          case 1:
            rumahSehat.list_karyawan
            break;
          case 2:
            rumahSehat.addEmployee(name, position, username, password)
            break;
          case 3:
            rumahSehat.removeEmployee(name)
            break;
          default:

        }
      });
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
    this.patientsList = [new Patient(0, "Master Yoda", "OP")] //dummy patient id 0
  }
  addEmployee(name, position, username, password){
    this.employeesList.push(new Employee(name, position, username, password))
    return this.employeesList
  }
  removeEmployee(name){
    for (let i = 0; i < this.employeesList.length; i++){
      if (this.employeesList[i].name == name){
        this.employeesList.splice(i, 1);
        return this.employeesList;
      }
    }
    return `Nama "${name}" tidak ditemukan dalam daftar karyawan`;
  }
  addPatient(name, diagnosis){
    this.patientsList.push(new Patient(this.patientsList[this.patientsList.length-1].id+1, name, diagnosis))
    return this.patientsList
  }
  view_records(patient_id){
    for (let i = 0; i < this.patientsList.length; i++){
      if (this.patientsList[i].id == id){
        return this.patientsList[i]
      }
    }
    return `Id "${id}" tidak ditemukan dalam daftar Pasien`
  }
  // addPatientRecord(patient_id){
  //   for (let i = 0; i < this.patientsList.length; i++){
  //     if (this.patientsList[i].id == id){
  //       this.patientsList[i].record.push(new Record())
  //       return this.patientsList[i]
  //     }
  //   }
  //   return `Id "${id}" tidak ditemukan dalam daftar Pasien`
  // }
  // removePatientRecord(patient_id, record_id){
  //   for (let i = 0; i < this.patientsList.length; i++){
  //     if (this.patientsList[i].id == id){
  //       return this.patientsList
  //     }
  //   }
  //   return `Id "${id}" tidak ditemukan dalam daftar Pasien`
  // }
  removePatient(id){
    for (let i = 0; i < this.patientsList.length; i++){
      if (this.patientsList[i].id == id){
        this.patientsList.splice(i, 1)
        return this.patientsList
      }
    }
    return `Id "${id}" tidak ditemukan dalam daftar Pasien`
  }
  get list_karyawan(){
    let tabelKaryawan = new Table({
        head: ['Nama Karyawan','Jabatan']
      , colWidths: [30, 15]
    });
    this.employeesList.forEach(function(val){
      tabelKaryawan.push([val.name, val.position])
    })
    return tabelKaryawan.toString()

  }
  get list_patients(){
    let tabelpasien = new Table({
        head: ['Id','Nama Patient', 'Diagnosis']
      , colWidths: [10, 30, 50]
    });
    this.patientsList.forEach(function(val){
      tabelpasien.push([val.id, val.name, val.diagnosis])
    })
    return tabelpasien.toString()
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    // this.record = this.records(diagnosis);
    this.diagnosis = diagnosis;
  }
  records(diagnosis){
    let rec = [];
    rec.push(diagnosis);
    return this.record = rec;
  }
}
// class Record{
//   constructor(id, diagnosis){
//     this.id = id
//     this.diagnosis = diagnosis
//     this.createAt = new Date()
//   }
// }

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

var rumahSehat = new Hospital(faker.company.companyName(), faker.address.city(), 15, 70);
rumahSehat.addEmployee(faker.name.findName(), "administrator", "admin", "12345");
rumahSehat.addEmployee(faker.name.findName(), "dokter", "doctor", "54321");
rumahSehat.addPatient(faker.name.findName(), "ADHD");
rumahSehat.addPatient(faker.name.findName(), "Bipolar");
rumahSehat.list_patients;
rumahSehat.list_karyawan;

var menu = new Interface();
menu.header()
menu.login()
