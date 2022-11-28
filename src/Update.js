import './Register.css';
import {  useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function Update(){
    var navigate = useNavigate();



    
  
useEffect( ()=>{
    // fetch('http://127.0.0.1:3001/getusername/',{
    //     headers: {
    //         "x-access-token" : localStorage.getItem("token")
    //     }
    // })
    // .then(res=>res.json()).then(data=> !data.IsLoggedIn ? navigate("/login") : null )

    //  getdetails();
    var user = localStorage.getItem("user")
    if(user){
        fetch('http://127.0.0.1:3001/getdetails',{
        method: "POST",
        headers:{
            "Content-type" : "application/json",
        },
        body : JSON.stringify({
            "username" : localStorage.getItem("user")
        })
    }).then((res)=> res.json())
    .then((res)=>{
        console.log(res);
        document.getElementById('first').value = res['firstname']
        document.getElementById('last').value = res['lastname']
        document.getElementById('mobile').value  = res['mobile'];
        document.getElementById('place').value = res['place']
    })
    }
    else{
        navigate('/login')
    }
},[])

    function updatedetails(){
        console.log("Confirmed")
        var f = document.getElementById('first').value 
        var l = document.getElementById('last').value 
        var  m = document.getElementById('mobile').value 
        var p = document.getElementById('place').value
        if(f==""||l==""||m==""||p==""){
            document.getElementById('errorupdate').innerHTML = "Invalid Details...!"
        }
        else{
            fetch('http://127.0.0.1:3001/updatedetails',{
                method: "POST",
                "headers" : {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify({
                    "username" : localStorage.getItem("user"),
                    "firstname" : f,
                    "lastname" : l,
                    "mobile" : m,
                    "place" : p
                })
            }).then((res)=>
                res.json())
                .then((res)=>{
                    console.log(res)
                    alert("Successfully Updated...!")
                    navigate('/profile')
                })
        }
    }
    function cancel(){
        navigate('/profile')
    }



    function submitted(e){
        e.preventDefault();

        const a = e.target
        const form = {
            "fname" : a[0].value,
            "lname" : a[1].value,
            "mobile" : a[2].value,
            "mail" : a[3].value,
            "uname" : a[4].value,
            "password" : a[5].value
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
            alert(data.message)
        }
    }
        
        )
    }
    return(
        <div className='Main-Login'>
            <div className="Login">
                <div className='login-heading'>Update details</div>
                <div className='input-username'>
               
                        <div className='children'>
                            <div className='first'>
                                <div className="username">First Name</div>
                                <input className="input" type="text" id="first" />
                                <div className="username">Last Name</div>
                                <input className="input"  type="text" id="last"/>
                                <div className="username" >Mobile Number</div>
                                <input className="input" placeholder='+91 98765 43210' type="text" id="mobile" />
                                <div className="username" >Place</div>
                                <input className="input"  type="text" id="place"  />
                                <div className='errorupdate' id='errorupdate'></div>
   
                            </div>
                            
                        </div>
                        <div className='submit-button'>
                                    <input className="register-submit" type="submit" onClick={cancel}value="Cancel"/>   <input onClick={updatedetails} className="register-signup" type="submit" value="Submit"/>
                                </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Update;