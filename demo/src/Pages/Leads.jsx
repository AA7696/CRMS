import React from 'react'
import AddLeads from '../components/AddLeads'
import LeadList from '../components/LeadList'


function Leads() {
  return (
    <>
                <div className="bg-base-200 h-full w-full p-6 mt-5   ">
                <h1 className=' text-3xl mt-8'>Leads</h1>
                <div className="grid grid-cols-1 mt-4 divide-y divide-slate-700 w-full ">
                    
                {/* Top Pannel */}
                    <div className="bg-base-100 p-4  shadow-md flex flex-row justify-between w-full ">
                        <label className="input input-bordered flex items-center gap-2 w-[25%]">
                            <input type="text" className="grow" placeholder="Search" />
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
                        </label>
                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-primary  m-1">Sort</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>

                        <div className="dropdown ">
                            <div tabIndex={0} role="button" className="btn btn-primary  m-1">Filters</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>

                        {/* Add Leads */}
                        <AddLeads />

                    </div>

                    {/* Leads list */}
                    <LeadList />
                </div>

            </div>

    </>
  )
}

export default Leads