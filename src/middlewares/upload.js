const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images') //ค่าแรกเป็น error ค่าที่ 2 เป็น folder ที่เราจะไปเก็บ
    },
    filename: (req, file, callback) => {
        const filename = new Date().getTime() + '' + Math.round(Math.random()* 10000) + `.${file.mimetype.split('/')[1]}` // ตั้งชื่อไฟล์ไม่ให้ซ้ำกัน

        callback(null, filename) //ค่าแรกเป็น error, parameter ตัวที่ 2 ตั้งชื่อไฟล์
    }
})

const upload = multer({ storage }) // สามารถกำหนด filter /  limit มี option

module.exports = upload