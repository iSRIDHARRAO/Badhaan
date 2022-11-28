import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import client from './twilioconf.js';

const app = express();
const password = "<mongodbpassword>";
const dburi = `mongodb+srv://<username>:${password}@<cluster-host>/?retryWrites=true&w=majority`

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//generate otp function

function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

//schema
const userSchema = mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    mobile:{
        type : String,
        required : true
    },
    mail:{
        type : String,
        required : true
    },
    username:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    place:{
        type: String,
        required: true
    }
    
}
,{timestamps: true})
const User = mongoose.model("User",userSchema)


const otpSchema = mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    otp:{
        type : String,
        required : true
    },

    
}
,{timestamps: true})
const Otp = mongoose.model("Otp",otpSchema)

//database connect
mongoose.connect(dburi,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then((res)=>{
    app.listen(
        3001,
            () => {
                console.log("server started after database connection")
            }
        )
    })
    .catch(err=> console.log(err))

app.get('/',(req,res)=>{
    res.send("Hello")
})
app.post('/verifyotp',(req,res)=>{
    console.log(req.body)
    var username = req.body.username
    var otp = req.body.otp
    Otp.findOne({
        username : username
    }).then((data)=>{
        console.log(data['otp'])
        var votp = data['otp']
        if(otp==votp){
            Otp.findOne({
                username : username
            }).remove().exec();
            res.send({
                "status" : "success"
            })
        }
        else{
            res.send({
                "status" : "failure"
            })
        }
    })

})
app.post('/newpasswd',async (req,res)=>{
    console.log(req.body)
    var username = req.body.username
    var password = req.body.password
    password = await bcrypt.hash(password,10)
    var search = {
        username : username
    }
    var update = {
        password : password
    }
    await User.findOneAndUpdate(search,update)
    console.log(password)
    res.send({
        "status" : "success"
    })

})
app.post('/register',async (req,res)=>{
    console.log(req.body)
    const user = req.body;
    const takenEmail = await User.findOne({
        mail : user.mail
    })
    const takenusername = await User.findOne({
        username : user.uname
    })
    if(takenEmail || takenusername ){
        res.json({
            message : "Already taken email or username...!"
        })
    }
    else{
        user.password = await bcrypt.hash(req.body.password,10)
        const dbUser = new User({
            username: user.uname.toLowerCase(),
            mail  :  user.mail  ,
            password : user.password ,
            place: user.place,
            firstname : user.fname ,
            lastname : user.lname,
            mobile: user.mobile,
        })
        dbUser.save()
        res.json({
            message: "Success"
        })
    }
})

app.post('/sendotp',(req,res)=>{
    console.log(req.body)
    var body = req.body
    var username = body.username
    User.findOne({"username":username}).then((data)=>{
        if(!data){
            res.send({
                "status" : "Register First, Given username is not registered...!"
            })
        }
        else{
            const mobile = data['mobile']
            console.log(mobile)
            var otp = generateOTP();
                client.messages.create({
                    body: `Otp :- ${otp}`,
                    to: `+91${mobile}`, // Text this number
                    from: '+14302491500', // From a valid Twilio number
                })
                .then((message) => {
                    const otpdata = new Otp({
                        username: username,
                        otp: otp,
                    })
                    otpdata.save()
                    res.send({
                        "status" : "Success"
                    })
                    console.log(message.sid)
                    
                }).catch((err)=>{
                    res.send({
                        "status" : "Unable to send message to your registered Number..."
                    })
                })
        }
    })

})

app.post('/getdetails',(req,res)=>{
    var b = req.body
    var username = b.username;
    User.findOne({
        username: username
    }).then((db)=>{
        console.log(db)
        if(db){
        res.send({
            "firstname" : db['firstname'],
            "lastname" : db['lastname'],
            "mobile" : db['mobile'],
            "place" : db['place'],
            "mail" : db['mail'],
            "username" : db['username']


        })
    }
    else{
        res.send({
            "status" : "no data"
        })
    }
    })
})
app.get('/logout',(req,res)=>{
    console.log("Logout")
    res.send(200)
})  
app.post('/updatedetails',async (req,res)=>{
    console.log(req.body)
    var data = req.body
    await User.updateMany({
        username: data['username']
    },{
        firstname : data['firstname'],
        lastname : data['lastname'],
        mobile : data['mobile'],
        place: data['place']
    })
    res.send({
        "status" : "Success"
    })
})
function verifyJYT(req,res,next){
    const token = req.headers["x-access-token"]?.split(' ')[1]
  
    if(token){
        jwt.verify(token,"SECRET",(err,decoded)=>{
            if(err) return res.json({
                IsLoggedIn: false,
                message: "Failed to authenticate"
            })
            req.user={};
            req.user.id = decoded.id
            req.username = decoded.username
            next();
        })
    }
        else{
            res.json({
                message: "Incorrect Token Given",IsLoggedIn: false
            })
        }
    
}
app.post('/login',(req,res)=>{
    const user = req.body;
    console.log(user.uname)
    User.findOne({
        username: user.uname
    }).then(dbres=>{
        
        if(!dbres){
            return res.json({
                message: "Invalid Username or Password...!"
            })
        }
        bcrypt.compare(user.password,dbres.password)
        .then(passres=>{
            if(passres){
                const data = {
                    id: dbres._id,
                    username : dbres.username
                }
                jwt.sign(
                    data,
                    "SECRET",
                    {expiresIn:86400},
                    (err,token)=>{
                        if(err) return res.json({message: err})
                        return res.json({
                            message: "Success",
                            token: "Bearer "+token,
                            username: dbres.username
                        })
                    }
                )
            }
            else{
                return res.json({
                    message: "Invalid username or password"
                })
            }
        })
    })
})
app.get('/getusername',verifyJYT,(req,res)=>{
    res.json({IsLoggedIn:true  })
})