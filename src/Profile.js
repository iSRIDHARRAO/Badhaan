import { useEffect,useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Profile.css';
function Profile(){
    const navigate = useNavigate();
    const  [details,setdetails] = useState({
        "firstname" : "login first",
        "lastname" : "login first",
        "mobile" : "login first",
        "mail" : "login first",
        "place" : "login first",
        "username" : "login first"

    })
    function profileupdate(){
        console.log("Update")
        navigate('/update')
    }
    function profilelogout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.log("Logout")
        navigate('/login')
    }

    useEffect(() =>{
        const data = {
            "username" : localStorage.getItem("user")
        }
        fetch("http://127.0.0.1:3001/getdetails",{
                method: "post",
                headers:{
                    "Content-type" : "application/json",
                },
                body:JSON.stringify(data),})
    
            .then(res=> res.json())
            .then(res =>{ setdetails(res);
            console.log(res)
            })}
              
         ,[]
     )
     


    return(
        <div className='Main-Login'>
            <div className="Login">
                <div className='login-heading'>Profile</div>
                <div className='second-prof'>
                        <div className='second-one'>
                            <p>Name</p>
                            <p>Email Id</p>
                            <p>Username</p>
                            <p>Mobile Number</p>
                            <p>Place</p>


                        </div>
                        <div className='second-two'>
                        <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>

                        </div>
                        <div className='second-two'>
                        <p>{details.firstname} {details.lastname}</p>
                        <p>{details.mail}</p>
                            
                            <p>{details.username}</p>
                            <p>+91 {details.mobile}</p>
                            <p>{details.phone}</p>
                            <p>{details.place}</p>

                        </div>


                </div>
                <div className='second-prof'>
                    <div className='second-one'><button onClick={profileupdate} className='profile-button'>Update Profile</button></div>
                    <div className='second-two'><button onClick={profilelogout} className='profile-button'>Logout</button></div>
                </div>
                
            
        </div>
        </div>
    )
}

export default Profile;