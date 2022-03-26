import multer from "multer";
import {fileURLToPath} from 'url'
import path from 'path' 
import strings from "../localization.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 
const uploadsDirectory = path.resolve(__dirname, '../../uploads')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDirectory)
    },
    filename(req, file, cb){
        const fileName = `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
        req.fileName = fileName 
        cb(null, fileName)
    }
})

export const uploadHandler = multer({
    storage,
    limits:{
        fileSize:5000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) {
            cb(new Error(strings.product[req.headers.lang].image_upload_formats))
        }
        cb(undefined, true)
    }
})


export const ChunkUploadHandler = multer({
    // limits:{
    //     fileSize:3 *1024 *1024 
    // },
    // fileFilter(req, file, cb){
    //     if(!file.originalname.match(/\.(rar|RAR|zip|ZIP|tar|TAR|gz|GZ|7z|7Z)$/)) {
    //         cb(new Error('please upload the following extension (RAR | ZIP | TAR | GZ | 7Z)'))
    //     }
    //     cb(undefined, true)
    // }
})

