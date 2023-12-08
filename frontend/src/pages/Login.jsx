import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {FaUser} from 'react-icons/fa';
import Input from "../components/input/Input";
import { auth } from '../api/authApi';
import { AuthContext } from "../context/AuthProvider";


const Login = () => {
  const { setLogin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const navigate = useNavigate();

  const { email, password } = formData;


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name] : e.target.value,
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
       
 const res =  auth('login', formData, null);
        if(res){
           await res.then(response => localStorage.setItem('token', response));
           if(localStorage.getItem('token') !== ''){
            setLogin();
           }
           navigate('/');
            // handle error for user not found
          
        }

    }catch(err){
        console.log(err?.data?.message || err.error);
    }
  };

return (
  <>
  <section className="heading">
    <h1>
      <FaUser /> Login
    </h1>
  </section>
  
  <section className="form">
    <form onSubmit={onSubmit}>
      <div className="form-group">
      <Input type = 'email' name='email' value={email} placeholder='Enter your email'  onChange={onChange} />
      </div>

      <div className="form-group">
      <Input type = 'password' name='password' value={password} placeholder='Enter your password'  onChange={onChange} />
      </div>
      <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
      </div>
    </form>
  </section>
  </>
)
}
export default Login