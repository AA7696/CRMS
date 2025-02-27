const express = require('express')
const contactrouter = express.Router()



const {createContact,getAllContacts,deleteContact, editContact, getContact,searchContact, sortContact, addActivityToContact, deleteActivity} = require('../controllers/contactController.js')

contactrouter.post('/create', createContact)
contactrouter.get('/getall', getAllContacts)
contactrouter.delete('/delete/:id', deleteContact)
contactrouter.get('/get/:id', getContact)
contactrouter.put('/edit/:id', editContact)
contactrouter.get('/search', searchContact)
contactrouter.get('/sort', sortContact)
contactrouter.post('/:id/activity', addActivityToContact)
contactrouter.delete('/:id/activity/del/:activityId', deleteActivity)
module.exports = contactrouter

