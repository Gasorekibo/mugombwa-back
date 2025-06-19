import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema({
  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  ngo_name: {
    type: String,
    required: true
  },
  ngo_color: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'sanitation', 'protection', 'youth', 'recreation', 'emergency', 'safety', 'legal', 'health', 'general']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: null 
  }
}, {
  timestamps: true
});

// Index for better query performance
announcementSchema.index({ priority: -1, createdAt: -1 });
announcementSchema.index({ category: 1 });
announcementSchema.index({ ngo_id: 1 });

export default mongoose.model('Announcement', announcementSchema);