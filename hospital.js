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
    this.employees = ['DOCTOR','ADMIN','RECEPTIONIST','OFFICEBOY']
    this.emName   = ['Suprapto','Bambang','Irda','Sayuti']
    this.username = ['dokter','admin','resepsionis','ob']
    this.password = ['dokter','admin','resepsionis','ob']
    this.patients = ['abi','aba','abu','abo']
    this.diagnose = ['demam','flu','kangker','asma']
    // this.patID = [1,2,3,4]
    this.id;
  }

  welcome(){
    console.log(`===============================`);
    console.log(`Welcome to ${this.name} Hospital ${this.location}`);
    console.log(`===============================`);
    this.login()
  }
  login(){
    rl.question('Please enter your username\n', (answer) => {
      if (!this.username.indexOf(answer)) {
        this.id = this.username.indexOf(answer)
        this.pass()
      }
      else {
        this.login()
      }
    });
  }

  pass(){
    rl.question('Please enter your password\n', (answer) => {
      if (answer===this.password[this.id]) {
        this.emName = this.emName[this.id];
        this.employees = this.employees[this.id];
        this.home()
      }
      else {
        this.pass()
      }
    });
  }

  home(){
    console.log(`====================================================`);
    console.log(`Welcome ${this.emName}. Your access level is: ${this.employees}`);
    console.log(`====================================================`);
    console.log(`Option:`);
    console.log(`1. List Patients`);
    console.log(`2. View Record`);
    console.log(`3. Add Record`);
    console.log(`4. Remove Record`);
    this.proc()
  }

  list(){
    console.log(`Id | Nama     | Penyakit`);
    console.log(`====================`);
    for(let i=0; i<this.patients.length; i++){
      console.log(`${i+1}  | ${this.patients[i]}      | ${this.diagnose[i]}`);
    }
    this.home()
  }

  view(){
    rl.question('Enter id pasien: ', (answer) => {
      console.log(`${this.patients[answer-1]} : ${this.diagnose[answer-1]}`);
      this.home()
    });
  }

  remove(){
    rl.question('Enter id pasien: ', (answer) => {
      this.patients.splice(answer-1,1)
      this.diagnose.splice(answer-1,1)
      this.home()
    });
  }
  add(){
    rl.question('Enter name & diagnose <ex: name,diagnose> : ', (answer) => {
      let ans = answer.split(',');
      this.patients.push(ans[0])
      this.diagnose.push(ans[1])
      this.home()
    });
  }
  proc(){
    rl.question('What would you like to do? ', (answer) => {
      switch(answer) {
          case '1':
              this.list()
              break;
          case '2':
              this.view()
              break;
          case '3':
            this.add()
            break;
          case '4':
            this.remove()
            break;
          default:
            console.log('Please choose 1-4');
            this.proc()
      }
    });
  }
}

var rs = new Hospital('H8','Jakarta')
rs.login()
