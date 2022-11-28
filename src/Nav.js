import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
function Nav(){
    const [stat,setstat] = useState('Home')
    return(
        <>
        <div className="Nav">
            <p className="heading">Badhaan</p>
            
        </div>
        <div className='navigation'>
                <Link  className="link" to="/"><span class="material-symbols-outlined login-logo">home</span>{ stat } </Link>

            </div>
        </>
    )
}

export default Nav;