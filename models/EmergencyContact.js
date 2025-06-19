import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+250\s\d{3}\s\d{3}\s\d{3}$/.test(v);
      },
      message: 'Phone number must be in format: +250 XXX XXX XXX'
    }
  },
  type: {
    type: String,
    required: true,
    enum: ['emergency', 'health', 'security', 'fire', 'administration', 'legal']
  },
  available_24_7: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
emergencyContactSchema.index({ type: 1 });
emergencyContactSchema.index({ available_24_7: -1 });

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
export default EmergencyContact;
