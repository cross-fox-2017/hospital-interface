"use strict"

import {Hospital} from './model.js';
import {View} from './view.js';
const readline = require('readline');
const faker = require('faker');

var rumahSehat = new Hospital(faker.company.companyName(), faker.address.city(), 15, 70);
rumahSehat.addEmployee(faker.name.findName(), "administrator", "admin", "12345");
rumahSehat.addEmployee(faker.name.findName(), "dokter", "doctor", "54321");
rumahSehat.addPatient(faker.name.findName(), "ADHD");
rumahSehat.addPatient(faker.name.findName(), "Bipolar");

class Controller{
  constructor(){
    this.rl = readline.createInterface({input: process.stdin,output: process.stdout});
    this.user = []
    this.pass = []
    this.active = {}
    this.question = 'username'
    this.hospital = rumahSehat
    this.exit = false
  }
  cek(){
    for (var i = 0; i <this.hospital.employeesList.length; i++){
      if (this.hospital.employeesList[i].username == this.user[0]){
        if (this.hospital.employeesList[i].password == this.pass[0]){
          this.active = this.hospital.employeesList[i]
          return true
        }
      }
    }
    return false
  };
  choose(position, input){
    if (position === "dokter"){
      switch (input) {
        case '1':
          View.print(this.hospital.list_patients);
          break;
        case '2':
          this.hospital.view_records(id)
          break;
        case '3':
          this.hospital.addPatient(nama, diagnosis)
          break;
        case '4':
          this.hospital.removePatient(id)
          break;
        default:
          this.exit = true;
      }
    } else if(position === "administrator"){
      switch (input) {
        case '1':
          View.print(this.hospital.list_karyawan);
          break;
        case '2':
          this.hospital.addEmployee(name, position, username, password)
          break;
        case '3':
          this.hospital.removeEmployee(name)
          break;
        default:
          this.exit = true;
      }
    };
    View.option(this.active.position)
  }
  running(){
    View.header(this.hospital.name, this.hospital.location)
    this.rl.setPrompt(View.username())
    this.rl.prompt()
    this.rl.on('line', (input) => {
      if (this.question == 'username'){
        this.user.unshift(input);
        this.rl.setPrompt(View.password())
        this.question = 'password'
      } else if (this.question == 'password'){
        this.pass.unshift(input);
        if (this.cek()){
          View.mainPage(this.active.name, this.active.position)
          View.option(this.active.position)
          this.rl.setPrompt(View.askInput())
          this.question = 'choice'
        } else {
          View.wrong()
          this.rl.setPrompt(View.username())
          this.question = 'username'
        }
      } else if (this.question == 'choice'){
        this.choose(this.active.position, input)
      }
    if (this.exit){
      this.rl.close()
    } else {
      this.rl.prompt()
    }
    }).on('close', () => {
      View.exit()
    })
  }
}

var control = new Controller()
control.running()
rumahSehat.list_patients;
rumahSehat.list_karyawan;
