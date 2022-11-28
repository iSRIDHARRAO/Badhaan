import {Link, useNavigate} from 'react-router-dom';
import './Change.css';
function Change(){
    var navigate = useNavigate();
    function cancel(){
        navigate('/')
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
            <div className="main-main-reset">
                <div className="main-reset">
                <div className='login-heading'>Reset Password</div>
                <div className='input-username'>
                <form method='post'>
                    <div className="d1">Confirm Password</div>
                    <input className="input" id="1" type="password"/><div><span  onClick={changeseen} className="1 material-symbols-outlined pwd-seen-change">visibility_off</span></div>
                    <div className="d2">New Password</div>
                    <input className="input" id="2" type="password"/><div><span  onClick={changeseen} className="2 material-symbols-outlined pwd-seen-change">visibility_off</span></div>
                    <div className="d3">Confirm new Password</div>
                    <input className="input"  id="3" type="password"/><div><span onClick={changeseen} className="3 material-symbols-outlined pwd-seen-change">visibility_off</span></div>
                    <div className='submit-button'>
                        <input className="submit" type="submit" value="Change"/>   <input className="signup cancel"  onClick={cancel} type="submit" value="Cancel"/>
                       
                    </div>
                    </form>
                </div>
            </div>
            </div>
    )
}

export default Change;