"use strict"

class Hospital {
  constructor(name, location) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
  }
  getEmployees(){
    let x='nama   | posisi  |  username  |\n================================\n'
    let r= this.employees
    for(let i=0;i<r.length;i++){
      x += `${r[i].nama}   ${r[i].posisi}  ${r[i].username}\n`
    }
    return x
  }
  setEmployees(x){
    this.employees.push(x)
  }
  getPatients(){
    let x='id | nama | diagnosis\n=====================\n'
    let r= this.patients
    for(let i=0;i<r.length;i++){
      x += `${r[i].id}   ${r[i].name}     ${r[i].diagnosis}\n`
    }
    return x
  }
  setPatients(x){
    this.patients.push(x)
  }
  deletePatient(x){
    for(var i=0;i<this.patients.length;i++){
      if(this.patients[i].id === Number(x)){
        this.patients.splice(i,1)
      }
    }
  }
  deleteEmployee(x){
    for(var i=0;i<this.employees.length;i++){
      if(this.employees[i].name === x){
        this.employees.splice(i,1)
      }
    }
  }
}

class Patient {
  constructor(id,name, diagnosis) {
    this.id=id;
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

let netta = new Employee('Fenetta','Doctor','netta',"1234")

let mistic = new Hospital('mistic','bandung')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Please input your username '
});

let x=[]
rl.prompt();
let y = 0

rl.on('line', (ans) => {


  if(ans===netta.username && y===0){
    x.push(ans)
    y = 1
    rl.setPrompt(`please input your password `)

  }
  else if(x[0]===netta.username && ans===netta.password && y===1){
    y = 2
    if(netta.position==='Doctor'){
      rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Exit\ninput: ` )
    }
    else if(netta.position==='Admin'){
      rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check employees\n2.Add employee\n3.Remove employee\n4.Exit\ninput: ` )
    }
  }

  switch(netta.position){
    case 'Doctor':
    if(ans === "1" && y== 2){
      console.log(mistic.getPatients())
    }
    else if(ans === "2" && y==2){
      y=3
      rl.setPrompt(`\nPlease input patient name and diagnosis (format : name,diagnosis): ` )

    }
    else if(ans === "3" && y==2){
      y=4
      rl.setPrompt(`\nPlease input patient id to delete: \n` )
    }
    else if(ans ==="4" && y==2){
      rl.close()
    }
    else{
      if(y===3){
        y=2
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Exit\ninput: ` )
        let pasien = ans.split(',')
        mistic.setPatients(new Patient(mistic.patients.length+1,pasien[0],pasien[1]))
      }
      else if(y===4){
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Exit\ninput: ` )
        y=2
        mistic.deletePatient(ans)
      }
    }
    break;

    case 'Admin' :
    if(ans === "1" && y== 2){
      console.log(mistic.getEmployees())
    }
    else if(ans === "2" && y==2){
      y=3
      rl.setPrompt(`\nPlease input patient name, position, username, password(format : name,position,username,password): ` )

    }
    else if(ans === "3" && y==2){
      y=4
      rl.setPrompt(`\nPlease input patient id to delete: ` )
    }
    else if(ans ==="4" && y==2){
      rl.close()
    }
    else{
      if(y===3){
        y=2
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check employees\n2.Add employee\n3.Remove employee\n4.Exit\ninput: ` )
        let employ = ans.split(',')
        mistic.setEmployees(new Employee(employ[0],employ[1],employ[2],employ[3]))
      }
      else if(y===4){
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check employees\n2.Add employee\n3.Remove employee\n4.Exit\ninput: ` )
        y=2
        mistic.deleteEmployee(ans)
      }
    }
    break;

  }

  rl.prompt();

}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
