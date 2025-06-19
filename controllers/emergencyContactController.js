import EmergencyContact from '../models/EmergencyContact.js';
// Get all emergency contacts
const getAllEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ isActive: true })
      .sort({ available_24_7: -1, type: 1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching emergency contacts',
      error: error.message
    });
  }
};

// Get emergency contacts by type
const getEmergencyContactsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const contacts = await EmergencyContact.find({ 
      type, 
      isActive: true 
    }).sort({ available_24_7: -1 });

    res.status(200).json({
      success: true,
      type,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching emergency contacts by type',
      error: error.message
    });
  }
};

// Get 24/7 available contacts
const get24HourContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ 
      available_24_7: true, 
      isActive: true 
    }).sort({ type: 1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching 24/7 emergency contacts',
      error: error.message
    });
  }
};

// Create new emergency contact
const createEmergencyContact = async (req, res) => {
  try {
    const contact = new EmergencyContact(req.body);
    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Emergency contact created successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating emergency contact',
      error: error.message
    });
  }
};

// Update emergency contact
const updateEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency contact updated successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating emergency contact',
      error: error.message
    });
  }
};

// Delete emergency contact (soft delete)
const deleteEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Emergency contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting emergency contact',
      error: error.message
    });
  }
};

export {
  getAllEmergencyContacts,
  getEmergencyContactsByType,
  get24HourContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
};