import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className="navbar  bg-base-100 w-full">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Demo</a>
  </div>
  <div className="flex-none">   
    <ul className="menu menu-horizontal px-1">
      <li><Link to= '/' className=' font-medium'>Sign Up</Link></li>
      <li><Link to= '/login' className=' font-medium'>Log In</Link></li>
    </ul>
  </div>
</div>

    </> 
     )
}

export default Navbar