import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { MdDelete } from "react-icons/md";


function SingleContact() {
  const { id } = useParams()
  const [contact, setContact] = useState({})
  const [activityType, setActivityType] = useState('')
  const [activityDesc, setActivityDesc] = useState('')
  const [activityData, setActivityData] = useState([])

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/contacts/get/${id}`);
        const contactData = response.data.contact;        
        setContact(contactData)

      } catch (error) {
        console.log(error)

      }
    }

    const getActivities = async() =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/contacts/${id}/activity`);
        const activities = response.data.activities;
        setActivityData(activities);
      } catch (error) {
        console.log(error);
      }
    }
    getContact()
    getActivities()

  }, [activityDesc])

  const addActivity = async () =>{
    try {
      const response = await axios.post(`http://localhost:3000/api/contacts/${id}/activity`,{
        activityType: activityType,
        description: activityDesc
      })
      
      console.log('Activity added successfully:', response.data);
      alert('Activity added successfully!');
      setActivityType('')
      setActivityDesc('')

    } catch (error) {
      console.log(error)
      
    }
  }

  const deleteActivity = async (contactid, activityId) => {
    console.log(activityId);
    
      try {
          const response = await axios.delete(`http://localhost:3000/api/contacts/${contactid}/activity/del/${activityId}`);
          console.log(response.data);
          
  
          if (response.status === 200) {
              console.log('Activity deleted successfully');
              alert('Activity deleted successfully!');
              window.location.reload();
              
          } else {
              console.error('Error deleting activity:', response.status);
              
          }
      } catch (error) {
          console.error('Error deleting activity:', error);
         
      }
  };
  

  return (
    <>
      <div className="bg-base-200 h-full w-full p-10 mt-16">
        <div className="flex items-center p-4 bg-[#1f2937]  rounded-lg shadow-md w-full">
          <div className="w-16 h-16 rounded-full ">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>

          </div>

          <div className="flex-1 ml-4">
            <h3 className="text-lg font-bold text-white">
              {contact && contact.firstName} {contact && contact.middleName} {contact && contact.lastName}
            </h3>
            <p className="text-white"> Role: {contact && contact.role}</p>

          </div>

        </div>
        <div className="flex flex-col gap-4  mt-4 md:flex-row w-full">
          <div className="p-4 bg-[#1f2937] rounded-lg shadow-md w-[25%] h-[415px] overflow-y-auto ">
            <div >
              <h2 className="text-lg font-semibold text-grey mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">Email:</span>
                  <span className="text-white">
                    {contact && contact.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">Phone:</span>
                  <span className="text-white">
                    {contact && contact.phone1}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">Address:</span>
                  <span className="text-white">
                    {contact && contact.streetAddress}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-white">Updated At:</span>
                  <span className="text-white">{new Date(contact.updatedAt).toLocaleString().slice(0, 9)}</span>
                </div>
              </div>
            </div>

            <hr className="my-4 border-white" />

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Other Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white">Company:</span>
                  <span className="text-white">{contact && contact.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Company Website:</span>
                  <span className="text-white">{contact && contact.companyWebsite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Industry:</span>
                  <span className="text-white">{contact && contact.industry}</span>
                </div>

              </div>
            </div>
          </div>
          <div className="p-4 bg-[#1f2937] rounded-lg shadow-md w-[75%] h-[415px] flex flex-col gap-5 overflow-y-auto">
            {/* Activity Form  */}
            <div className="join w-full ">
              <div className=' flex-1'>
                <div className=' w-full'>
                  <input className="input input-bordered join-item w-full" placeholder="Activity"
                  value={activityDesc}
                  onChange={(e) => setActivityDesc(e.target.value)} 
                   />
                </div>
              </div>
              <select className="select select-bordered join-item"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              >
                <option>Type</option>
                <option>Email</option>
                <option>Message</option>
                <option>Status</option>
              </select>
              <div className="indicator">
                <button className="btn join-item btn-primary" onClick={addActivity}>Add</button>
              </div>
            </div>

            {/* Activities */}
            {activityData && activityData.map((activity,index) =>{
              return(
                <div key={index} className="flex flex-col bg-[#6b71ebf9] w-full rounded-lg p-4 ">
                  <div className=' flex w-full justify-between items-center'>
                  <h1 className=' text-xl'>{activity.activityType} </h1>
                  <div className=' flex gap-4 items-center'>
                  <p>{new Date(activity.date).toLocaleString().slice(0, 9)}</p>
                  <button className=' bg-transparent'
                  onClick={() => deleteActivity(id,activity.id)}
                  >
                  <MdDelete className=' text-2xl' />
                  </button>
                  </div>
                  </div>
                <p>{activity.description}</p>
              </div>
  
                

              )
            })}


          </div>

        </div>

      </div>
    </>
  )
}

export default SingleContact