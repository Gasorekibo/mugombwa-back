import mongoose from "mongoose";
import NGO from "./NGO.js";
const Services = new mongoose.Schema({
  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'sanitation', 'protection', 'youth', 'recreation', 'emergency', 'safety', 'legal', 'health']
  },
  location: {
    type: String,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  maxCapacity: {
    type: Number,
    default: null
  },
  currentEnrollment: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
Services.index({ ngo_id: 1 });
Services.index({ category: 1 });
Services.index({ status: 1 });

const Service = mongoose.model('Service', Services);
export default Service;
