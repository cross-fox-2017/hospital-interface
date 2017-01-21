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
      x += `${r[i].name}     ${r[i].position}       ${r[i].username}\n`
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
  getPatId(id){
    let x='id | nama | diagnosis\n=====================\n'
    let r= this.patients
      x += `${r[id].id}   ${r[id].name}     ${r[id].diagnosis}\n`
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

let netta = new Employee('Fenetta','Doctor','netta',"1234") //ubah Doctor ke Admin kalo mau tes fungsi admin

let mistic = new Hospital('mistic','bandung')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'WELCOME TO MISTIC HOSPITAL\n=========================\nPlease input your username '
});

let x=[]
rl.prompt();
let pasien=[]
let karyawan=[]
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
      rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Check Record by Id\n5.Exit\ninput: ` )
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
      y=5
      rl.setPrompt(`\nPlease input patient name and diagnosis (press enter)` )

    }
    else if(ans === "3" && y==2){
      y=4
      rl.setPrompt(`\nPlease input patient id to delete: \n` )
    }
    else if(ans === "4" && y==2){
      y=7
      rl.setPrompt(`\nplease input patient id: \n` )
    }
    else if(ans ==="5" && y==2){
      rl.close()
    }
    else{
      if(y===5){
        y=6
        rl.setPrompt(`Please input patient name: ` )
      }
      else if(y===6){
        y=3
        pasien.push(ans)
        rl.setPrompt(`Please input patient diagnose: ` )
      }
      else if(y===3){
        y=2
        pasien.push(ans)
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Check Record by Id\n5.Exit\ninput: ` )
        mistic.setPatients(new Patient(mistic.patients.length+1,pasien[0],pasien[1]))
        pasien.splice(0,2)
      }
      else if(y===4){
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Check Record by Id\n5.Exit\ninput: ` )
        y=2
        mistic.deletePatient(ans)
      }
      else if(y===7){
        console.log(mistic.getPatId(ans-1))
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check Patient Status\n2.Add Patient\n3.Remove patient\n4.Check Record by Id\n5.Exit\ninput: ` )
        y=2
      }
    }
    break;

    case 'Admin' :
    if(ans === "1" && y== 2){
      console.log(mistic.getEmployees())
    }
    else if(ans === "2" && y==2){
      y=5
      rl.setPrompt(`\nPlease input patient name, position, username, password(press enter) ` )

    }
    else if(ans === "3" && y==2){
      y=4
      rl.setPrompt(`\nPlease input patient id to delete: ` )
    }
    else if(ans ==="4" && y==2){
      rl.close()
    }
    else{
      if(y===5){
        y=6
        rl.setPrompt(`Please input employee name: ` )
      }
      else if(y===6){
        y=7
        karyawan.push(ans)
        rl.setPrompt(`Please input employee position: ` )
      }
      else if(y===7){
        y=8
        karyawan.push(ans)
        rl.setPrompt(`Please input employee username: ` )
      }
      else if(y===8){
        y=3
        karyawan.push(ans)
        rl.setPrompt(`Please input employee password: ` )
      }
      else if(y===3){
        y=2
        karyawan.push(ans)
        rl.setPrompt(`\nhello fenetta, what youre gonna do? \n1.Check employees\n2.Add employee\n3.Remove employee\n4.Exit\ninput: ` )
        console.log(karyawan);
        mistic.setEmployees(new Employee(karyawan[0],karyawan[1],karyawan[2],karyawan[3]))
        karyawan.splice(0,4)
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
