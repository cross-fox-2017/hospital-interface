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
}
