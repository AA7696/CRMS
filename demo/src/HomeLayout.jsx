import React from 'react'
import HomeNavbar from './components/HomeNavbar'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {checkTokenValidity} from './utils/refresh.js'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx'
import {jwtDecode} from 'jwt-decode';

function HomeLayout() {
       const {setAuthTokens} = useContext(AuthContext)
       const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
       useEffect(() => {
        const checkTokenExpiration = () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    const payload = jwtDecode(accessToken);
                    const exp = payload.exp * 1000; // Convert to milliseconds
                    const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
                    if (Date.now() >= exp - bufferTime) {
                        checkTokenValidity();
                    }
                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
        };
    
        const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

// useEffect for store the token in context when the page is refreshed
useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
        setAuthTokens({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
  },[])

  return (
    <>
    <div className={`drawer  w-screen min-h-screen ${isSidebarOpen ? 'drawer-open' : 'drawer-close'}`}>
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center h-full   ">
    <HomeNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    <Outlet />
  </div>
  <div className="drawer-side w-[20%] h-full   ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-gray-400 text-base-content h-full w-50 p-4">
    <div className='text-[#646cff]'>
      <Link className=" font-bold text-3xl btn btn-ghost btn:hover-none ">
      CRMS
      </Link>
      </div>
      <li className=' mt-5 text-lg '><Link to= '/homelayout' className=' font-medium text-white'>Dashboard</Link></li>
      <li className=' mt-5 text-lg'><Link to= '/homelayout/contacts' className=' font-medium text-white'>Contacts</Link></li>
      <li className=' mt-5 text-lg'><Link to= '/homelayout/leads' className=' font-medium text-white'>Leads</Link></li>
      <li className=' mt-5 text-lg'><Link to= '/homelayout/users' className=' font-medium text-white'>User</Link></li>
    </ul>
  </div>
</div>
    </>

  )
}

export default HomeLayout