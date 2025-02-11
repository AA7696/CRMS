import React, { useEffect } from 'react'
import { useState } from 'react'
import ContactList from '../components/ContactList'
import AddContact from '../components/AddContact'
import axios from 'axios'

function Contact() {
        const [contacts, setContacts] = useState([]);
        const [search, setSearch] = useState("");
        const [sortOption, setSortOption] = useState('')
    

    const handleSearch = async () =>{
        try {
            const searchQuery = search;
            const response = await axios.get(`http://localhost:3000/api/contacts/search?query=${searchQuery}`);
            // setSearchContact(response.contacts);
            // console.log(response.contacts);
            
            setContacts(response.data.contacts);
          } catch (error) {
            console.error(error);
          }
    }

    const sortContacts = async () => {
        try {
            const sortQuery = sortOption;
            const response = await axios.get(`http://localhost:3000/api/contacts/sort?sortBy=${sortQuery}`)
            // console.log(response.data);
            
            setContacts(response.data.contacts);
            
        } catch (error) {
            console.error(error);
            
        }
    };
     
    useEffect(() =>{
        sortContacts();

    },[sortOption])

    return (
        <>
            <div className="bg-base-200 h-full w-full p-6 mt-16   ">
                <h1 className=' text-3xl mt-8'>Contacts</h1>
                <div className="grid grid-cols-1 mt-4 divide-y divide-slate-700 w-[95%] ">
                    
                {/* Top Pannel */}
                    <div className="bg-base-100 p-4  shadow-md flex flex-row justify-between w-full ">
                        <label className="input input-bordered flex items-center  w-[30%]">
                            <input type="text" className="grow" placeholder="Search" 
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className=' bg-transparent border-none' onClick={handleSearch} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>

                            </button>
                        </label>
                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-primary  m-1">Sort</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a  onClick={() => {setSortOption('name')}}>Name</a></li>
                                <li><a  onClick={() => {setSortOption('date')}}>Date</a></li>
                            </ul>
                        </div>

                        {/* <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-primary  m-1">Filters</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
 */}

                        <AddContact />
                    </div>

                    {/* Contact list */}
                    <ContactList contacts={contacts} setContacts={setContacts} />
                </div>

            </div>

        </>
    )
}

export default Contact