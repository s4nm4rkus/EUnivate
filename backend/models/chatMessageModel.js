import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    name: { type: String, required: true },
    avatar: { type: String }, // optional avatar URL for sender
  },
  file: {
    name: { type: String, default: '' }, // file name
    type: { type: String, default: '' }, // file type
    url: { type: String, default: '' },  // file URL
  },
  time: {
    type: String,
    required: true,
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema); // This should match the collection name

export default ChatMessage;
