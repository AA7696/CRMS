const Contact = require('../models/contactmodel.js'); // Import the Contact model

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { basicInfo, addressInfo, socialMediaLinks } = req.body;

        // Create a new contact
        const newContact = new Contact({
        
            basicInfo,
            addressInfo,
            socialMediaLinks,
        });

        // Save the contact to the database
        await newContact.save();

        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error: error.message });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        // Fetch all contacts from the database
        const contacts = await Contact.find({});

        // Return the contacts in the response
        res.status(200).json({ message: 'Contacts fetched successfully', contacts });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params; // Extract the contact ID from the request parameters

        // Find and delete the contact by ID
        const deletedContact = await Contact.findByIdAndDelete(id);

        // Check if the contact exists
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Return success response
        res.status(200).json({ message: 'Contact deleted successfully', contact: deletedContact });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error deleting contact', error: error.message });
    }
};

// Get a single contact
const getContact = async (req, res) => {
    try {
        const { id } = req.params; // Extract the contact ID from the request parameters

        // Find the contact by ID
        const contact = await Contact.findById(id);

        // Check if the contact exists
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Return the contact in the response
        res.status(200).json({ message: 'Contact fetched successfully', contact });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error fetching contact', error: error.message });
    }
};

// Edit a contact
const editContact = async (req, res) => {
    try {
        const { id } = req.params; // Extract the contact ID from the request parameters

        // Find the contact by ID
        const contact = await Contact.findById(id);

        // Check if the contact exists
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Update the contact
        const { basicInfo, addressInfo, socialMediaLinks } = req.body;
        contact.basicInfo = basicInfo;
        contact.addressInfo = addressInfo;
        contact.socialMediaLinks = socialMediaLinks;

        // Save the updated contact to the database
        await contact.save();

        // Return success response
        res.status(200).json({ message: 'Contact updated successfully', contact });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error updating contact', error: error.message });
    }
};

// Search Controller
// Search Controller
const searchContact = async (req, res) => {
    try {
        const { query } = req.query; // Extract the search query from the request query string

        // Create a regular expression to search for contacts that match the query
        const regex = new RegExp(query, 'i');

        // Search for contacts that match the query
        const contacts = await Contact.find({
            $or: [
                {'basicInfo.uploadFile':regex},
                {'basicInfo.firstName': regex},
                {'basicInfo.middleName': regex},
                {'basicInfo.lastName': regex},
                { 'basicInfo.email': regex },
                { 'basicInfo.phone1': regex },
                { 'basicInfo.phone2': regex },
                {'basicInfo.role': regex},
                {'basicInfo.companyName': regex},
            ],
        });

        // Return the search results
        res.status(200).json({ message: 'Contacts searched successfully', contacts });
    } catch (error) {
        res.status(500).json({ message: 'Error searching contact', error: error.message });
    }
};

const sortContact = async (req,res) =>{
    const { sortBy } = req.query;
    let sortOptions = {};

    if (sortBy === 'name') {
        sortOptions = { 'basicInfo.firstName': 1 }; 
    } else if (sortBy === 'date') {
        sortOptions = { createdAt: -1 }; 
    }

    try {
        const contacts = await Contact.find().sort(sortOptions);
        res.json({ contacts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts' });
    }
}

const addActivityToContact = async (req, res) => {
    const { id } = req.params; // Get the contact ID from the request parameters
    const { activityType, description } = req.body; // Get activity details from the request body

    try {
        // Find the contact by ID
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
         
        // Create a new activity object
        const newActivity = {
            activityType,
            description,
            date: new Date(), // Automatically set the current date
        };

        // Add the new activity to the contact's activities array
        contact.activities.push(newActivity);

        // Save the updated contact
        await contact.save();

        // Respond with the updated contact
        res.status(200).json({ message: 'Activity added successfully', contact });
    } catch (error) {
        console.error('Error adding activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params; // Get the contact ID from the request parameters
        const { activityId } = req.params; // Get the activity ID from the request parameters
         
        console.log(activityId);
        

        // Find the contact by ID
        const contact = await Contact.findById(id);
        console.log(contact);
        

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        
        

        // Find the activity by ID in the contact's activities array
        const activityIndex = contact.activities.findIndex(activity => activity._id.toString() === activityId);
        console.log(activityIndex);
        

        if (activityIndex === -1) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Remove the activity from the contact's activities array
        contact.activities.splice(activityIndex, 1);

        // Save the updated contact
        await contact.save();

        // Respond with the updated contact
        res.status(200).json({ message: 'Activity deleted successfully', contact });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {createContact, getAllContacts, deleteContact, editContact, getContact,searchContact, sortContact, addActivityToContact, deleteActivity}; // Export the functions