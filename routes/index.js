import express from 'express';
const router = express.Router();

import ngoRoutes from './ngoRoutes.js';
import announcementRoutes from './announcementRoutes.js';
import emergencyContactRoutes from './emergencyContactRoutes.js';
import authRoutes from './auth.js'; 
import adminRoutes from './admin.js'; 
// Use route modules
router.use('/api/ngos', ngoRoutes);
router.use('/api/announcements', announcementRoutes);
router.use('/api/emergency-contacts', emergencyContactRoutes);
router.use('/api/auth', authRoutes); 
router.use('/api/admin', adminRoutes); 

// Health check endpoint
router.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Refugee Services API is running',
    timestamp: new Date().toISOString()
  });
});

// Search endpoint across all content
router.get('/api/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchRegex = new RegExp(q, 'i');
    const results = {
      ngos: [],
      services: [],
      announcements: []
    };

    // Search NGOs
    const NGO = require('../models/NGO');
    const ngos = await NGO.find({
      isActive: true,
      $or: [
        { name: searchRegex },
        { description: searchRegex }
      ]
    });
    results.ngos = ngos;

    // Search Services within NGOs
    const allNGOs = await NGO.find({ isActive: true });
    allNGOs.forEach(ngo => {
      const matchingServices = ngo.services.filter(service => {
        const titleMatch = service.title.match(searchRegex);
        const descMatch = service.description.match(searchRegex);
        const categoryMatch = category ? service.category === category : true;
        return (titleMatch || descMatch) && categoryMatch && service.status === 'active';
      });

      matchingServices.forEach(service => {
        results.services.push({
          ...service.toObject(),
          ngo_name: ngo.name,
          ngo_color: ngo.color,
          ngo_id: ngo._id
        });
      });
    });

    // Search Announcements
    const Announcement = require('../models/Announcement');
    const announcements = await Announcement.find({
      isActive: true,
      $or: [
        { title: searchRegex },
        { content: searchRegex }
      ],
      ...(category && { category })
    }).populate('ngo_id', 'name color').sort({ createdAt: -1 });
    
    results.announcements = announcements;

    const totalResults = results.ngos.length + results.services.length + results.announcements.length;

    res.status(200).json({
      success: true,
      query: q,
      category: category || 'all',
      totalResults,
      results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
});

export default router;