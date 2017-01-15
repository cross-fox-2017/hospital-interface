"use strict"
const Table = require('cli-table');

export class Hospital {
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
