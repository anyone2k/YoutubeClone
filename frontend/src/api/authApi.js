import axios from 'axios';

export const auth = async (route, data, token) => {
    if(route === 'login'){

    const response = await axios.post(`http://localhost:5000/auth/${route}`, data)
         if( response ){
                const data = response.data;
                if(data.success === false){
                    return data.msg;
                }else{
                    return data.Token;
                }
         }
                 
    }else if(route === 'register'){
        const response = await axios.post(`http://localhost:5000/auth/${route}`,data)
        if( response ){
               const data = response.data;
               if(data.success === false){
                   return data.msg;
               }else{
                   return data.success;
               }
        }
    }
    else if(route === 'deleteAccount'){
        const headers = {
            "Authorization" : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        const response = await axios.delete(`http://localhost:5000/auth/${route}`,{ headers, data: data })
        if( response ){
            const data = response.data;
                if(data.success === false){
                    return data.msg;
               }else{
                   return data.success;
                }
        }
    }
}

