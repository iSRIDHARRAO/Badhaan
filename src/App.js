import NoElement from './NoElement';
import './App.css';
import Login from './Login';
import Register from './Register';
import Profile  from './Profile';
import Home from './Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Nav from './Nav'
import Update from './Update';
import Change from './Change';
import Reset from './Reset';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path='/login' element={ <Login/> } />
        <Route exact path='/signup' element={ <Register/> } />
        <Route exact path='/change' element={ <Change/> } />
        <Route exact path='/profile' element={ <Profile/> } />
        <Route exact path='/reset' element={ <Reset/> } />
        <Route exact path='/update' element={ <Update/> } />
        
        <Route exact path='*' element={ <NoElement/> } />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
