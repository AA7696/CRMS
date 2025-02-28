import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Login() {
  const { setAuthTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handellogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      console.log(loginData.data);
      alert("Sucessfully logged in");
      localStorage.setItem("accessToken", loginData.data.accessToken);
      localStorage.setItem("refreshToken", loginData.data.refreshToken);

      setAuthTokens({
        accessToken: loginData.data.accessToken,
        refreshToken: loginData.data.refreshToken,
      });
      setFormData({
        email: "",
        password: "",
      });

      navigate("/homelayout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen w-screen">
        <div className="hero-content w-[50%] flex flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Log In</h1>
          </div>

          <div className="card bg-base-100 w-full shadow-2xl">
            <form className="card-body">
              <div className="form-control m-2">
                <input
                  type="email"
                  placeholder="Email id"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="form-control m-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary text-white bg-purple-900 border-purple-900 hover:bg-purple-700 hover:border-purple-700 "
                  onClick={handellogin}
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
