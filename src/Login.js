import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login(){
    var navigate = useNavigate();

    function submitted(e){
        e.preventDefault();
        const a = e.target
        const form = {
            "uname" : a[0].value,
            "password" : a[1].value,

        }
        console.log(form)
    fetch('http://127.0.0.1:3001/login',
    {
        method: "POST",
        headers:{
            "Content-type" : "application/json",
        },
        body: JSON.stringify(form)
    }).then((res)=>res.json())
    .then(data=> { 
        if(data.message=="Success"){
            localStorage.setItem("token",data.token)
            localStorage.setItem("user",data.username)
            navigate('/profile')
            console.log(data)

        }
        else{
            document.getElementById('invalidregister').innerHTML = data.message
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
    function signupredirect(){
        navigate('/signup')
    }



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

    return(
        <div className='Main-Login'>
            <div className="Login">
                <div className='login-heading'>Login</div>
                <div className='invalidregister' id='invalidregister'></div>  
                <div className='input-username'>
                    <form method='post' onSubmit={submitted}>
                    <div className="username">Username</div>
                    <input className="input" type="text"/>
                    <div className="username">Password</div>
                     <input className="input" id="1" type="password"/> <div> <span  onClick={changeseen} className="1 material-symbols-outlined login-pwd-seen">visibility_off</span> </div>
                    <div className='forgot'>Forgot Password ? <Link to="/reset" className='reset'>Reset Password</Link></div>
                    <div className='submit-button'>
                        <input className="login-submit" type="submit" value="Sign In"/>   <input onClick={signupredirect} className="login-signup" type="submit" value="Sign Up"/>
                       
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;