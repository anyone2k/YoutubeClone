import { video } from '../api/videoApi';
import { useEffect, useState } from 'react';

const Videos = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem('token'); 

  useEffect(()=>{
   if(!data){
    const res = video('showAll', null, token);
    if(res){
      res.then(res=>setData(res));
    }
  }
    
    },[data])
  const onSubmit = async (e) => {
    e.preventDefault();
    try{

      console.log(data);
  
    }catch(err){
        console.log(err?.data?.message || err.error);
    }
  };


  return (
    <div>
      <button onClick={onSubmit}></button>
    </div>
  )
}
export default Videos