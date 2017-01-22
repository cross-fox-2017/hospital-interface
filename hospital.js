"use strict"

const readline = require('readline');
const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
});

class Hospital {
    constructor(name, location) {
        this.name = name
        this.location = location
        this.employees = ['Kabayan','Iteung','Agus','Cepot','Jana']
        this.username = ['kabayan','iteung','agus','cepot','jana']
        this.pass = [1,2,3,4,5]
        this.position = ['Doctor','Admin','Receptionist','Officeboy','Patient']
        this.patients = [{id:1, name:"Goku", diagnose:"Cedera Parah"},{id:2, name:"Freeza", diagnose:"Sakit Hati"}]
        this.id = 0
  }

  header(){
      console.log("\n\n================================================");
      console.log(`Welcome to ${this.name} Hospital ${this.location}`);
      console.log("================================================");
      this.login()
  }

  login(){
      rl.question('\n\nPlease enter your username (kabayan, iteung, agus, cepot, jana)\nUsername : ', (answer) => {
          if (this.username.indexOf(answer) !== -1 ) {
              this.id = this.username.indexOf(answer)
              this.password();
          }else {
            console.log('\n\nInvalid username. Try again!\n');
            this.login();
          }
      });
  }

  password(){
      rl.question('\n\nPlease enter your Password (hint : 1,2,3,4,5)\nPassword : ', (answer) => {
          if (answer == this.pass[this.id]) {
            this.welcome()
          }else {
            console.log('\n\nInvalid password. Try again!\n');
            this.password();
          }
      });
  }

  welcome(){
      console.log("\n\n================================================");
      console.log(`Welcome ${this.employees[this.id]}. Your access level is : ${this.position[this.id]}`)

      this.home()
  }

  home(){
    console.log("\n================================================");
    console.log('What would you like to do?');
    console.log('Option : ');
    console.log('-- list_patients');
    console.log('-- view_records');
    console.log('-- add_records');
    console.log('-- remove_records');
    this.option()
  }

  list_patients(){
      if (this.patients.length == 0) {
          console.log("\nThere is no patient(s) in record");
          this.home()
      }
      else if (this.id == 4){
          console.log("\n**You can only access your own medical report**\n");
          this.view_records()
      }
      else if (this.id == 3) {
          console.log("\nYou can only access id and patient's name");
          console.log('\n=======================\nPatients List : \n======================\n\nID     Name');
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`${this.patients[i].id}      ${this.patients[i].name}`);
          }
          this.home()
      }else {
          console.log('\n\n=======================\nPatients List : \n======================\n\nID     Name     Diagnose');
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`${this.patients[i].id}      ${this.patients[i].name}   ${this.patients[i].diagnose}`);
          }
          this.home()
      }
      console.log('\n\n');
  }

  view_records(){
   rl.question('\nEnter patient ID: (or enter exit to back to home page)', (answer) => {
     if (answer > 0 && answer <= this.patients.length) {
       if (this.id == 3) {
         console.log(`ID : ${this.patients[answer-1].id}\nName : ${this.patients[answer-1].name}\n`);
         this.view_records()
       }
       else {
         console.log(`ID : ${this.patients[answer-1].id}\nName : ${this.patients[answer-1].name}\nDiagnose : ${this.patients[answer-1].diagnose}`);
         this.view_records()
       }
     }
     else if (answer == 'exit') {
        this.home()
     }else {
       console.log('Record not found. Please make sure if your ID has been registered');
       this.view_records()
     }
   });
 }

 add_records(){
    if (this.id == 3 || this.id == 4) {
        console.log('Access denied! Only Doctors, Admins, and Receptionists can add new patient');
        this.home()
    }else {
      rl.question('\nEnter patient\'s name & diagnose (ex: john,diarrhea) : ', (answer) => {
        let input = answer.split(',');
        this.patients.push({id: this.patients.length + 1, name: input[0], diagnose: input[1]})
        console.log('\nNew patient has been recorded')
        this.home()
      });
    }
  }

  remove_records(){
     if (this.id == 3 || this.id == 4) {
         console.log('\nAccess denied! Only Doctors, Admins, and Receptionists can remove patient');
         this.home()
     }else {
       rl.question('\nEnter patient\'s ID to remove : ', (answer) => {
         this.patients.splice(answer-1,1)
         console.log(`\nPatient with ID : ${answer} has been removed`)
         this.home()
       });
     }
   }

  option(){
      rl.question('\nEnter option:\ninput : ', (answer) => {
          switch (answer) {
              case 'list_patients':
                  this.list_patients()
                  break;

              case 'view_records':
                  this.view_records()
                  break;

              case 'add_records':
                  this.add_records()
                  break;

              case 'remove_records':
                  this.remove_records()
                  break;

            default:
                console.log("\nincorrect option format");
                this.option()
          }
      });
  }

}

let santosa = new Hospital('Santosa','Bandung')
santosa.header()
