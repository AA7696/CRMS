import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaEye, FaUserCircle } from "react-icons/fa";

function ContactList({ contacts, setContacts }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/contacts/getall"
        );
        setContacts(response.data.contacts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };
  const handleDelete = async () => {
    if (!selectedContact) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/contacts/delete/${selectedContact.id}`
      );
      setContacts(contacts.filter((c) => c.id !== selectedContact.id)); // Remove from state
      setShowModal(false);
      //alert("Contact deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting contact");
    }
  };
  return (
    <>
      <div className="bg-base-100 p-4 shadow-md flex flex-row justify-between h-[350px] w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="overflow-x-auto w-full">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
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
                {contacts &&
                  contacts.map((contact) => (
                    <tr key={contact.id}>
                      <th>
                        <div className="relative">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn"
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === contact.id ? null : contact.id
                              )
                            }
                          >
                            <BsThreeDotsVertical className="text-lg" />
                          </div>
                          {openDropdown === contact.id && (
                            <ul className="absolute left-0 top-8 menu bg-base-100 rounded-box z-50 w-12 shadow">
                              <li className="w-full">
                                <Link
                                  className="bg-transparent p-2 w-full align-center justify-center hover:border-none"
                                  onClick={() => openDeleteModal(contact)}
                                >
                                  <FaTrash size={15} />
                                </Link>
                              </li>
                              <li className="w-full">
                                <Link
                                  className="text-black w-full align-center justify-center"
                                  to={`/homelayout/editContact/${contact.id}`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <FaEdit size={15} />
                                </Link>
                              </li>
                              <li className="w-full">
                                <Link
                                  className="text-black w-full align-center justify-center"
                                  to={`/homelayout/contacts/${contact.id}`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  <FaEye size={15} />
                                </Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 flex items-center justify-center bg-gray-200">
                              {contact.image ? (
                                <img
                                  src={contact.image}
                                  alt="User Avatar"
                                  className="object-cover h-full w-full"
                                />
                              ) : (
                                <FaUserCircle className="text-gray-500 text-3xl h-12 w-12" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {contact.firstName} {contact.middleName}{" "}
                              {contact.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{contact.email}</td>
                      <td>{contact.companyName}</td>
                      <td>{contact.role}</td>
                      <td>{contact.phone1}</td>
                      <td>{contact.industry}</td>
                      <td>{contact.location}</td>
                      <td>
                        {new Date(contact.createdAt)
                          .toLocaleString()
                          .slice(0, 8)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50">
          <div className="bg-white p-14 justify-center   rounded-lg shadow-md">
            <h4 className="dark:text-black text-center">Remove Contacts?</h4>
            <p className=" dark:text-black  text-center text-xs">
              Are you sure you want to delete{" "}
              <strong>{selectedContact?.firstName}</strong>?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className=" dark:text-black px-4 py-2 bg-gray-300 rounded-md mr-2 hover:bg-gray-200 hover:border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-700 hover:border-purple-700"
              >
                Yes, Delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactList;