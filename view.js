"use strict"

const chalk = require('chalk');
const Table = require('cli-table');

export class View{
  static header(name, location){
    console.log(`Welcome to ${chalk.bold.blue(name)} ${chalk.bold.blue(location)} Hospital`);
    console.log(chalk.bold.green("-------------------------------------------"));
    return `Please Input Your Name and Password`;
  }
  static mainPage(name, position){
    console.log("-----------------------------------");
    console.log(`Selamat datang, ${chalk.bold.blue(name)}. Anda Memiliki Akses sebagai ${chalk.bold.blue(position)}`);
    console.log("-----------------------------------");
  }
  static option(position){
    if (position === "dokter"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_patients\n 2 -- view_records <patient_id>\n 3 -- add_record <patient_name><diagnosis> \n 4 -- remove_record <patient_id>\n`)
    } else if(position === "administrator"){
      console.log(`Apa yang ingin anda lakukan?\n Options:\n 1 -- list_karyawan\n 2 -- tambah_karyawan\n 3 -- pecat_karyawan\n`)
    };
  }
  static askInput(){
    return `input : `
  }
  static username(){
    return 'input your username: '
  }
  static password(){
    return 'input your password: '
  }
  static wrong(){
    console.log(`\n${chalk.bold.red('Username or Password salah')} \nSilahkan Ulangi\n`);
  }
  static exit(){
    console.log(`\nHave a good day`);
  }
  static print(item){
    console.log(`\n${item}\n`);
  }
  static removed(item){
    console.log(`${JSON.stringify(item)} Has Been Deleted \n`);
  }
  static fullname(){
    return 'input nama : '
  }
  static idpatient(){
    return 'Input Patient ID : '
  }
  static diagnosis(){
    return 'Input Patient Diagnosis : '
  }
  static newpatientname(){
    return 'Masukkan Nama Pasien Baru : '
  }
  static newusername(){
    return `Input New Username : `
  }
  static position(){
    return `Input Position (administrator/dokter) : `
  }
  static newpassword(){
    return `Input New Password : `
  }
  static added(item){
    console.log(`${JSON.stringify(item)} Has Been Added \n`);
  }
  static view(item){
    console.log(JSON.stringify(item))
  }
}
