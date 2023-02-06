//inisiasi library
const express = require("express")
const multer = require("multer") //untuk upload file
const path = require("path") // untuk memanggil path direktori
const fs = require("fs") //untuk manajemen file
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

//implementation
const app = express()
app.use(express.json())
app.use(express.static(__dirname));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        //generate file name
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage })

//create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

//------------------------------ BAGIAN KARYAWAN ------------------------------//

//end-point akses data karyawan
app.get("/karyawan", (req, res) => {
    //create sql query
    let sql = "select * from karyawan"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                karyawan: result //isi data
            }
        }
        res.json(response) //send response
    })
})

//end-point menyimpan data karyawan
app.post("/karyawan", (req, res) => {

    //prepare data 
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: req.body.password
    }

    //create sql query insert
    let sql = "insert into karyawan set ?"

    //run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted "
            }
        }
        res.json(response) //send response
    })
})

//end-point mengubah data karyawan
app.put("/karyawan", (req, res) => {

    //prepare data
    let data = [
        //data
        {
            id_karyawan: req.body.id_karyawan,
            nama_karyawan: req.body.nama_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: req.body.password
        },

        //parameter (primary key)
        {
            id_karyawan: req.body.id_karyawan
        }
    ]

    //create sql query update
    let sql = "update karyawan set ? where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated "
            }
        }
        res.json(response) //send response
    })
})

//end-point menghapus data karyawan berdasarkan id_karyawan
app.delete("/karyawan/:id_karyawan", (req, res) => {
    //prepare data
    let data = {
        id_karyawan: req.params.id_karyawan
    }

    //create query sql delete
    let sql = "delete from karyawan where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted "
            }
        }
        res.json(response) //send response
    })
})

//------------------------------ BAGIAN PELANGAN ------------------------------//

//end-point akses data pelanggan
app.get("/pelanggan", (req, res) => {
    //create sql query
    let sql = "select * from pelanggan"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                pelanggan: result //isi data
            }
        }
        res.json(response) //send response
    })
})

//end-point menyimpan data pelanggan
app.post("/pelanggan", (req, res) => {

    //prepare data 
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }

    //create sql query insert
    let sql = "insert into pelanggan set ?"

    //run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted "
            }
        }
        res.json(response) //send response
    })
})

//end-point mengubah data pelanggan
app.put("/pelanggan", (req, res) => {

    //prepare data
    let data = [
        //data
        {
            id_pelanggan: req.body.id_pelanggan,
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body.kontak
        },

        //parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    //create sql query update
    let sql = "update pelanggan set ? where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated "
            }
        }
        res.json(response) //send response
    })
})

//end-point menghapus data pelanggan berdasarkan id_pelanggan
app.delete("/pelanggan/:id_pelanggan", (req, res) => {
    //prepare data
    let data = {
        id_pelanggan: req.params.id_pelanggan
    }

    //create query sql delete
    let sql = "delete from pelanggan where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted "
            }
        }
        res.json(response) //send response
    })
})

//------------------------------ BAGIAN MOBIL ------------------------------//

app.post("/mobil", upload.single("image"), (req, res) => {
    let data = {
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.file.filename
    }

    if (!req.file) {
        //jika tidak ada file yang diupload
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        let sql = "insert into mobil set ?"

        db.query(sql, data, (error, result) => {
            if (error) throw error
            res.json({
                message: result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})


app.put("/mobil", upload.single("image"), (req, res) => {
    let data = null, sql = null
    let param = { id_mobil: req.body.id_mobil }

    if (!req.file) {
        data = {
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari
        }
    } else {
        data = {
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.file.filename
        }
        sql = "select * from mobil where ?"

        db.query(sql, param, (err, result) => {
            if (err) throw err

            let fileName = result[0].image

            let dir = path.join(__dirname, "image", fileName)
            fs.unlink(dir, (error) => {
            })
        })
    }
    sql = "update mobil set ? where ?"

    db.query(sql, [data, param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })

})

app.delete("/mobil/:id_mobil", (req, res) => {
    let param = { id_mobil: req.params.id_mobil }

    let sql = "select * from mobil where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                mobil: result
            }
        }
        res.json(response)
    })
})

app.post("/mobil", (req, res) => {

    let data = {
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.body.image
    }

    let sql = "insert into mobil set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/mobil", (req, res) => {

    let data = [

        {
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.body.image
        },

        {
            id_mobil: req.body.id_mobil
        }
    ]

    let sql = "update mobil set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/mobil/:id_mobil", (req, res) => {

    let data = {
        id_mobil: req.params.id_mobil
    }

    let sql = "delete from mobil where ?"

    db.query(sql, data, (error, result) => {
        if (error) throw error

        let fileName = result[0].image

        let dir = path.join(__dirname, "image", fileName)
        fs.unlink(dir, (error) => { })
    })
    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil dihapus"
            })
        }
    })
})

app.get("/mobil", (req, res) => {

    let sql = "select * from mobil"

    // run query
    db.query(sql, (error, result) => {
        if (error) throw error
        res.json({
            data: result,
            count: result.length
        })
    })
})

//------------------------------ BAGIAN TRANSAKSI ------------------------------//

//end-point menambahkan data sewa
app.post("/sewa", (req, res) => {
    //prepare data to sewa
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss') //get current time
    }

    //parse to JSON
    let pelanggaran = JSON.parse(req.body.pelanggaran)

    //create query insert to sewa
    let sql = "insert into sewa set ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null

        if (error) {
            res.json({ message: error.message })
        } else {
            //get last inserted id_pelanggaran
            let lastID = result.insertId

            //prepare data to detail_pelanggaran
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }

            //create query insert detail_pelanggaran
            let sql = "insert into detail_pelanggaran_siswa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data has been inserted" })
                }
            })
        }
    })
})

//end-point menampilakn data pelanggaran siswa
app.get("/pelanggaran_siswa", (req, res) => {
    //create sql query
    let sql = "select p.id_pelanggaran_siswa, p.id_siswa,p.waktu, s.nis, s.nama_siswa, p.id_user, u.nama_user " +
        "from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa " +
        "join user u on p.id_user = u.id_user"

    //run query
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

//end-point untuk menampilkan detail pelanggaran
app.get("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

    //create sql query
    let sql = "select p.nama_pelanggaran, p.poin " +
        "from detail_pelanggaran_siswa dps join pelanggaran p " +
        "on p.id_pelanggaran = dps.id_pelanggaran "

    //run query
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

//end-point untuk menghapus data pelanggaran_siswa

app.delete("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

    // create sql query delete detail_pelanggaran
    let sql = "delete from detail_pelanggaran_siswa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa }

            // create sql query delete detail_pelanggaran
            let sql = "delete from pelanggaran_siswa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data has been deleted" })
                }
            })
        }
    })
})

app.listen(8000, () => {
    console.log("capekk")
})