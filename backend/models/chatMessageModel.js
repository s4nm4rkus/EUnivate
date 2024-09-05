import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    name: { type: String, required: true },
    avatar: { type: String }, // optional avatar URL for sender
  },
  file: {
    name: String,
    type: String,
    url: String,
  },
  time: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
