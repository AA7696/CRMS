import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiAlignJustify } from "react-icons/fi";


function HomeNavbar({isSidebarOpen, setIsSidebarOpen}) {
  const navigate = useNavigate();
  const {setAuthTokens} = useContext(AuthContext)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken'); // Retrieve the token
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/users/get-user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response) {
          throw new Error('Failed to fetch user info');
        }

        const userData = await response.data;
        console.log(userData);
        
        setUser(userData); // Set the user's name
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthTokens({
      accessToken: '',
      refreshToken: '',
    });
    navigate('/login');
    window.location.reload();

  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  }

  return (
    <>
        <div className={`navbar bg-base-100 ${isSidebarOpen? 'w-[89%]': 'w-full'}  h-[10%] fixed top-0 p-5 z-50`}>
  <div className={`flex-1 ${isSidebarOpen? 'ml-14': 'ml-3'} flex-row gap-6`}>
  <button onClick={toggleSidebar} className="btn btn-ghost">
            <FiAlignJustify /> {/* Icon for the toggle button */}
          </button>
    <h3 className=' text-lg font-medium'>Welcome {user.username} ! </h3>
  </div>
  <div className="flex-none">
    <button className=' btn btn-primary' onClick={handleLogout}>Log Out</button>
  </div>
</div>

    </>
  )
}

export default HomeNavbar