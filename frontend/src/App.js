import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Videos from './pages/Videos';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Daccount from './pages/Daccount';
import Header from "./components/Header/Header";
import './App.css';
import Addvideo from "./pages/Addvideo";
import  AuthProvider  from "./context/AuthProvider";



function App() {

  return (
    <>
    <AuthProvider >
      <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route index={true} path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addvideo' element={<Addvideo />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/deleteAccount' element={<Daccount />} />
        </Routes>
      </div>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
