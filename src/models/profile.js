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
    default: "0",
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
    type: String,
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
  requests: {
    type: [
      {
        fromUserId: String,
        fromName: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
