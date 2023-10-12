const express = require("express")
const app = express()
const fs = require('fs')
const url = require('url')
const multer = require('multer')
const path = require('path')

app.use('/data', express.static(__dirname + '/data'));  
app.use(express.static(__dirname + '/public')); 
const dataPath = '/data/data.json';

const fileStorage = multer.diskStorage({
    destination: __dirname + '/data/images',
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '_' + Date.now()
        + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: fileStorage,
    limits:{
        fileSize: 10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Please upload an image file!'));
        }
        cb(undefined,true);
    }
})

app.post('/uploadpost', upload.single('image'), (req, res) =>{
    res.send(req.file);
}, (error,req,res,next)=>{
    res.status(400).send({error: error.message});
});

app.get("/postdata",(req,res)=>{
    filePath = __dirname + dataPath;
    fs.readFile(filePath,(err,data)=>{
        if (err) throw err;
        let postData = JSON.parse(data);
        res.json(postData);
    });
})

app.get("/post/:id",(req,res)=>{
    const id = req.params.id;
    filePath = __dirname + dataPath;
    fs.readFile(filePath,(err,data)=>{
        if (err) throw err;
        let postData = JSON.parse(data);
        res.json(postData.find(d => d.id == id));
    });
})

app.listen(5000,()=>{console.log("Server started on port 5000")})