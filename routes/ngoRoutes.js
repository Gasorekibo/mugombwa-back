import {
  getAllNGOs,
  getNGOById,
  createNGO,
  updateNGO,
  deleteNGO,
  addServiceToNGO,
  updateNGOService,
  deleteNGOService,
  getAllServices,
  getServicesByCategory
} from '../controllers/ngoController.js';

import express from 'express';
import { makePhoneCall, sendMessage } from '../helper/sendMessage.js';
const router = express.Router();
// NGO routes
router.get('/', getAllNGOs);
router.get('/:id', getNGOById);
router.post('/', createNGO);
router.put('/:id', updateNGO);
router.delete('/:id', deleteNGO);

// Service routes within NGO
router.post('/:id/services', addServiceToNGO);
router.put('/:ngoId/services/:serviceId', updateNGOService);
router.delete('/:ngoId/services/:serviceId', deleteNGOService);

// Global service routes
router.get('/services/all', getAllServices);
router.get('/services/category/:category', getServicesByCategory);

//Call and Sms by twilio

router.post('/call', async(req, res)=> {
  const {to} = req.body
  try {
    const call = await makePhoneCall(to);
    res.status(200).json({
      success: true,
      message: 'Call initiated successfully',
      data: call
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to initiate call',
      error: error.message
    });
  }
})
router.post('/sms', async (req, res) => {
  const { to, newMessage } = req.body;
  try {
    const message = await sendMessage(to, newMessage);
    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
});

export default router;