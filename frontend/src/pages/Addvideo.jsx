import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';
import Input from "../components/input/Input";
import { video } from '../api/videoApi';

const Addvideo = () => {

  const [formData, setFormData] = useState({
    title : '',
    description : '',
    link : ''
  });
  const { title, description, link } = formData;

  const navigate = useNavigate();


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name] : e.target.value,
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(title !== '' || link !== ''){
      const token = localStorage.getItem('token'); 
      const res = await video('add', {title:title, description:description, link:link}, token);
      if(res.success){
        console.log(res.msg);
      }
    

    }
  }




  return (
    <>
        <section className="heading">
      <h1>
        <FaVideo /> Add Video
      </h1>
    </section>
    
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <Input type = 'text' name='title' value={title} placeholder='title'  onChange={onChange} />
        </div>
        <div className="form-group">
        <Input type = 'text' name='description' value={description} placeholder='Desciption'  onChange={onChange} />
        </div>
        <div className="form-group">
        <Input type = 'text' name='link' value={link} placeholder='Link'  onChange={onChange} />
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    
    </>
  )
}
export default Addvideo