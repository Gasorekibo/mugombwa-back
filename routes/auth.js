import express from 'express';
const router = express.Router();
import{
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  createFirstAdmin
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

router.post('/login', loginAdmin);
router.post('/setup', createFirstAdmin); 
router.get('/profile', authMiddleware, getAdminProfile);
router.put('/profile', authMiddleware, updateAdminProfile);
router.put('/change-password', authMiddleware, changePassword);

export default router;