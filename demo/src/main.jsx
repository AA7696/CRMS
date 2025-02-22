import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import HomeLayout from './HomeLayout.jsx';
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import Leads from './Pages/Leads.jsx';
import Users from './Pages/Users.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import SingleContact from './Pages/SingleContact.jsx';
import EditContact from './Pages/EditContact.jsx';
import EditLead from './Pages/EditLead.jsx';


const router =  createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ]

  },
  {
    path: '/homelayout',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home />

      },
      {
        path: 'contacts',
        element: <Contact />,
      },
      {
        path: 'contacts/:id',
        element: <SingleContact />

      },
      {
        path: 'editContact/:id',
        element: <EditContact />

      },
      {
        path: 'leads',
        element: <Leads />
      },

      // {
      //   path: 'leads/:id',
      //   element:<SingleLead/>
      // },
      {
        path: 'editlead/:id',
        element:<EditLead/>
      },
      
      {
        path: 'users',
        element: <Users />
      }
    ]

  }
  
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
