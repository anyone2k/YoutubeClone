import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Videos from './pages/Videos';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./components/Header";
import './App.css';
function App() {
  return (
    <>
      <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/videos' element={<Videos />} />
        </Routes>
      </div>
      </Router>
    </>
  );
}

export default App;
