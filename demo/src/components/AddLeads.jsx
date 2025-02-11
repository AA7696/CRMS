import React from 'react'

function AddLeads() {
    return (
        <>
            <div className="drawer w-[20%] drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Add Leads</label>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className=" menu min-h-full  w-screen lg:w-[700px] p-4 bg-[#1D232A]  ">
                        <h2 className="text-2xl text-white">Add Leads</h2>
                        <form className=' mt-5'>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-sm">Lead Name *</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm">Contact Name</label>
                                    <select
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    >
                                        <option className="bg-gray-800" value="">
                                            Choose
                                        </option>
                                        <option className="bg-gray-800" value="company1">
                                            Contact 1
                                        </option>
                                        <option className="bg-gray-800" value="company2">
                                            Contact 2
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm">User Name</label>
                                    <select
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    >
                                        <option className="bg-gray-800" value="">
                                            Choose
                                        </option>
                                        <option className="bg-gray-800" value="company1">
                                            User 1
                                        </option>
                                        <option className="bg-gray-800" value="company2">
                                            User 2
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm">Status</label>
                                    <select
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    >
                                        <option className="bg-gray-800" value="">
                                            Choose
                                        </option>
                                        <option className="bg-gray-800" value="company1">
                                            Active
                                        </option>
                                        <option className="bg-gray-800" value="company2">
                                            Not Active                                        </option>
                                    </select>
                                </div>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text text-white">Description</span>
                                    </div>
                                    <textarea className="textarea textarea-bordered h-24   text-white"></textarea>
                                </label>
                                



                            </div>
                        </form>

                        <div className="submit-btn  flex flex-row gap-6 justify-end">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="btn btn-error text-white font-bold py-2 px-4 rounded mt-5">Cancel</label>
                            <button className=" btn btn-primary text-white font-bold py-2 px-4 rounded mt-5">Submit</button>

                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default AddLeads