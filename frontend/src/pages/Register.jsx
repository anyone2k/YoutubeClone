import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import {FaUser} from 'react-icons/fa'
import Input from "../components/input/Input";
import { auth } from '../api/authApi';
const Register = () => {

    const [formData, setFormData] = useState({
      name : '',
      email : '',
      password : '',
      password2 : ''
    });
    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();



    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.name] : e.target.value,
      }))
    }
    const onSubmit = async (e) => {
      e.preventDefault();
      if(password !== password2){

      }else{
        try{
          const res = await auth('register', { name:name, email:email, password:password }, null);
          if(res === true){
            navigate('/login');
          }
          
        }catch(error){

        }
      }
    }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
    </section>
    
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <Input type = 'text' name='name' value={name} placeholder='Enter your name'  onChange={onChange} />
        </div>
        <div className="form-group">
        <Input type = 'email' name='email' value={email} placeholder='Enter your email'  onChange={onChange} />
        </div>
        <div className="form-group">
        <Input type = 'password' name='password' value={password} placeholder='Enter your password'  onChange={onChange} />
        </div>
        <div className="form-group">
        <Input type = 'password' name='password2' value={password2} placeholder='Confirm your password'  onChange={onChange} />
        
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}
export default Register