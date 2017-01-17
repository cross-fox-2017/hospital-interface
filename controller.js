"use strict"

import {Hospital} from './model.js';
import {View} from './view.js';
const readline = require('readline');
const faker = require('faker');

//dummydata
var rumahSehat = new Hospital(faker.company.companyName(), faker.address.city(), 15, 70);
rumahSehat.addEmployee(faker.name.findName(), "administrator", "admin", "12345");
rumahSehat.addEmployee(faker.name.findName(), "dokter", "doctor", "54321");
rumahSehat.addPatient(faker.name.findName(), "ADHD");
rumahSehat.addPatient(faker.name.findName(), "Bipolar");

export class Controller{
  constructor(){
    this.rl = readline.createInterface({input: process.stdin,output: process.stdout});
    this.user = []
    this.pass = []
    this.active = {}
    this.question = 'username'
    this.hospital = rumahSehat
    this.exit = false
    this.cmd = []
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
          View.option(this.active.position)
          break;
        case '2':
          this.rl.setPrompt(View.idpatient())
          this.question = 'view_records'
          break;
        case '3':
          this.rl.setPrompt(View.newpatientname())
          this.question = 'addPatient'
          break;
        case '4':
          this.rl.setPrompt(View.idpatient())
          this.question = 'removePatient'
          break;
        default:
          this.exit = true;
      }
    } else if(position === "administrator"){
      switch (input) {
        case '1':
          View.print(this.hospital.list_karyawan);
          View.option(this.active.position)
          break;
        case '2':
          this.rl.setPrompt(View.fullname())
          this.question = 'addEmployee'
          break;
        case '3':
          this.rl.setPrompt(View.fullname())
          this.question = 'removeEmployee'
          break;
        default:
          this.exit = true;
      }
    };
  }
  toCommandCenter(){
    View.option(this.active.position)
    this.rl.setPrompt(View.askInput())
    this.question = 'choice'
    this.cmd = []
  }
  userCek(input){
    this.user.unshift(input);
    this.rl.setPrompt(View.password())
    this.question = 'password'
  }
  userPassCek(input){
    this.pass.unshift(input);
    if (this.cek()){
      View.mainPage(this.active.name, this.active.position)
      this.toCommandCenter()
    } else {
      View.wrong()
      this.rl.setPrompt(View.username())
      this.question = 'username'
    }
  }
  addEmployee(input){
    if (this.cmd.length == 0){
      this.rl.setPrompt(View.position())
      this.cmd.push(input)
    } else if (this.cmd.length == 1){
      this.rl.setPrompt(View.newusername())
      this.cmd.push(input)
    } else if (this.cmd.length == 2) {
      this.rl.setPrompt(View.newpassword())
      this.cmd.push(input)
    } else if (this.cmd.length == 3){
      this.cmd.push(input);
      View.added(this.hospital.addEmployee(this.cmd[0], this.cmd[1], this.cmd[2], this.cmd[3]))
      this.toCommandCenter();
    }
  }
  addPatient(input){
    this.cmd.push(input)
    if (this.cmd.length == 1){
      this.rl.setPrompt(View.diagnosis())
    } else if (this.cmd.length == 2){
      View.added(this.hospital.addPatient(this.cmd[0], this.cmd[1]))
      this.toCommandCenter()
    }
  }
  running(){
    View.header(this.hospital.name, this.hospital.location)
    this.rl.setPrompt(View.username())
    this.rl.prompt()
    this.rl.on('line', (input) => {
      if (this.question == 'username'){
        this.userCek(input)
      } else if (this.question == 'password'){
        this.userPassCek(input)
      } else if (this.question == 'choice'){
        this.choose(this.active.position, input)
      } else if (this.question == 'removeEmployee'){
        View.removed(this.hospital.removeEmployee(input))
        this.toCommandCenter();
      } else if (this.question == 'addEmployee'){
        this.addEmployee(input)
      } else if (this.question == 'view_records'){
        View.view(this.hospital.view_records(input))
        this.toCommandCenter();
      } else if (this.question == 'removePatient'){
        View.removed(this.hospital.removePatient(input))
        this.toCommandCenter();
      } else if (this.question ==  'addPatient'){
        this.addPatient(input);
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
