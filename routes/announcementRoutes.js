import {
  getAllAnnouncements,
  getAnnouncementsByPriority,
  getAnnouncementsByNGO,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} from '../controllers/announcementController.js';
import express from 'express';
const router = express.Router();
router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement)
router.get('/priority/:priority', getAnnouncementsByPriority);
router.get('/ngo/:ngoId', getAnnouncementsByNGO);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;
