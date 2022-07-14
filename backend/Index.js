const express = require('express');
const mongoose = require('mongoose');
const app= express();
const nodeMailer = require('nodemailer');
const port = process.env.PORT||5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const Login = require('./model/Login');
const Ot = require('./model/Ot');
mongoose.connect("mongodb+srv://ayush:ayush@cluster0.sggba.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connected to db');
})
app.use(cors());
app.use(bodyParser());
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({storage:storage})
app.post("/",upload.single("test"),async(req,res)=>{
    const emaill=req.body.email;
    
    
    const saveImage = await new Login({
        name:req.body.name,
        email:emaill,
        phone:req.body.phone,
        test:req.file,
        password:req.body.password
    })
    var otpc = await Math.floor(Math.random()*10000+1);
    console.log(otpc);
    const opS =  await new Ot({
        ot:otpc
    });
    opS.save();
    var transport = await nodeMailer.createTransport({
        service: 'gmail',
        auth:{
            user:'aaayush879@gmail.com',
            pass:'xyfxwqweouylprdh'
        }
    });
    var mailOption={
        from:'aaayush879@gmail.com',
        to:`${emaill}`,
        subject:'otp verification from A AAYUSH',
        text:`${otpc}`

    }
    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
    });
    saveImage.save().then((res)=>{
        console.log("data save");
        console.log(saveImage);
    })
    .catch((e)=>{
        console.log(e);
    })
    
    
    
    
})
app.post('/otp',async(req,res)=>{
    const o=req.body.otp;
    const userr = await Ot.findOne({ot:o});
    if(!userr){
        console.log('not verified');
        res.send('not verified')
    }
    else{
        console.log('verified');
        res.send('verified');
        
    }
    console.log(o);
})
app.get('/home',async(req,res)=>{
    const dataa = await Login.find();
    res.json(dataa);
})
app.post('/login',async(req,res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    const user = await Login.findOne({email:email});
    if(!user){
        res.send('please create account');
    }
    else{
        if(user.password!=pass){
            res.send('wrong password');
        }
        else{
            res.send('succeesful');
        }
    }
})

app.listen(port,()=>{
    console.log(`connected at${port}`);
})