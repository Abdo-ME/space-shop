import path from 'path';
import express from "express";
import multer from "multer";

const router = express.Router()

const storage = multer.diskStorage({
    // function to select upload file
    destination(req, file, cb) {
    console.log('storage');

        cb(null,'uploads/')
    },
    // function to rename the file add the extention
    filename (req, file, cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


// function to check file type is image type before upload
function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}


const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file,cb)
    }
})

router.post('/', upload.single('image'),
    (req, res) => {
    res.send(`/${req.file.path}`)
})




export default router
