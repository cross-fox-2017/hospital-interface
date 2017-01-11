"use strict"

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Hospital {
    constructor(namaRS, lokasiRS) {
        this.namaRS = namaRS
        this.lokasiRS = lokasiRS
        this.namaKaryawan = ["OmTelolet", "OmGoogle", "OmOBom", "Dude","omDokterOm","Siska"]
        this.tipeKaryawan = ["admin", "admin", "ob", "ob","dokter","receptionist"]
        this.userKaryawan = ["admin1", "admin2", "ob1", "ob2","dokter1","rs1"]
        this.passwordKaryawan = ["adminSatu", "adminDua", "obSatu", "obDua","dokterSatu","rsSatu"]
        this.namaPasien = ["budi", "budo", "bubu"]
        this.penyakitPasien = ["Sakit Hati", "Sakit Jiwa", "Sakit Jantung"]
        this.userID
    }
    tampilRS() {
        console.log(`> Welcome to ${this.namaRS} ${this.lokasiRS}`);
        console.log(`> ----------------------------`);
        this.user();
    }

    user() {
        rl.question('> Please enter your username: ', (user) => {
            if (this.userKaryawan.indexOf(user) != -1) {
                this.userID = this.userKaryawan.indexOf(user)
                this.password()
            } else {
                this.user()
            }
        })
    }

    password() {
        rl.question('> Please enter your password: ', (pwd) => {
            if (pwd == this.passwordKaryawan[this.userID] && this.tipeKaryawan[this.userID] != "ob") {
                console.log(`Welcome,  ${this.namaKaryawan[this.userID]}. Your access level is: ${this.tipeKaryawan[this.userID]}`);
                this.karyawan()
            } else if (pwd == this.passwordKaryawan[this.userID] && this.tipeKaryawan[this.userID] == "ob") {
                console.log(`Welcome, ${this.namaKaryawan[this.userID]}. Your access level is: ${this.tipeKaryawan[this.userID]}`);
                console.log(`> ----------------------------`);
                console.log(`> What would you like to do?`);
                console.log('> Options:');
                this.ob()
            } else {
                this.password()
            }
        })
    }

    ob() {
        rl.question('1. To Show All Office Boy || "EXIT" to Logout =>  ', (inputOb) => {
            if (inputOb.toUpperCase() == "1") {
                var jumlahOB = 0;
                for (var i = 0; i < this.tipeKaryawan.length; i++) {
                    if (this.tipeKaryawan[i] == "ob") {
                        console.log(`${jumlahOB+1}. ${this.namaKaryawan[i]}, Jabatan : OB`);
                        jumlahOB++
                    }
                }
                console.log(`Jumlah OB :  ${jumlahOB}\n`);
                console.log(`> ----------------------------`);
                this.ob()
            } else if (inputOb.toUpperCase() == "EXIT") {
                console.log("Sistem Logout");
                rl.close()
            } else {
                this.ob()
            }
        })
    }

    karyawan() {
        console.log(`> ----------------------------`);
        console.log(`> What would you like to do?`);
        console.log('> Options:');
        console.log(`1. To Show All Karyawan`)
        console.log(`2. To Show All pasien`);
        console.log(`3. To Show All Office Boy`);
        console.log(`4. To Show All Record Pasien`);
        console.log(`5. To Add Pasien`);
        console.log(`6  To Remove Pasien`);
        console.log(`Ketik "EXIT" : To Logout`);
        console.log(`> ----------------------------`);
        this.proses()
    }

    proses() {
        rl.question('Please Input => ', (inputOption) => {
            if (inputOption.toUpperCase() == "1") {
                var jumlahKaryawan = 0;
                for (var i = 0; i < this.tipeKaryawan.length; i++) {
                    console.log(`${jumlahKaryawan+1}. ${this.namaKaryawan[i]}, Jabatan : ${this.tipeKaryawan[i]}`);
                    jumlahKaryawan++
                }
                console.log(`Jumlah Karyawan :  ${jumlahKaryawan}`);
                this.karyawan()
            } else if (inputOption.toUpperCase() == "2") {
              var jumlahPasien = 0;
              for (var i = 0; i < this.namaPasien.length; i++) {
                  console.log(`${jumlahPasien+1}. ${this.namaPasien[i]}, Sakit : ${this.penyakitPasien[i]}`);
                  jumlahPasien++
              }
              console.log(`Jumlah Pasien :  ${jumlahPasien}`);
              this.karyawan()
            } else if (inputOption.toUpperCase() == "3") {
                var jumlahOB = 0;
                for (var i = 0; i < this.tipeKaryawan.length; i++) {
                    if (this.tipeKaryawan[i] == "ob") {
                        console.log(`${jumlahOB+1}. ${this.namaKaryawan[i]}, Jabatan : OB`);
                        jumlahOB++
                    }
                }
                console.log(`Jumlah OB :  ${jumlahOB}`);
                this.karyawan()
            } else if (inputOption.toUpperCase() == "4") {
                //Menampilkan nama pasien, sakit pasien, id pasien (sama dengan pasien bedannya ada idnya)
                var jumlahPasien = 0;
                for (var i = 0; i < this.namaPasien.length; i++) {
                    console.log(`ID Pasien : ${i}\nNama ${this.namaPasien[i]}\nSakit : ${this.penyakitPasien[i]}`);
                    jumlahPasien++
                }
                console.log(`Jumlah Pasien :  ${jumlahPasien}`);
                this.karyawan()
            } else if (inputOption.toUpperCase() == "5") {
                //menambah pasien
                this.addPasien()
            } else if (inputOption.toUpperCase() == "6") {
                //menambah menghapus pasien
                this.removePasien()
            } else if (inputOption.toUpperCase() == "EXIT") {
                rl.close()
            } else {
                this.karyawan()
            }
        })
    }

    addPasien(){
      console.log(`Input "NamaLengkap, NamaPenyakit" To Add`);
      console.log(`Input "HOME" Back Home`);
      console.log(`Input "EXIT" To Logout`);
      rl.question('Please Input => ',(add)=>{
          var addData = add.split(",")
          if(add.toUpperCase() == "HOME"){
            this.karyawan()
          }else if(add.toUpperCase() == "EXIT"){
            rl.close()
          }else if(addData.length ==2){
              this.namaPasien.push(addData[0])
              this.penyakitPasien.push(addData[1])
              console.log(`Add Pasien Masuk, Nama :${addData[0]} Sakit: ${addData[1]}`);
              this.addPasien()
          }else{
            this.addPasien()
          }
      })
    }

    removePasien(){
      console.log(`Input "ID" Pasien To Remove`);
      console.log(`Input "HOME" Back Home`);
      console.log(`Input "EXIT" To Logout`);
      rl.question('Please Input => ',(remove)=>{
          var input = Number(remove)
          if(remove.toUpperCase() == "HOME"){
            this.karyawan()
          }else if(remove.toUpperCase() == "EXIT"){
            rl.close()
          }else if(typeof(input)=="number" && input >=0 && input < this.namaPasien.length){
              this.namaPasien.splice(remove,1)
              this.penyakitPasien.splice(remove,1)
              console.log(`ID: ${remove}, Nama: ${this.namaPasien[remove]} Sakit: ${this.penyakitPasien} => TerHAPUS`);
              this.removePasien()
          }else{
            this.removePasien()
          }
      })
    }
}

var aplikasi = new Hospital("Mistic Hospital", "Jakarta")
aplikasi.tampilRS()
aplikasi.user()1
