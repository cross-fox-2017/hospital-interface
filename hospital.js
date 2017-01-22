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
      console.log(`Selamat Datang di Rumah Sakit, ${this.name}, ${this.location}`);
      console.log("================================================");
      this.login()
  }

  login(){
      rl.question('\n\nMasukkan username anda(kabayan, iteung, agus, cepot, jana)\nUsername : ', (answer) => {
          if (this.username.indexOf(answer) !== -1 ) {
              this.id = this.username.indexOf(answer)
              this.password();
          }else {
            console.log('\n\nUsernama yang anda masukkan salah!\n');
            this.login();
          }
      });
  }

  password(){
      rl.question('\n\nMasukan password andas (hint : 1,2,3,4,5)\nPassword : ', (answer) => {
          if (answer == this.pass[this.id]) {
            this.welcome()
          }else {
            console.log('\n\nPassword yang anda masukkan salah!\n');
            this.password();
          }
      });
  }

  welcome(){
      console.log("\n\n================================================");
      console.log(`Selamat datang ${this.employees[this.id]}. Akses kamu adalah: ${this.position[this.id]}`)

      this.home()
  }

  home(){
    console.log("\n================================================");
    console.log('Silahkan Pilih Opsi di Bawah ini.');
    console.log('Option : ');
    console.log('-- daftar-pasien');
    console.log('-- detail-pasien');
    console.log('-- tambah-pasien');
    console.log('-- hapus-pasien');
    this.option()
  }

  list_patients(){
      if (this.patients.length == 0) {
          console.log("\nTidak ada pasien");
          this.home()
      }
      else if (this.id == 4){
          console.log("\n**Anda hanya bisa melihat riwayat milik anda**\n");
          this.view_records()
      }
      else if (this.id == 3) {
          console.log("\nAnda hanya dapat mengakses id dan nama Pasien");
          console.log('\n=======================\nDaftar Pasien : \n======================\n\nID     Name');
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`${this.patients[i].id}      ${this.patients[i].name}`);
          }
          this.home()
      }else {
          console.log('\n\n=======================\nDaftar Pasien : \n======================\n\nID     Name     Diagnose');
          for (var i = 0; i < this.patients.length; i++) {
              console.log(`${this.patients[i].id}      ${this.patients[i].name}   ${this.patients[i].diagnose}`);
          }
          this.home()
      }
      console.log('\n\n');
  }

  view_records(){
   rl.question('\nMasukan ID Pasien: (atau masukan exit untuk keluar)', (answer) => {
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
       console.log('Data tidak ditemukan');
       this.view_records()
     }
   });
 }

 add_records(){
    if (this.id == 3 || this.id == 4) {
        console.log('Akses ditolak! Hanya Admin, Dokter dan Resepsionis yang bisa menambahkan pasien');
        this.home()
    }else {
      rl.question('\nMasukan nama pasien dan diagnosa (contoh: john,diare) : ', (answer) => {
        let input = answer.split(',');
        this.patients.push({id: this.patients.length + 1, name: input[0], diagnose: input[1]})
        console.log('\nPasien berhasil ditambahkan')
        this.home()
      });
    }
  }

  remove_records(){
     if (this.id == 3 || this.id == 4) {
         console.log('\nAkses ditolak! Hanya Admin, Dokter dan Resepsionis yang bisa menghapus pasien');
         this.home()
     }else {
       rl.question('\nMasukan ID Pasien untuk menghapus : ', (answer) => {
         this.patients.splice(answer-1,1)
         console.log(`\nPasien dengan ID : ${answer} telah dihapus`)
         this.home()
       });
     }
   }

  option(){
      rl.question('\nMasukan Opsi:\ninput : ', (answer) => {
          switch (answer) {
              case 'daftar-pasien':
                  this.list_patients()
                  break;

              case 'detail-pasien':
                  this.view_records()
                  break;

              case 'tambah-pasien':
                  this.add_records()
                  break;

              case 'hapus-pasien':
                  this.remove_records()
                  break;

            default:
                console.log("\nOpsi yang anda masukkan salah");
                this.option()
          }
      });
  }

}

let santosa = new Hospital('Santosa','Bandung')
santosa.header()
