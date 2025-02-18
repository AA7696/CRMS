import React from 'react'
import {useState} from 'react';

function EditLead(){

    const [formData, setFormData]= useState({
        lastName:'',


    })

return(
    <>
<form>
    <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm">Last Name *</label>
             <input
                type="text"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                value={formData.basicInfo.lastName}
                onChange={(e) => handleChange(e, 'basicInfo', 'lastName')}
            />
        </div>
        <div className="p-4">

      {/* Active Radio Button */}
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="status"
          value="Active"
          checked={selectedGender === "Male"}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-800">Active</span>
      </label>

      {/* Inactive Radio Button */}
      <label className="flex items-center">
        <input
          type="radio"
          name="status"
          value="Inactive"
          checked={selectedGender === "Female"}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-800">Inactive</span>
      </label>

      {/* Display Selected Gender */}
      <p className="mt-4 text-gray-700">
        Selected Gender: <strong>{selectedGender || "None"}</strong>
      </p>
    </div>
  




                                        
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Company Name</label>
                                                        <select
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.companyName}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'companyName')}
                                                        >
                                                            <option className="bg-gray-800" value="">
                                                                Choose
                                                            </option>
                                                            <option className="bg-gray-800" value="company1">
                                                                Company 1
                                                            </option>
                                                            <option className="bg-gray-800" value="company2">
                                                                Company 2
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Company Website</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.companyWebsite}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'companyWebsite')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Phone 1 *</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            required
                                                            value={formData.basicInfo.phone1}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'phone1')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Phone 2</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.phone2}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'phone2')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Location</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.location}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'location')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Role</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.role}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'role')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Industry Domain</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.industry}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'industry')}
                                                        />
                                                    </div>


                                                </div>
                                            </form>
    </>
    )
    };
export default EditLead;