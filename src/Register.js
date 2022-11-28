import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function Register(){
    var navigate = useNavigate();
    const [validpass,setvalidpass] = useState(true)



    
useEffect(()=>{
    fetch('http://127.0.0.1:3001/getusername/',{
        headers: {
            "x-access-token" : localStorage.getItem("token")
        }
    })
    .then(res=>res.json())

    .then(data=>data.IsLoggedIn ? navigate("/profile") : null )
   console.log( localStorage.getItem("user"))
},[])
    function checkpassword(ctx){
        var pwd = ctx.target.value;
        if(pwd.length>=8){
           document.getElementById('passvalid').style.display = "block"
           document.getElementById('passinvalid').style.display = "none"
        }
        else{
            document.getElementById('passinvalid').style.display = "block"
            document.getElementById('passvalid').style.display = "none"
        }
    }
    function signinredirect(){
        navigate('/login')
    }



    function submitted(e){
        e.preventDefault();
        const a = e.target;
        if(a[0].value=="" || a[1].value=="" || a[2].value=="" || a[4].value=="" || a[5].value==""|| a[6].value=="" || a[6].value.length<8 ){
            if(a[0].value=="" ){
                document.getElementById('invalidfirst').style.display="block"
            }
            else{
                document.getElementById('invalidfirst').style.display="none"
            }
            if(a[1].value=="" ){
                document.getElementById('invalidlast').style.display="block"
            }
            else{
                document.getElementById('invalidlast').style.display="none"
            }
            if(a[2].value=="" ){
                document.getElementById('invalidmobile').style.display="block"
            }
            else{
                document.getElementById('invalidmobile').style.display="none"
            }
            if(a[4].value=="" ){
                document.getElementById('invalidmail').style.display="block"
            }
            else{
                document.getElementById('invalidmail').style.display="none"

            }
            if(a[5].value=="" ){
                document.getElementById('invaliduname').style.display="block"
            }
            else{
                document.getElementById('invaliduname').style.display="none"

            }
            if(a[6].value=="" ){
                document.getElementById('passinvalid').style.display="block"
            }
            else{
                document.getElementById('passinvalid').style.display="none"

            }
            if(a[6].value.length<8 ){
                document.getElementById('passinvalid').style.display="block"
            }
            else{
                document.getElementById('passinvalid').style.display="none"

            }
            if(a[3].value=="" ){
                document.getElementById('invalidplace').style.display="block"
            }
            else{
                document.getElementById('invalidplace').style.display="none"

            }

           
            


        }
        else{
            console.log("Valid")
        
                document.getElementById('invalidfirst').style.display="none"
       
                 document.getElementById('invalidlast').style.display="none"
            
    
                document.getElementById('invalidmobile').style.display="none"
         
            
                document.getElementById('invalidmail').style.display="none"
         
           
                document.getElementById('invaliduname').style.display="none"
       
           
                document.getElementById('passinvalid').style.display="none"
                document.getElementById('invalidmail').style.display="none"
        

            
            
        const form = {
            "fname" : a[0].value,
            "lname" : a[1].value,
            "mobile" : a[2].value,
            "place" : a[3].value,
            "mail" : a[4].value,
            "uname" : a[5].value,
            "password" : a[6].value
        }
    fetch('http://127.0.0.1:3001/register/',
    {
        method: "POST",
        headers:{
            "Content-type" : "application/json",
        },
        body: JSON.stringify(form)
    }).then((res)=>res.json())
    .then(data =>{
        if(data.message=="Success"){
            alert("Successfully Registered")
            navigate('/login')
        }
        else{
            document.getElementById('invalidregister').innerHTML = data.message
        }
    }
        
        )
}
    }
    return(
        <div className='Main-Login'>
            <div className="Login">
                <div className='login-heading'>Register Now</div>
                <div className='invalidregister' id='invalidregister'></div>  
                <div className='input-username'>
                    <form method='post' onSubmit={submitted}>
                        <div className='children'>
                            <div className='first'>
                                <div className="username">First Name</div>
                                <input className="input" type="text"/>
                                <div className='passinvalid' id='invalidfirst'>Invalid First Name</div>  
                                <div className="username">Last Name</div>
                                <input className="input"  type="text"/>
                                <div className='passinvalid' id='invalidlast' >Invalid Last Name</div>  
                                <div className="username" >Mobile Number</div>
                                <input className="input" placeholder='+91 98765 43210' type="text"/>
                                <div className='passinvalid' id='invalidmobile'>Invalid mobile number</div>  
                                <div className="username">Place</div>
                                <input className="input" type="string"/>
                                <div className='passinvalid' id='invalidplace'>Invalid Place</div>
   
                            </div>
                            <div className='second'>
                                <div className="username">Mail I'd</div>
                                <input className="input" type="email"/>
                                <div className='passinvalid' id='invalidmail'>Invalid First Name</div>
                                <div className="username">Username</div>
                                <input className="input"  type="text"/>
                                <div className='passinvalid' id='invaliduname' >Inalid username</div>  
                                <div className="username">Password</div>
                                <input className="input"  type="password" onChange={checkpassword} />
                                <div id="passvalid" className='passvalid'>Valid Password</div> 
                                <div id="passinvalid" className='passinvalid'>Inalid Password ( min 8 characters )</div> 
                                   
                            </div>
                        </div>
                        <div className='submit-button'>
                                    <input className="register-submit" type="submit" value="Sign Up"/>   <input onClick={signinredirect} className="register-signup" type="submit" value="Sign In"/>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;