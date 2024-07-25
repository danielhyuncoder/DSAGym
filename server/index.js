const express = require('express');
const cors=require('cors');
const {Users, Problems, TotProbs} = require('./schemas')
const mongoose = require('mongoose');
//require('dotenv').config();
const {middleware} = require('./middleware');
const rateLimit=require('express-rate-limit')
let admin = require("firebase-admin");
let serviceAccount = require("./serviceKey.json");

const fireApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


mongoose.connect("mongodb+srv://dhyun1543:"+process.env.MONGO_KEY+"@cluster0.as6cku9.mongodb.net/")
const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware)
app.use(rateLimit({
    windowMs: (1000*60)*30,
    max: 500
}))

const noSemiColon={
    "python": true
}
const statementPrint={
    "javascript": "console.log",
    "python": "print"
}



app.post("/user/info", (req, res) => {
    fireApp.auth().getUser(req.body.uid).catch(err=>{
        res.status(400).send(err);
    }).then(r=>{
        if(r){
            Users.find({uid: req.body.uid}).then(data=>{
                if (data.length===0){
                    Users.create({email: req.body.email, uid: req.body.uid, hardSolved: 0, mediumSolved: 0, easySolved: 0, admin: false}).then(data=>{
                        data=data[0]
                        let newData={
                            email: data.email,
                            _id: data._id,
                            hardSolved:data.hardSolved,
                            mediumSolved: data.mediumSolved,
                            easySolved: data.easySolved,
                            admin: data.admin,
                            problemsSolved: data.problemsSolved
                        }
                        res.status(200).send([newData]);
                    })
                } else {
                    data=data[0]
                    let newData={
                        email: data.email,
                        _id: data._id,
                        hardSolved:data.hardSolved,
                        mediumSolved: data.mediumSolved,
                        easySolved: data.easySolved,
                        admin: data.admin,
                        problemsSolved: data.problemsSolved
                    }
                    res.status(200).send([newData]);
                }
            })
        }
    })
})
app.post("/userdata", (req, res) => {
    Users.find({_id: req.body._id}).then(data=>{
        TotProbs.find().then(d=>{
            data.push(d[0]);
            let dt=data[0];
            let newData={
                email: dt.email,
                _id: dt._id,
                hardSolved:dt.hardSolved,
                mediumSolved: dt.mediumSolved,
                easySolved: dt.easySolved,
                admin: dt.admin,
                problemsSolved: dt.problemsSolved
            }
            data[0]=newData;
            res.status(200).send(data);
        })
    }).catch(err=>{
        res.status(400).send(err);
    })
})
app.post('/add/problem', (req, res) => {
    Users.find({uid: req.body.uid}).then(data=>{
        if (data.length>0){
            if (data[0].admin){
                if (req.body.difficulty==='Easy'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {easy: 1}}).then(res=>{
                        //console.log(res)
                    })
                } else if (req.body.difficulty==='Medium'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {medium: 1}}).then(res=>{
                        //console.log(res)
                    })
                } else {
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {hard: 1}}).then(res=>{
                        //console.log(res)
                    })
                }
                Problems.create({name: req.body.name, difficulty: req.body.difficulty, statement: req.body.statement, testcases: req.body.testcases, editorial: req.body.editorial, tag:req.body.tag}).then(r=>{
                    //console.log(req.body.difficulty)
                    res.status(200).send("Problem created.");
                })
            } else {
                res.status(403).send("Lack of Credentials");
            }
        } else {
            res.status(403).send("Lack of Credentials");
        }
    })
})
app.post('/get/problem', (req,res)=>{
    Problems.find({name: req.body.name}).then(data=>{
        if (data.length===0){
            res.status(404).send("Problem Not Found")
        } else {
            res.status(200).send(data[0])
        }
    })
})
app.post('/edit/problem', (req, res)=>{
    Users.find({uid: req.body.uid}).then(data=>{
        if (data.length>0){
            if (data[0].admin){
                if (req.body.difficulty==='Easy'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {easy: 1}}).then(b=>{
                        //console.log(res)
                    })
                } else if (req.body.difficulty==='Medium'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {medium: 1}}).then(b=>{
                        //console.log(res)
                    })
                } else {
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {hard: 1}}).then(b=>{
                        //console.log(res)
                    })
                }
                Problems.find({_id:req.body._id}).then(g=>{
                    if (g[0].difficulty==='Easy'){
                        TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {easy: -1}}).then(b=>{
                            //console.log(res)
                        })
                    } else if (g[0].difficulty==='Medium'){
                        TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {medium: -1}}).then(b=>{
                            //console.log(res)
                        })
                    } else {
                        TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {hard: -1}}).then(b=>{
                            //console.log(res)
                        })
                    }
                })
                Problems.updateOne({_id: req.body._id}, {$set: {name: req.body.name, difficulty: req.body.difficulty, statement: req.body.statement, testcases: req.body.testcases, editorial: req.body.editorial, tag:req.body.tag}}).then(r=>{
                    res.status(200).send("Updated Problem.")
                })
            } else {
                res.status(403).send("Lack of Credentials");
            }
        } else {
            res.status(403).send("Lack of Credentials");
        }
    })
})
app.post("/remove/problem", (req, res)=>{
    Users.find({uid: req.body.uid}).then(data=>{
        if (data.length>0){
            if (data[0].admin){
                if (req.body.difficulty==='Easy'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {easy: -1}}).then(res=>{
                        //console.log(res)
                    })
                } else if (req.body.difficulty==='Medium'){
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {medium: -1}}).then(res=>{
                        //console.log(res)
                    })
                } else {
                    TotProbs.updateOne({_id: '6692fe49326366b3955720d9'}, {$inc: {hard: -1}}).then(res=>{
                        //console.log(res)
                    })
                }
                Problems.deleteOne({name: req.body.name}).then(r=>{
                    
                    
                    res.status(200).send("Updated Problem.");
                })
            } else {
                res.status(403).send("Lack of Credentials");
            }
        } else {
            res.status(403).send("Lack of Credentials");
        }
    })
})
app.get('/problems', (req, res)=>{
    Problems.find().then(data=>{
        data[0]['testcases']=null;
        res.status(200).send(data)
    })
})
app.post('/submit/problem', (req, res)=>{
    Users.find({uid: req.body.uid}).then(dataUser=>{
        if (dataUser.length>0){
            Problems.find({name: req.body.name}).then(async data=>{
                if (data.length>0){
                    data=data[0];
                    let sucessfulCases=0;
                    let tmpCode=req.body.code+'\n';
                    const lang = req.body.lang;

                    for (let i=0;i<data.testcases.length;i++){
                         let lim = Math.min(data.testcases.length, i+1);
                         let parameters=data.testcases[i].input.split('|').join(",")
                         tmpCode+=statementPrint[req.body.lang]+"(solution("+parameters+"))"+(noSemiColon[req.body.lang]?"":";")+'\n';
                         const lang = req.body.lang;
                    }
                    let d = await fetch('https://glot.io/api/run/'+lang+'/latest', {method: "POST", headers: {'Authorization': process.env.GLOT_KEY,'Content-Type': 'application/json'}, body:JSON.stringify({files: [                                                                                         {
                        name: "main."+lang,
                        content:tmpCode
                          }
                    ]})});
                    d=await d.json();
                    if (d.error.length>0){
                        res.status(200).send({sucess:-1, message: "Compiler error occured during runtime.", testcase: data.testcases[0], result: d.stderr});
                    } else {
                         let splitOutputs = d.stdout.split("\n").filter(item=>item!=='')
                         if (splitOutputs.length<data.testcases.length){
                            res.status(200).send({sucess:-1, message: "Error, Function does not have a return clause.", testcase: data.testcases[0], result: "N/A"});
                         } else {
                            let ptr = splitOutputs.length-data.testcases.length;
                            for (let i = 0;i<data.testcases.length;i++){
                                if (data.testcases[i].expected!==splitOutputs[ptr].split(" ").join("")){
                                    res.status(200).send({sucess:-1, message: "Error on testcase "+(i+1).toString()+", incorrect ouputs.", testcase: data.testcases[i], result: splitOutputs[ptr]});
                                    break;  
                                } else {
                                     ptr++;
                                     sucessfulCases++;
                                  }
                            }
                         }
                    }
                    if (sucessfulCases===data.testcases.length){
                      res.status(200).send({sucess:1, message: "Solution Accepted."});
                      let other = true;
                      dataUser[0].problemsSolved.map(k=>{
                           if (k.name===data.name){
                              other=false;
                           }
                      })
                      if (other){
                        dataUser[0].problemsSolved.push({name: data.name, difficulty: data.difficulty});
                        if (data.difficulty==='Easy'){
                            dataUser[0].easySolved++;
                        } else if (data.difficulty==='Medium'){
                            dataUser[0].mediumSolved++;
                        } else {
                            dataUser[0].hardSolved++;
                        }
                        Users.updateOne({_id: dataUser[0]._id}, {$set: dataUser[0]}).then(res=>{
                        });
                     }
                    } 
                    
                } else {
                    res.status(404).send("Problem Doesn't exist")
                }
            })
            
        } else {
            res.status(403).send("Lack of Credentials");
        }
    })
})
app.listen(4000);
