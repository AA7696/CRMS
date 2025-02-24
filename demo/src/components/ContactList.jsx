import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';

function ContactList({contacts, setContacts}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all contacts
        const fetchContacts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/api/contacts/getall');
                setContacts(response.data.contacts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handelDelete = async (id) =>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/contacts/delete/${id}`);
            console.log(response.data);
            alert("Contact deleted successfully")
            window.location.reload()
        } catch (error) {
            console.log(error);
            alert("Error deleting contact")
        }
    }

    return (
        <>
            <div className="bg-base-100 p-4  shadow-md flex flex-row justify-between h-[350px] w-full">
                <div className="flex flex-col gap-2 w-full">
                    <div className="overflow-x-auto  w-full">
                        <table className="table">
                            {/* Rememer to add pagination in this page */}
                            {/* Headers of the Table */}
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Role</th>
                                    <th>Phone No</th>
                                    <th>Industry</th>
                                    <th>Location</th>
                                    <th>Created At</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {contacts.map((contact) =>{
                                    return(
                                        <tr key={contact.id}>
                                        <th>
                                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn">
                            <BsThreeDotsVertical className=' text-lg' />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li className=' w-full px-4'><button className=' bg-transparent  w-full hover:border-none' onClick={() => {handelDelete(contact.id)}}>Delete</button></li>
                                <li className=' w-full px-4'><Link className='  text-black w-full hover:border-none ' to={`/homelayout/editContact/${contact.id}`}>Edit</Link>
                                </li>
                                <li className=' w-full px-4'><Link className=' text-black w-full hover:border-none' to={`/homelayout/contacts/${contact.id}`}>View</Link></li>
                            </ul>
                        </div>

                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {contact.firstName} {contact.middleName} {contact.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {contact.email}
                                        </td>
                                        <td>
                                            {contact.companyName}
                                        </td>
                                        <td>
                                            {contact.role}
                                        </td>
                                        <td>
                                            {contact.phone1}
                                        </td>
                                        <td>
                                            {contact.industry}
                                        </td>
                                        <td>
                                            {contact.location}

                                        </td>
                                        <td>
                                            {new Date(contact.createdAt).toLocaleString().slice(0, 8)}

                                        </td>
    
                                    </tr>
    
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ContactList