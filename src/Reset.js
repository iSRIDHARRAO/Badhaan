import './Reset.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
function Reset(){
    var navigate = useNavigate();
    const [state,setstate] = useState(0)
    const [username,setusername ] = useState("Username")
    function confirmed(){
        var pwd = document.getElementById('pwd').value
        var cnfpwd = document.getElementById('cnfpwd').value
        console.log(pwd,cnfpwd)
        if(pwd!=cnfpwd || pwd=="" || cnfpwd=="" || pwd.length<8){
            if(pwd!=cnfpwd){
                document.getElementById('errorpwd').innerHTML = "Passwords doesn't match"
            }
            else{
                document.getElementById('errorpwd').innerHTML = "Invalid password ( min 8 characters )"   
            }
        }
        else{
            document.getElementById('errorpwd').innerHTML = ""   
            fetch('http://127.0.0.1:3001/newpasswd/',{
                method:"POST",
                headers:{
                    "Content-type" : "application/json",
                },
                body : JSON.stringify({
                    username : username,
                    password : pwd
                })
            }).then(res=> res.json())
            .then((res)=>{
                console.log(res)
                if(res.status=="success"){
                    alert("Success")
                    navigate('/')
                }
                else{   
                    alert("Error")
                }
            })
        }
    }
    function signin(){
        navigate('/login')
    }
    function verifyotp(){
        var otp = document.getElementById('enteredotp').value
        console.log("Otp Entered",otp)
        fetch('http://127.0.0.1:3001/verifyotp/',{
            method : "POST",
            headers:{
                "Content-type" : "application/json",
            },
            body : JSON.stringify({
                "username" : username,
                "otp" : otp,
            })
        }).then((res)=> res.json())
            .then((res)=>{
                console.log(res)
                if(res.status=="success"){
                    alert("Success")
                    setstate(2)
                }
                else{
                    document.getElementById('wrongotp').innerHTML = "Incorrect Otp...!"
                }
            })
      
    }
    function usernameentered(){
        console.log(document.getElementById('username').value)
        var uname = document.getElementById('username').value
        setusername(uname)
        fetch('http://127.0.0.1:3001/sendotp/',{
            method: "POST",
            headers:{
                "Content-type" : "application/json",
            },
            body : JSON.stringify({
                "username" : uname
            })
        }).then(res=> res.json())
            .then((res)=>{
                if(res.status=="Success"){
                    alert("Otp Sent Successfully...!")
                    setstate(1)
                }
                else{
                    document.getElementById('sendotp').innerHTML = res.status
                }
            })

        
    }

useEffect(()=>{
    fetch('http://127.0.0.1:3001/getusername/',{
        
        headers: {
            "x-access-token" : localStorage.getItem("token")
        }
    })
    .then(res=>res.json())

    .then(data=>data.IsLoggedIn ? navigate("/profile") : null )
},[])

    function changeseen(the){
        console.log(the.target.className[0])
        var index = the.target.className[0]
        var ele=document.getElementById(index);
        if(the.target.innerHTML=="visibility"){
            the.target.innerHTML="visibility_off"
            ele.type="password"
            console.log(ele)
        }
        else{
            the.target.innerHTML="visibility"
            ele.type="text"
            console.log(ele)
        }
    }


    if(state==1){


        return(
            <div className='Main-Login'>
                <div className="Login">
                    <div className='login-heading'>Reset Password</div>
                    <div className='text-otp'>Otp sent to the mobile number assiciated with <br/>username : { username }</div>
                    <div className='input-username'>
                        
                        <div className="username">Enter One Time Password:-</div>
                        <input className="input" id="enteredotp" placeholder="0 0 0 0" type="text"/>
                        <div className='wrongotp' id='wrongotp'>

                        </div>
                        
                        <div className='submit-button'>
                               <input onClick={signin} className="login-signup" type="submit" value="Sign In"/> <input onClick={verifyotp} className="login-submit" type="submit" value="Next"/>
                           
                        </div>
                       
                    </div>
                </div>
            </div>
        )
    }
    else if(state==2){

        return(
            <div className='Main-Login'>
                <div className="Login">
                    <div className='login-heading'>Reset Password</div>
                    <div className='input-username'>
                       
                        <div className="username">Enter New Password</div>
                        <input className="input" id="pwd" type="password"/>
                        <div className="username" >Confirm New Password</div>
                        <input className="input" id="cnfpwd" type="password"/>
                        <div className='errorpwd' id="errorpwd"></div>
                        
                        <div className='submit-button'>
                              <input onClick={signin} className="login-signup" type="submit" value="Sign In"/> <input onClick={confirmed} className="login-submit" type="submit" value="Confirm"/> 
                           
                        </div>
                      
                    </div>
                </div>
            </div>
        )

    }
else{
    return(
        <div className='Main-Login'>
            <div className="Login">
                <div className='login-heading'>Reset Password</div>
                
                <div className='input-username'>
                   
                    <div className="username" >Username</div>
                    <input className="input"  id='username' type="text"/>
                    <div className='sendotp-1' id='sendotp'></div>
                    
                    <div className='submit-button'>
                           <input onClick={signin} className="login-signup" type="submit" value="Sign Up"/> <input className="login-submit" onClick={usernameentered}  type="submit" value="Next"/>
                       
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
}

export default Reset;