import React from "react";
import { useState } from "react";
import axios from "axios";

function AddContact() {
  const [formData, setFormData] = useState({
    basicInfo: {
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
    },
    addressInfo: {
      streetAddress: "",
      country: "",
      stateProvince: "",
      city: "",
      zipcode: "",
    },
    socialMediaLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      whatsApp: "",
      linkedin: "",
    },
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
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  };

     
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

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      // Send form data to backend
      const response = await axios.post(
        "http://localhost:3000/api/contacts/create",
        {
          basicInfo: formData.basicInfo,
          addressInfo: formData.addressInfo,
          socialMediaLinks: formData.socialMediaLinks,
        }
      );
      if (response.status === 201) {
        alert("Contact created successfully");
        // Clear form data
        setFormData({
          basicInfo: {
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
          },
          addressInfo: {
            streetAddress: "",
            country: "",
            stateProvince: "",
            city: "",
            zipcode: "",
          },
          socialMediaLinks: {
            facebook: "",
            instagram: "",
            twitter: "",
            whatsApp: "",
            linkedin: "",
          },
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
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Add Contact
        </label>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className=" menu min-h-full w-auto p-4 bg-[#1D232A] ">
            <div className="join join-vertical w-screen lg:w-[700px] p-6">
              {/* Basic Info */}
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">
                  Basic Info
                </div>
                <div className="collapse-content">
                  <div className="min-h-screen flex justify-center items-center">
                    <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                      {/* Upload Section */}
                      <div className="flex  items-center mb-6">
                        {/* SVG icon area with preview */}
                        <div className="w-24 h-24 rounded-lg flex justify-center items-center border border-dashed border-gray-500 hover:bg-red-500 mt-4">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Selected File Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
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
                          className=" ml-4 btn-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          {!file ? "Select File" : "Upload File"}{" "}
                          {/* Change button text based on file selection */}
                        </button>

                        {/* File Name/Path Display */}
                        {file && (
                          <p className="mt-2 text-sm text-gray-700">
                            {" "}
                            <span className="font-semibold text-white">{file.name}</span>
                          </p>
                        )}
                      </div>

                      <p className="text-gray-400 text-sm mb-6">
                        JPG, GIF, or PNG. Max size of 800K
                      </p>

                      {/* Form Fields */}
                      <form>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-400 text-sm">
                              First Name *
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.firstName}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "firstName")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Middle Name *
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.middleName}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "middleName")
                              }
                            />
                          </div>

                          <div>
                            <label className="text-gray-400 text-sm">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.lastName}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "lastName")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Email *
                            </label>
                            <input
                              type="email"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.email}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "email")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Company Name
                            </label>
                            <select
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.companyName}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "companyName")
                              }
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
                            <label className="text-gray-400 text-sm">
                              Company Website
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.companyWebsite}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "companyWebsite")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Phone 1 *
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              required
                              value={formData.basicInfo.phone1}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "phone1")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Phone 2
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.phone2}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "phone2")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Location
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.location}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "location")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Role
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.role}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "role")
                              }
                            />
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Industry Domain
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              value={formData.basicInfo.industry}
                              onChange={(e) =>
                                handleChange(e, "basicInfo", "industry")
                              }
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
                <div className="collapse-title text-xl font-medium">
                  Address Info
                </div>
                <div className="collapse-content">
                  <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    {/* Street Address */}
                    <div className="mb-4">
                      <label className="text-gray-400 text-sm">
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.addressInfo.streetAddress}
                        onChange={(e) =>
                          handleChange(e, "addressInfo", "streetAddress")
                        }
                      />
                    </div>

                    {/* Country and State/Province */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-gray-400 text-sm">Country</label>
                        <select
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          value={formData.addressInfo.country}
                          onChange={(e) =>
                            handleChange(e, "addressInfo", "country")
                          }
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
                        <label className="text-gray-400 text-sm">
                          State / Province
                        </label>
                        <select
                          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          value={formData.addressInfo.stateProvince}
                          onChange={(e) =>
                            handleChange(e, "addressInfo", "stateProvince")
                          }
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
                          onChange={(e) =>
                            handleChange(e, "addressInfo", "city")
                          }
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
                          onChange={(e) =>
                            handleChange(e, "addressInfo", "zipcode")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Social Media Link */}
              <div className="collapse collapse-arrow join-item border-base-300 border">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-xl font-medium">
                  Social Media Link
                </div>
                <div className="collapse-content">
                  <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <form>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm">
                            Facebook *
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            value={formData.socialMediaLinks.facebook}
                            onChange={(e) =>
                              handleChange(e, "socialMediaLinks", "facebook")
                            }
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">
                            Instagram *
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            value={formData.socialMediaLinks.instagram}
                            onChange={(e) =>
                              handleChange(e, "socialMediaLinks", "instagram")
                            }
                          />
                        </div>

                        <div>
                          <label className="text-gray-400 text-sm">
                            Twitter *
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            value={formData.socialMediaLinks.twitter}
                            onChange={(e) =>
                              handleChange(e, "socialMediaLinks", "twitter")
                            }
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">
                            Whats App
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            value={formData.socialMediaLinks.whatsApp}
                            onChange={(e) =>
                              handleChange(e, "socialMediaLinks", "whatsApp")
                            }
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">
                            Linkidin
                          </label>
                          <input
                            type="text"
                            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            value={formData.socialMediaLinks.linkedin}
                            onChange={(e) =>
                              handleChange(e, "socialMediaLinks", "linkedin")
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*  Button */}
              <div className="submit-btn  flex flex-row gap-6 justify-end">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="btn btn-error text-white font-bold py-2 px-4 rounded mt-5"
                >
                  Cancel
                </label>
                <button
                  className=" btn btn-primary text-white font-bold py-2 px-4 rounded mt-5"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddContact;
