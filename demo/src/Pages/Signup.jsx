import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
})

const handelregister = async (e)=>{
  e.preventDefault()
  try {
      const regiData = await axios.post('http://localhost:3000/api/auth/register', formData)
      console.log(regiData);
      alert("Registration Successfull")
      setFormData({
        username: '',
        email: '',
       password: '',
      })
      navigate('/login')
      
  } catch (error) {
      console.log(error);
      
  }

}


  return (
    <>
    <div className="hero bg-base-200 min-h-screen w-screen">
  <div className="hero-content w-[50%] flex flex-col">
  <div className="text-center">
      <h1 className="text-5xl font-bold">Sign In</h1>
    </div>

    <div className="card bg-base-100 w-full shadow-2xl">
      <form className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" className="input input-bordered" value={formData.username} onChange={(e) =>{setFormData({...formData, username: e.target.value})}} required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered"  value={formData.email} onChange={(e) =>{setFormData({...formData, email: e.target.value})}} required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered"  value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}} required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-purple-900 border-purple-900 text-white hover:bg-purple-700 hover:border-purple-700" onClick={handelregister}>Sign In</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  )
}

export default Signin