import mongoose from 'mongoose'
import crypto from 'crypto'
const ScaleSchema = new mongoose.Schema({
  day: {
    type: String,
    trim: true,
    required: 'day is required'
  },
  scaleds: {
    type: String,
    trim: true,
    required: 'scaleds is required'
  },
  department: {
    type: String,
    trim: true,
    required: 'department is required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Scale', ScaleSchema)
