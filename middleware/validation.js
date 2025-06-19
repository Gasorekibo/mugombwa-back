import { body, param, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// NGO validation rules
const validateNGO = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('NGO name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('NGO name must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('color')
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color code'),
  
  body('icon')
    .trim()
    .notEmpty()
    .withMessage('Icon is required'),
  
  body('contact_info')
    .trim()
    .notEmpty()
    .withMessage('Contact information is required'),
  
  handleValidationErrors
];

// Service validation rules
const validateService = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Service title is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Service title must be between 2 and 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required'),
  
  body('category')
    .isIn(['education', 'sanitation', 'protection', 'youth', 'recreation', 'emergency', 'safety', 'legal', 'health'])
    .withMessage('Invalid service category'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  
  body('schedule')
    .trim()
    .notEmpty()
    .withMessage('Schedule is required'),
  
  body('contact')
    .trim()
    .notEmpty()
    .withMessage('Contact information is required'),
  
  handleValidationErrors
];

// Announcement validation rules
const validateAnnouncement = [
  body('ngo_id')
    .isMongoId()
    .withMessage('Valid NGO ID is required'),
  
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Announcement title is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Announcement content is required')
    .isLength({ max: 2000 })
    .withMessage('Content must not exceed 2000 characters'),
  
  body('priority')
    .isIn(['low', 'normal', 'high', 'urgent'])
    .withMessage('Invalid priority level'),
  
  body('category')
    .isIn(['education', 'sanitation', 'protection', 'youth', 'recreation', 'emergency', 'safety', 'legal', 'health', 'general'])
    .withMessage('Invalid category'),
  
  handleValidationErrors
];

// Emergency contact validation rules
const validateEmergencyContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('phone')
    .matches(/^\+250\s\d{3}\s\d{3}\s\d{3}$/)
    .withMessage('Phone number must be in format: +250 XXX XXX XXX'),
  
  body('type')
    .isIn(['emergency', 'health', 'security', 'fire', 'administration', 'legal'])
    .withMessage('Invalid contact type'),
  
  body('available_24_7')
    .isBoolean()
    .withMessage('Available 24/7 must be true or false'),
  
  handleValidationErrors
];

// Parameter validation
const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];

module.exports = {
  validateNGO,
  validateService,
  validateAnnouncement,
  validateEmergencyContact,
  validateObjectId,
  handleValidationErrors
};