const express = require("express")
const app = express()
const fs = require('fs')
const url = require('url')
const multer = require('multer')
const path = require('path')

app.use(express.json());

app.use('/data', express.static(__dirname + '/data'));  
app.use(express.static(__dirname + '/public')); 
const dataPath = '/data/data.json';
const filePath = __dirname + dataPath;

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
    fs.readFile(filePath,(err,data)=>{
        if (err) throw err;
        let postData = JSON.parse(data);
        let latestID = postData.splice(-1)[0].id + 1;
        console.log(latestID);
        let tempData = {
            id: latestID,
            note: req.body.note
        }
    })
}, (error,req,res,next)=>{
    res.status(400).send({error: error.message});
});

app.get("/postdata",(req,res)=>{
    fs.readFile(filePath,(err,data)=>{
        if (err) throw err;
        let postData = JSON.parse(data);
        res.json(postData);
    });
})

app.get("/post/:id",(req,res)=>{
    const id = req.params.id;
    fs.readFile(filePath,(err,data)=>{
        if (err) throw err;
        let postData = JSON.parse(data);
        res.json(postData.find(d => d.id == id));
    });
})

app.post('/update',(req,res)=>{
    console.log(req.body.tags);
    fs.readFile(filePath,(err,data)=>{
        if(err) throw err;
        let postData = JSON.parse(data);
        postData = postData.map(p=>{
            if(p.id == req.body.id){
                p.note = req.body.note;
                p.tag = req.body.tags;
                p.datemodified = Date.now();
            }
            return p;
        });
        fs.writeFile(filePath,JSON.stringify(postData),(err)=>{
            if (err) throw err;
        });
    })
})

app.listen(5000,()=>{console.log("Server started on port 5000")})