import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "../components/input/Input";
import { auth } from '../api/authApi';
import { AuthContext } from "../context/AuthProvider";

const Daccount = () => {

  const { setLogin } = useContext(AuthContext);
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    password : ''
    });
    const { password } = formData;
        
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.name] : e.target.value,
      }))
    };
          const onSubmit = async (e) => {
            e.preventDefault();
            try{
                const token = localStorage.getItem('token'); 
                const res = await auth('deleteAccount', {password:password}, token);
                console.log(res);
                if(res){
                  await res.then(localStorage.setItem('token', ''));
                  if(localStorage.getItem('token') !== ''){
                   window.location.reload(true);
                   console.log("done");
                   navigate('/')
                  }
                
         
              }
                res.then(console.log);
            }catch(err){
                console.log(err?.data?.message || err.error);
            }
          };
    
    

      return (
        <>
        <section className="form">
        <form onSubmit={onSubmit}>
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
export default Daccount