import React from "react";
import { useState } from "react";
import axios from "axios";

function AddContact() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    phone1: "",
    phone2: "",
    location: "",
    role: "",
    industry: "",
    streetAddress: "",
    country: "",
    stateProvince: "",
    city: "",
    zipcode: "",
    facebook: "",
    instagram: "",
    twitter: "",
    whatsApp: "",
    linkedin: "",
    image: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
    }
  };

  const handleButtonClick = () => {
    document.getElementById("file-upload").click(); // Open file selection dialog
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    try {
      const ImageformData = new FormData();
      ImageformData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/api/contacts/upload",
        ImageformData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // Update the file preview

        setPreview(null);
        setFile(null);

        return response.data.url;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) {
        alert("Error uploadinf file");
        return;
      }
      // Send form data to backend
      const response = await axios.post(
        "http://localhost:3000/api/contacts/create",
        {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          phone1: formData.phone1,
          phone2: formData.phone2,
          location: formData.location,
          role: formData.role,
          industry: formData.industry,
          streetAddress: formData.streetAddress,
          country: formData.country,
          stateProvince: formData.stateProvince,
          city: formData.city,
          zipcode: formData.zipcode,
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          whatsApp: formData.whatsApp,
          linkedin: formData.linkedin,
          image: imageUrl,
        }
      );
      if (response.status === 201) {
        alert("Contact created successfully");
        // Clear form data
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          companyName: "",
          companyWebsite: "",
          phone1: "",
          phone2: "",
          location: "",
          role: "",
          industry: "",
          streetAddress: "",
          country: "",
          stateProvince: "",
          city: "",
          zipcode: "",
          facebook: "",
          instagram: "",
          twitter: "",
          whatsApp: "",
          linkedin: "",
          image: "",
        });
        window.location.reload();
      }

      // Handle error
      else {
        alert("Error creating contact");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="drawer w-[20%] drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <label
          htmlFor="my-drawer-4"
          onClick={() => setIsOpen(true)}
          className="drawer-button btn btn-primary bg-purple-900 border-purple-900 text-white hover:bg-purple-700 hover:border-purple-700"
        >
          Add Contact
        </label>

        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className=" menu bg-purple-200 min-h-full w-auto p-4 ">
            <div className="join join-vertical w-screen lg:w-[700px] p-6">
              {/* 🔵 Open Sidebar Button */}

              {isOpen && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    document.getElementById("my-drawer-4").checked = false; // Uncheck the drawer
                  }}
                  className="absolute  top-1 right-4 p-1 text-black bg-purple-200 hover:border-purple-900 hover:border-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=" w-5 h-5 text-black hover:text-black transition"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}

              {/* Basic Info */}
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-black text-xl font-medium">
                  Basic Info
                </div>
                <div className="collapse-content">
                  <div className="min-h-screen flex justify-center items-center">
                    <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                      {/* Upload Section */}
                      <div className="flex  items-center mb-6">
                        {/* SVG icon area with preview */}
                        <div className="w-24 h-24 rounded-lg flex justify-center items-center bg-purple-100 border border-dashed border-gray-900 hover:bg-purple-400 mt-4">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Selected File Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 "
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
                          )}
                        </div>

                        {/* Hidden file input */}
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {/* Button triggers file selection or upload */}
                        <button
                          onClick={handleButtonClick}
                          className=" ml-4 btn-primary bg-lime-700 border-lime-700  text-white px-4 py-2 rounded-lg hover:bg-lime-600 hover:boder-lime-600"
                        >
                          {!file ? "Select File" : "Upload File"}{" "}
                          {/* Change button text based on file selection */}
                        </button>

                        {/* File Name/Path Display */}
                        {file && (
                          <p className="mt-2 text-sm text-gray-700">
                            {" "}
                            <span className="font-semibold text-gray-500">
                              {file.name}
                            </span>
                          </p>
                        )}
                      </div>

                      <p className="text-gray-500 text-sm mb-6">
                        JPG, GIF, or PNG. Max size of 800K
                      </p>

                      {/* Form Fields */}
                      <form>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.firstName}
                              placeholder="First name"
                              onChange={(e) => handleChange(e, "firstName")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.middleName}
                              placeholder="Middle name"
                              onChange={(e) => handleChange(e, "middleName")}
                            />
                          </div>

                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.lastName}
                              placeholder="Last name"
                              onChange={(e) => handleChange(e, "lastName")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="email"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.email}
                              placeholder="Email id"
                              onChange={(e) => handleChange(e, "email")}
                            />
                          </div>
                          <div className="m-2">
                            <select
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.companyName}
                              placeholder="Company name"
                              onChange={(e) => handleChange(e, "companyName")}
                            >
                              <option className="bg-white" value="">
                                Company name
                              </option>
                              <option className="bg-white" value="company1">
                                Company 1
                              </option>
                              <option className="bg-white" value="company2">
                                Company 2
                              </option>
                            </select>
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.companyWebsite}
                              placeholder="Company website"
                              onChange={(e) =>
                                handleChange(e, "companyWebsite")
                              }
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              required
                              value={formData.phone1}
                              placeholder="Phone number1"
                              onChange={(e) => handleChange(e, "phone1")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.phone2}
                              placeholder="Phone number2"
                              onChange={(e) => handleChange(e, "phone2")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.location}
                              placeholder="Location"
                              onChange={(e) => handleChange(e, "location")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.role}
                              placeholder="Role"
                              onChange={(e) => handleChange(e, "role")}
                            />
                          </div>
                          <div className="m-2">
                            <input
                              type="text"
                              className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.industry}
                              placeholder="Industry domain"
                              onChange={(e) => handleChange(e, "industry")}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Address Info 
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-balck text-xl font-medium">
                  Address Info
                </div>
                <div className="collapse-content">
                  <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    {/* Street Address */}
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={formData.streetAddress}
                  placeholder="Street address"
                  onChange={(e) => handleChange(e, "streetAddress")}
                />
              </div>

              {/* Country and State/Province */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="m-2">
                  <select
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.country}
                    placeholder="Country"
                    onChange={(e) => handleChange(e, "country")}
                  >
                    <option className="bg-gray-800" value="">
                      Country
                    </option>
                    <option className="bg-gray-800" value="USA">
                      USA
                    </option>
                    <option className="bg-gray-800" value="Canada">
                      Canada
                    </option>
                  </select>
                </div>
                <div className="m-2">
                  <select
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.stateProvince}
                    placeholder="State / province"
                    onChange={(e) => handleChange(e, "stateProvince")}
                  >
                    <option className="bg-gray-800" value="">
                      State
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
                <div className="m-2">
                  <select
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.city}
                    placeholder="City"
                    onChange={(e) => handleChange(e, "city")}
                  >
                    <option className="bg-white" value="">
                      City
                    </option>
                    <option className="bg-white" value="Los Angeles">
                      Los Angeles
                    </option>
                    <option className="bg-white" value="Toronto">
                      Toronto
                    </option>
                  </select>
                </div>
                <div className="m-2">
                  <input
                    type="text"
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.zipcode}
                    placeholder="Zip code"
                    onChange={(e) => handleChange(e, "zipcode")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Social Media Link */}
        {/* <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-black text-xl font-medium">
            Social Media Link
          </div>
          <div className="collapse-content">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.facebook}
                      placeholder="Facebook"
                      onChange={(e) => handleChange(e, "facebook")}
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.instagram}
                      placeholder="Instagram"
                      onChange={(e) => handleChange(e, "instagram")}
                    />
                  </div>

                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.twitter}
                      placeholder="Twitter"
                      onChange={(e) => handleChange(e, "twitter")}
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.whatsApp}
                      placeholder="WhatsApp"
                      onChange={(e) => handleChange(e, "whatsApp")}
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.linkedin}
                      placeholder="CoLinkedinuntry"
                      onChange={(e) => handleChange(e, "linkedin")}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="submit-btn  flex flex-row gap-6 justify-end">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="btn btn-error bg-red-700 border-red-700 hover:bg-red-600 hover:border-red-600 text-white font-bold py-2 px-4 rounded mt-5"
          >
            Cancel
          </label>
          <button
            className=" btn btn-primary bg-lime-700 border-lime-700  hover:bg-lime-600 hover:border-lime-600 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div> */}
      </div>
    </>
  );
}

export default AddContact;