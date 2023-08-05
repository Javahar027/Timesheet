import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import API from "../service";

function Login() {
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    id: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    API.post("/api/userLogin", {
      id: loginDetails.id,
      password: loginDetails.password,
    })
      .then((response) => {
        console.log(response);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();

          // navigate("/userLandPage");
        } else {
          setLoginStatus("Invalid ID or Password");
        }
      })
      .catch((err) => {});
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

            <button className="button1" type="submit">
              Submit
            </button>
            <p className="loginStatus"> {loginStatus}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
