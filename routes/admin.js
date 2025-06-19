import { authMiddleware, superAdminMiddleware } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

// Admin only route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to admin dashboard',
    admin: req.admin
  });
});

// Super admin only route
router.get('/users', authMiddleware, superAdminMiddleware, (req, res) => {
  res.json({
    success: true,
    message: 'User management - super admin only'
  });
});

export default router;