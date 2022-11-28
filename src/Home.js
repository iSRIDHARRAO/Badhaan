import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home(){
    let navigate = useNavigate();
    const [status,setstatus] = useState('login');

    useEffect(()=>{
        fetch('http://127.0.0.1:3001/getusername/',{
            
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
    
        .then(data=>data.IsLoggedIn ? setstatus('profile') : null )
    },[])   

   function func(){

    navigate(status);
   }
  
    if(status=='login'){
        return(
        <div>
            <button className='home-button'onClick={func} >Sign In</button>
        </div>
        )
    }
    else{
        return(
        <div>
            <button className="home-button" onClick={func} >Profile</button>
        </div>
        )
    }
 
}

export default Home;