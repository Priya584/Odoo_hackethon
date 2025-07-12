import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
    default: "0", // ✅ Set default as string "0"
  },
  skillsWanted: {
    type: [String],
    required: false,
  },
  skillsOffered: {
    type: [String],
    required: false,
  },
  profilePhoto: {
    type: String, // Just the filename or path
    required: false,
  },
  availability: {
    type: String,
    required: false,
    default: '',
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    required: false,
    default: 'public',
  },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
