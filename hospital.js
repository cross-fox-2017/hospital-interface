const readline = require('readline');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  getName(){
    return this.name
  }
  getID(){
    return this.id
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

let john = new Patient(1801403324, 'john', 'cancer')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Welcome to Mistic Hospital\n------------------------------- \nPlease Enter your username\n>'
});

rl.prompt();

rl.on('line', (line) => {
  switch(line.trim()) {
    case john.getName():
      rl.setPrompt('Please enter your password\n>');
      rl.prompt();
        switch(line.trim()) {
          case john.id():

          break;
        }

      break;
    default:
      console.log('Wrong username!');
      rl.close();
      break;
  }
})
// .on('close', () => {
//   console.log('Have a great day!');
//   process.exit(0);
// });
