const express = require("express")
const app = express()
const fs = require('fs')
const url = require('url')

app.use('/data', express.static(__dirname + '/data'));  
app.use(express.static(__dirname + '/public')); 
const dataPath = '/data/data.json';

app.post('/uploadpost', (req, res) =>{
    var body = 'ho';
    filePath = __dirname + '/data/data.txt';
    req.on('data', function(data) {
        body += data;
    });
    req.on('end', function (){
        fs.appendFile(filePath, body, function() {
            res.end();
        });
    });
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

app.get("/api", (req,res)=>{
    res.json({"users": ["userOne","userTwo","userThree","userFour"] })
});

app.listen(5000,()=>{console.log("Server started on port 5000")})