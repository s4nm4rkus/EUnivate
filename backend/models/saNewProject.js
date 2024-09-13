import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  thumbnail: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  }
}, { timestamps: true });

const Project = mongoose.model('SaNewProject', projectSchema);

export default Project;
