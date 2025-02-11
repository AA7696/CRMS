const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityType: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true, default: Date.now },
});


const contactSchema = new mongoose.Schema({
    basicInfo: {
        firstName: { type: String, required: true },
        middleName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        companyName: { type: String, required: false },
        companyWebsite: { type: String, required: false },
        phone1: { type: String, required: true },
        phone2: { type: String, required: false },
        location: { type: String, required: false },
        role: { type: String, required: false },
        industry: { type: String, required: false },
    },
    addressInfo: {
        streetAddress: { type: String, required: false },
        country: { type: String, required: false },
        stateProvince: { type: String, required: false },
        city: { type: String, required: false },
        zipcode: { type: String, required: false },
    },
    socialMediaLinks: {
        facebook: { type: String, required: false },
        instagram: { type: String, required: false },
        twitter: { type: String, required: false },
        whatsApp: { type: String, required: false },
        linkedin: { type: String, required: false },
    },
    activities: [activitySchema],
    
},{timestamps: true});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;