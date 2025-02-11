import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        basicInfo: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            companyName: '',
            companyWebsite: '',
            phone1: '',
            phone2: '',
            location: '',
            role: '',
            industry: '',
        },
        addressInfo: {
            streetAddress: '',
            country: '',
            stateProvince: '',
            city: '',
            zipcode: '',
        },
        socialMediaLinks: {
            facebook: '',
            instagram: '',
            twitter: '',
            whatsApp: '',
            linkedin: '',
        },
    });
    
    useEffect(() => {
        const getContactData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/contacts/get/${id}`);
                const contactData = response.data.contact;
                
                setFormData({
                    basicInfo: {
                        firstName: contactData.basicInfo.firstName,
                        middleName: contactData.basicInfo.middleName,
                        lastName: contactData.basicInfo.lastName,
                        email: contactData.basicInfo.email,
                        companyName: contactData.basicInfo.companyName,
                        companyWebsite: contactData.basicInfo.companyWebsite,
                        phone1: contactData.basicInfo.phone1,
                        phone2: contactData.basicInfo.phone2,
                        location: contactData.basicInfo.location,
                        role: contactData.basicInfo.role,
                        industry: contactData.basicInfo.industry,
                    },
                    addressInfo: {
                        streetAddress: contactData.addressInfo.streetAddress,
                        country: contactData.addressInfo.country,
                        stateProvince: contactData.addressInfo.stateProvince,
                        city: contactData.addressInfo.city,
                        zipcode: contactData.addressInfo.zipcode,
                    },
                    socialMediaLinks: {
                        facebook: contactData.socialMediaLinks.facebook,
                        instagram: contactData.socialMediaLinks.instagram,
                        twitter: contactData.socialMediaLinks.twitter,
                        whatsApp: contactData.socialMediaLinks.whatsApp,
                        linkedin: contactData.socialMediaLinks.linkedin,
                    },
                });
            } catch (error) {
                console.error(error);
            }
        };
        getContactData();
    }, [id]);

    const handleChange = (e, section, field) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [field]: value,
            },
        });
    };

    const handleSave = async (c_id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/contacts/edit/${c_id}`, formData);
            alert('Contact updated successfully!');
            
            navigate(`/homelayout/contacts`);
        } catch (error) {
            console.error(error);
            alert('Error updating contact!');
        }
    };

  return (
    <>
    <div>
        
    </div>
        <div className="join join-vertical w-screen md:w-[700px] p-6 ">
                            {/* Basic Info */}
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">Basic Info</div>
                                <div className="collapse-content">
                                    <div className="min-h-screen flex justify-center items-center">
                                        <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                                            {/* Upload Section */}
                                            <div className="flex items-center mb-6">
                                                <div className="w-24 h-24 rounded-lg flex justify-center items-center border border-dashed border-gray-500">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-8 w-8 text-gray-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 16l4-4m0 0l4-4m-4 4h12m-6 4v8m0 0h4m-4 0H7"
                                                        />
                                                    </svg>
                                                </div>
                                                <button className="ml-4 btn-primary text-white px-4 py-2 rounded-lg">
                                                    Upload File
                                                </button>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-6">JPG, GIF, or PNG. Max size of 800K</p>

                                            {/* Form Fields */}
                                            <form>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-gray-400 text-sm">First Name *</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.firstName}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'firstName')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Middle Name *</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.middleName}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'middleName')}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="text-gray-400 text-sm">Last Name *</label>
                                                        <input
                                                            type="text"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.lastName}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'lastName')}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-gray-400 text-sm">Email *</label>
                                                        <input
                                                            type="email"
                                                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                            value={formData.basicInfo.email}
                                                            onChange={(e) => handleChange(e, 'basicInfo', 'email')}
                                                        />
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
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Address Info */}
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">Address Info</div>
                                <div className="collapse-content">
                                    <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                                        {/* Street Address */}
                                        <div className="mb-4">
                                            <label className="text-gray-400 text-sm">Street Address</label>
                                            <input
                                                type="text"
                                                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                value={formData.addressInfo.streetAddress}
                                                onChange={(e) => handleChange(e, 'addressInfo', 'streetAddress')}
                                            />
                                        </div>

                                        {/* Country and State/Province */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="text-gray-400 text-sm">Country</label>
                                                <select
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                    value={formData.addressInfo.country}
                                                    onChange={(e) => handleChange(e, 'addressInfo', 'country')}
                                                >
                                                    <option className="bg-gray-800" value="">
                                                        Choose
                                                    </option>
                                                    <option className="bg-gray-800" value="USA">
                                                        USA
                                                    </option>
                                                    <option className="bg-gray-800" value="Canada">
                                                        Canada
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm">State / Province</label>
                                                <select
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                    value={formData.addressInfo.stateProvince}
                                                    onChange={(e) => handleChange(e, 'addressInfo', 'stateProvince')}
                                                >
                                                    <option className="bg-gray-800" value="">
                                                        Choose
                                                    </option>
                                                    <option className="bg-gray-800" value="California">
                                                        California
                                                    </option>
                                                    <option className="bg-gray-800" value="Ontario">
                                                        Ontario
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* City and Zipcode */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-gray-400 text-sm">City</label>
                                                <select
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                    value={formData.addressInfo.city}
                                                    onChange={(e) => handleChange(e, 'addressInfo', 'city')}
                                                >
                                                    <option className="bg-gray-800" value="">
                                                        Choose
                                                    </option>
                                                    <option className="bg-gray-800" value="Los Angeles">
                                                        Los Angeles
                                                    </option>
                                                    <option className="bg-gray-800" value="Toronto">
                                                        Toronto
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm">Zipcode</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                    value={formData.addressInfo.zipcode}
                                                    onChange={(e) => handleChange(e, 'addressInfo', 'zipcode')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Social Media Link */}
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">Social Media Link</div>
                                <div className="collapse-content">
                                    <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                                        <form>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-gray-400 text-sm">Facebook *</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                        value={formData.socialMediaLinks.facebook}
                                                        onChange={(e) => handleChange(e, 'socialMediaLinks', 'facebook')}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-400 text-sm">Instagram *</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                        value={formData.socialMediaLinks.instagram}
                                                        onChange={(e) => handleChange(e, 'socialMediaLinks', 'instagram')}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-gray-400 text-sm">Twitter *</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                        value={formData.socialMediaLinks.twitter}
                                                        onChange={(e) => handleChange(e, 'socialMediaLinks', 'twitter')}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-400 text-sm">Whats App</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                        value={formData.socialMediaLinks.whatsApp}
                                                        onChange={(e) => handleChange(e, 'socialMediaLinks', 'whatsApp')}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-gray-400 text-sm">Linkidin</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                                        value={formData.socialMediaLinks.linkedin}
                                                        onChange={(e) => handleChange(e, 'socialMediaLinks', 'linkedin')}
                                                    />
                                                </div>

                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            {/*  Button */}
                            <div className="submit-btn  flex flex-row gap-6 justify-end">
                                <button className=" btn btn-primary text-white font-bold py-2 px-4 rounded mt-5" onClick={() => {handleSave(id)}}>Save</button>

                            </div>
                        </div>

    </>
  )
}

export default EditContact