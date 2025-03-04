import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditContact() {
  const { id } = useParams();

  const navigate = useNavigate();
  // const[isOpen, setIsOpen]=useState(false);
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
        console.log("file uploaded");

        setPreview(null);
        setFile(null);
        console.log(response.data.url);

        return response.data.url;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const getContactData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/contacts/get/${id}`
        );
        const contactData = response.data.contact;

        setFormData({
          firstName: contactData.firstName,
          middleName: contactData.middleName,
          lastName: contactData.lastName,
          email: contactData.email,
          companyName: contactData.companyName || "",
          companyWebsite: contactData.companyWebsite,
          phone1: contactData.phone1,
          phone2: contactData.phone2,
          location: contactData.location,
          role: contactData.role,
          industry: contactData.industry,
          streetAddress: contactData.streetAddress,
          country: contactData.country || "",
          stateProvince: contactData.stateProvince || "",
          city: contactData.city || "",
          zipcode: contactData.zipcode,
          facebook: contactData.facebook,
          instagram: contactData.instagram,
          twitter: contactData.twitter,
          whatsApp: contactData.whatsApp,
          linkedin: contactData.linkedin,
          image: contactData.image || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    getContactData();
  }, [id]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  // image set

  const handleSave = async (c_id) => {
    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) {
        alert("Error uploadinf file");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/contacts/edit/${c_id}`,
        {
          ...formData,
          image: imageUrl,
        }
      );
      alert("Contact updated successfully!");

      navigate(`/homelayout/contacts`);
    } catch (error) {
      console.error(error);
      alert("Error updating contact!");
    }
  };

  return (
    <>
      <div className="m-2"></div>
      <div className=" bg-purple-200 join join-vertical w-screen md:w-[700px] p-6 ">
        {/* Basic Info */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title mt-[30px] text-xl text-black font-medium">
            Basic Info
          </div>
          <div className="collapse-content ">
            <div className=" flex justify-center items-center ">
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
                      <img
                        src={formData.image}
                        alt="Selected File Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
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
                    className=" ml-4 btn-primary bg-lime-700 border-lime-700 text-white px-4 py-2 rounded-lg hover:bg-lime-600 hover:border-lime-600"
                  >
                    {!file ? "Select File" : "Upload File"}{" "}
                    {/* Change button text based on file selection */}
                  </button>

                  {/* File Name/Path Display */}
                  {file && (
                    <p className="mt-2 text-sm text-gray-700">
                      {" "}
                      <span className="font-semibold">{file.name}</span>
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
                        value={formData.firstName || ""}
                        onChange={(e) => handleChange(e, "firstName")}
                        placeholder="First name"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.middleName || ""}
                        onChange={(e) => handleChange(e, "middleName")}
                        placeholder="Middle name"
                      />
                    </div>

                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.lastName || ""}
                        onChange={(e) => handleChange(e, "lastName")}
                        placeholder="Last name"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="email"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.email || ""}
                        onChange={(e) => handleChange(e, "email")}
                        placeholder="Email id"
                      />
                    </div>
                    <div className="m-2">
                      <select
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.companyName || ""}
                        placeholder="Company name"
                        onChange={(e) => handleChange(e, "companyName")}
                      >
                        <option className="bg-gray-100" value="">
                        Company name
                        </option>
                        <option className="bg-gray-100" value="company1">
                          Company 1
                        </option>
                        <option className="bg-gray-100" value="company2">
                          Company 2
                        </option>
                      </select>
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.companyWebsite || ""}
                        onChange={(e) => handleChange(e, "companyWebsite")}
                        placeholder="Company website"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        required
                        value={formData.phone1 || ""}
                        onChange={(e) => handleChange(e, "phone1")}
                        placeholder="Phone number1"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.phone2 || ""}
                        onChange={(e) => handleChange(e, "phone2")}
                        placeholder="Phone number2"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.location || ""}
                        onChange={(e) => handleChange(e, "location")}
                        placeholder="Location"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.role || ""}
                        onChange={(e) => handleChange(e, "role")}
                        placeholder="Role"
                      />
                    </div>
                    <div className="m-2">
                      <input
                        type="text"
                        className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        value={formData.industry || ""}
                        onChange={(e) => handleChange(e, "industry")}
                        placeholder="Industry domain"
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
          <div className="collapse-title text-xl  text-black font-medium">
            Address Info
          </div>
          <div className="collapse-content">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-2xl">
              {/* Street Address */}
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  value={formData.streetAddress || ""}
                  onChange={(e) => handleChange(e, "streetAddress")}
                  placeholder="Street address"
                />
              </div>

              {/* Country and State/Province */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="m-2">
                  <select
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.country || ""}
                    onChange={(e) => handleChange(e, "country")}
                    placeholder="Country"
                  >
                    <option className="bg-gray-100" value="">
                    Country
                    </option>
                    <option className="bg-gray-100" value="USA">
                      USA
                    </option>
                    <option className="bg-gray-100" value="Canada">
                      Canada
                    </option>
                  </select>
                </div>
                <div className="m-2">
                  <select
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.stateProvince || ""}
                    onChange={(e) => handleChange(e, "stateProvince")}
                    placeholder="State / province"
                  >
                    <option className="bg-gray-100" value="">
                    State / province
                    </option>
                    <option className="bg-gray-100" value="California">
                      California
                    </option>
                    <option className="bg-gray-100" value="Ontario">
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
                    value={formData.city || ""}
                    onChange={(e) => handleChange(e, "city")}
                    placeholder="City"
                  >
                    <option className="bg-gray-100" value="">
                    City
                    </option>
                    <option className="bg-gray-100" value="Los Angeles">
                      Los Angeles
                    </option>
                    <option className="bg-gray-100" value="Toronto">
                      Toronto
                    </option>
                  </select>
                </div>
                <div className="m-2">
                  <input
                    type="text"
                    className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    value={formData.zipcode || ""}
                    onChange={(e) => handleChange(e, "zipcode")}
                    placeholder="Zip code"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Social Media Link */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl text-black font-medium">
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
                      value={formData.facebook || ""}
                      onChange={(e) => handleChange(e, "facebook")}
                      placeholder="Facebook"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.instagram || ""}
                      onChange={(e) => handleChange(e, "instagram")}
                      placeholder="Instagram"
                    />
                  </div>

                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.twitter || ""}
                      onChange={(e) => handleChange(e, "twitter")}
                      placeholder="Twitter"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.whatsApp || ""}
                      onChange={(e) => handleChange(e, "whatsApp")}
                      placeholder="WhatsApp"
                    />
                  </div>
                  <div className="m-2">
                    <input
                      type="text"
                      className="w-full bg-white text-gray px-4 py-2 rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      value={formData.linkedin || ""}
                      onChange={(e) => handleChange(e, "linkedin")}
                      placeholder="Linkedin"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/*  Button */}
        <div className="submit-btn  flex flex-row gap-6 justify-end">
          <button
            className=" btn btn-primary bg-purple-900 border-purple-900 text-white font-bold py-2 px-4 rounded mt-5 hover:bg-purple-700 hover:border-purple-700"
            onClick={() => {
              handleSave(id);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default EditContact;