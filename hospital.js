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

    
}
