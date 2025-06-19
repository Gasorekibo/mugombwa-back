import Announcement from '../models/Announcement.js';
import NGO from '../models/NGO.js';

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const announcements = await Announcement.find({ isActive: true })
      .populate('ngo_id', 'name color')
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Announcement.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      count: announcements.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements',
      error: error.message
    });
  }
};

// Get announcements by priority
const getAnnouncementsByPriority = async (req, res) => {
  try {
    const { priority } = req.params;
    const announcements = await Announcement.find({ 
      priority, 
      isActive: true 
    })
    .populate('ngo_id', 'name color')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      priority,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements by priority',
      error: error.message
    });
  }
};

// Get announcements by NGO
const getAnnouncementsByNGO = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const announcements = await Announcement.find({ 
      ngo_id: ngoId, 
      isActive: true 
    })
    .populate('ngo_id', 'name color')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ngo_id: ngoId,
      count: announcements.length,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching announcements by NGO',
      error: error.message
    });
  }
};

// Create new announcement
const createAnnouncement = async (req, res) => {
  try {
    // Validate NGO exists
    const ngo = await NGO.findById(req.body.ngo_id);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        message: 'NGO not found'
      });
    }

    // Add NGO details to announcement
    const announcementData = {
      ...req.body,
      ngo_name: ngo.name,
      ngo_color: ngo.color
    };

    const announcement = new Announcement(announcementData);
    const savedAnnouncement = await announcement.save();

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: savedAnnouncement
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating announcement',
      error: error.message
    });
  }
};

// Update announcement
const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('ngo_id', 'name color');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: announcement
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating announcement',
      error: error.message
    });
  }
};

// Delete announcement (soft delete)
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting announcement',
      error: error.message
    });
  }
};

export{
  getAllAnnouncements,
  getAnnouncementsByPriority,
  getAnnouncementsByNGO,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};