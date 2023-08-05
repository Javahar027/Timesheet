import axios from "axios";



const API = axios.create({
    baseURL: "http://localhost:3001",
  });
 
  API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("user")).token
      }`;
    }
    return req;
  });

  API.interceptors.response.use((res) =>{
    if(res.status == 401 || res.status == 403){
      alert("Session Expired")
      localStorage.removeItem("user");
      window.location.reload();
      
    }
    return res;
  })

  export default API;