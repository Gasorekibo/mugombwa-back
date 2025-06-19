import express from 'express';
const router = express.Router();

import{
  getAllEmergencyContacts,
  getEmergencyContactsByType,
  get24HourContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
} from '../controllers/emergencyContactController.js';

router.get('/', getAllEmergencyContacts);
router.get('/type/:type', getEmergencyContactsByType);
router.get('/24-hour', get24HourContacts);
router.post('/', createEmergencyContact);
router.put('/:id', updateEmergencyContact);
router.delete('/:id', deleteEmergencyContact);

export default router;