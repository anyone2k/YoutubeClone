import axios from 'axios';


export const video = async (route, data, token) => {
    const headers = {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    if(route === 'add'){
    const response = await axios.post(`http://localhost:5000/videos/${route}`,  data , {headers: headers})
         if( response ){
                const data = response.data;
                if(data.success === false){
                    console.log(data.success);
                    return data.msg;
                }else{
                    return data;
                }
         }   
    }
    if(route === 'showAll'){
        const response = await axios.get(`http://localhost:5000/videos/${route}`, {headers: headers})
        if( response ){
               const data = response.data;
               if(data.success === false){
                   console.log(data.success);
                   return data.msg;
               }else{
                   return data;
               }
        }  
    }
}

