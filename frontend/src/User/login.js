import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    id: "",
    password: "",
  });

  const [loginStatus,setLoginStatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/userLogin", {
      id: loginDetails.id,
      password: loginDetails.password,
    }).then((response) => {
    
      if (response.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(response.data));

        navigate("/userLandPage")
      } else {
        
        setLoginStatus("Invalid ID or Password") ;
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div>
          <form className="formContainer" onSubmit={handleSumbit}>
            <h1>Login</h1>
            <label>ID</label>
            <input
              name="id"
              placeholder="Enter your ID"
              required="true"
              onChange={handleChange}
              value={loginDetails.id}
            ></input>

            <label>Password</label>
            <input
              type="password"
              name="password"
              required="true"
              placeholder="Password"
              onChange={handleChange}
              value={loginDetails.password}
            ></input>

            <button  className="button1" type="submit">Submit</button>
            <p className="loginStatus"> {loginStatus}</p>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
