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
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
