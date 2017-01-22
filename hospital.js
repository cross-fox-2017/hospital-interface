const readline = require('readline');

class Patient {
  constructor(id, name, diagnose) {
    this.id = id
    this.name = name
    this.diagnose = diagnose
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

class Hospital {
  constructor() {
    this.employees = [];
    this.patients = [];
  }

  addPatient(name, diagnose){
    for(let i = 0; i < patientName.length; i++){
      this.patients.push(new Patient((this.patients.length + 1), name, diagnose))
    }
    console.log('---------------------------------------------------');
    console.log('Add patient to the list...');
    console.log('---------------------------------------------------');
  }

  addEmployee(name, position, username, password) {
    for(let i = 0; i < patientName.length; i++){
      this.employees.push(new Employee(name, position, username, password))
    }
    if(this.employees > 2){
      console.log('---------------------------------------------------');
      console.log('Add employee to the list...');
      console.log('---------------------------------------------------');
    }
  }

  patientList() {
    if (this.patients.length > 0) {
      console.log('---------------------------------------------------');
      console.log('Patients List:');
      for (let i = 0; i < this.patients.length; i++) {
        console.log(`\nID: ${this.patients[i].id}\nPatient Name: ${this.patients[i].name}\nPatient Diagnose: ${this.patients[i].diagnose}\n`);
      }
      console.log('---------------------------------------------------');
    }
    else {
      console.log('---------------------------------------------------');
      console.log('There is no patient on the list...');
      console.log('---------------------------------------------------');
    }
  }

  employeeList() {
    if (this.employees.length > 0) {
      console.log('---------------------------------------------------');
      console.log('Employees List:');
      for (let i = 0; i < this.employees.length; i++) {
        console.log(`\nEmployee Name: ${this.employees[i].name}\nEmployee Position: ${this.employees[i].position}\nEmployee Username: ${this.employees[i].username}\nEmployee Password: *******\n`);
      }
      console.log('---------------------------------------------------');
    }
    else {
      console.log('---------------------------------------------------');
      console.log('There is no employee on the list...');
      console.log('---------------------------------------------------');
    }
  }

  deletePatient(id) {
    if (this.patients.length > 0) {
      for (let i = 0; i < this.patients.length; i++) {
        if (parseInt(id) === this.patients[i].id) {
          this.patients.splice(i, 1);
          console.log('---------------------------------------------------');
          console.log('Delete patient from the list...');
          console.log('---------------------------------------------------');
          break;
        }
      }
    }
    else {
      console.log('---------------------------------------------------');
      console.log('There is no patient on the list...');
      console.log('---------------------------------------------------');
    }
  }

  deleteEmployee(name) {
    if (this.employees.length > 0) {
      for (let i = 0; i < this.employees.length; i++) {
        if (name === this.employees[i].name) {
          this.employees.splice(i, 1);
          console.log('---------------------------------------------------');
          console.log('Delete employee from the list...');
          console.log('---------------------------------------------------');
          break;
        }
      }
    }
    else {
      console.log('---------------------------------------------------');
      console.log('There is no employee on the list...');
      console.log('---------------------------------------------------');
    }
  }

  menuDoctor() {
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list patients');
    console.log('[2] add patients <patient_name> <patient_diagnose>');
    console.log('[3] remove patients <patient_id>');
    console.log('[4] exit');
    console.log('---------------------------------------------------');
  }

  menuAdmin() {
    console.log('What would you like to do?');
    console.log('\nOptions:\n');
    console.log('[1] list employees');
    console.log('[2] add employees <employee_name> <employee_position> <employee_username> <employee_password>');
    console.log('[3] remove employees <employee_name>');
    console.log('[4] exit');
    console.log('---------------------------------------------------');
  }
}

let patientName = ['']
let patientDiagnosis = ['']
let identity = []
let patient = []
let employee = []
let hospital = new Hospital()
hospital.addEmployee('john', 'doctor', 'john', 'john123');
hospital.addEmployee('doe', 'admin', 'doe', 'doe123');

let x = 0

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Welcome to Mistic Hospital\n------------------------------- \nPlease enter your username:\n> '
});

rl.prompt();
rl.on('line', (answer) => {
  identity.push(answer)
  if (identity[0] === 'john' || identity[0] === 'doe'){
    if(x === 0){
      x = 1
      rl.setPrompt(`Please enter your password:\n`);
    } else if(identity[0] === hospital.employees[0].username && answer === hospital.employees[0].password && x === 1){
      x = 2
      console.log(`--------------------------------------------------------------`)
      console.log(`Welcome ${hospital.employees[0].name}. Your access level is: ${hospital.employees[0].position}`)
      console.log(`--------------------------------------------------------------`)
      hospital.menuDoctor()
      rl.setPrompt(`> `)
    } else if(identity[0] === hospital.employees[1].username && answer === hospital.employees[1].password && x === 1){
      x = 2
      console.log(`--------------------------------------------------------------`)
      console.log(`Welcome ${hospital.employees[1].name}. Your access level is: ${hospital.employees[1].position}`)
      console.log(`--------------------------------------------------------------`)
      hospital.menuAdmin()
      rl.setPrompt(`> `)
    } else if(identity[0] === hospital.employees[0].username) {
      if(x === 2){
        switch(answer) {
          case '1':
            hospital.patientList()
            hospital.menuDoctor()
            rl.setPrompt('> ');
            break;
          case '2':
            x = 3;
            console.log('---------------------------------------------------');
            rl.setPrompt('Patient Name: ');
            break;
          case '3':
            x = 5;
            console.log('---------------------------------------------------');
            rl.setPrompt('Patient ID: ');
            break;
          case '4':
            console.log('Bye!');
            process.exit(0);
            break;
          default:
            console.log("> ");
            break;
        }
      } else if(x === 3) {
        x = 4;
        patient.push(answer);
        rl.setPrompt('Patient Diagnose: ');
      } else if(x === 4) {
        x = 2;
        patient.push(answer);
        hospital.addPatient(patient[0], patient[1]);
        hospital.menuDoctor();
        rl.setPrompt('> ');
        patient.splice(0, 2);
      } else if (x === 5) {
        x = 2;
        hospital.deletePatient(answer);
        hospital.menuDoctor();
        rl.setPrompt('> ');
      }
    } else if (identity[0] === hospital.employees[1].username) {
      if (x === 2) {
        switch (answer) {
          case '1':
            hospital.employeeList();
            hospital.menuAdmin();
            rl.setPrompt('> ');
            break;
          case '2':
            x = 3;
            console.log('---------------------------------------------------');
            rl.setPrompt('Employee Name: ');
            break;
          case '3':
            x = 7;
            console.log('---------------------------------------------------');
            rl.setPrompt('Employee Name: ');
            break;
          case '4':
            console.log('Bye!');
            process.exit(0);
            break;
          default:
            console.log("> ");
            break;
        }
      } else if (x === 3) {
        x = 4;
        employee.push(answer);
        rl.setPrompt('Employee Position: ');
      } else if (x === 4) {
        x = 5;
        employee.push(answer);
        rl.setPrompt('Employee Username: ');
      } else if (x === 5) {
        x = 6;
        employee.push(answer);
        rl.setPrompt('Employee Password: ');
      } else if (x === 6) {
        x = 2;
        employee.push(answer);
        hospital.addEmployee(employee[0], employee[1], employee[2], employee[3]);
        hospital.menuAdmin();
        rl.setPrompt('> ');
        employee.splice(0, 4);
      } else if (x === 7) {
        x = 2;
        hospital.deleteEmployee(answer);
        hospital.menuAdmin();
        rl.setPrompt('> ');
      }
    }
    rl.prompt();
  } else {
    rl.setPrompt(`Please enter your username:\n`);
    rl.prompt();
  }
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});
