// backend/controllers/userChatMessageController.js
import Message from '../models/chatMessageModel.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content, sender, file, time } = req.body;

    // Create a new message instance
    const newMessage = new Message({
      content,
      sender,
      file: {
        name: file?.name || '', // Ensure file properties are handled correctly
        type: file?.type || '',
        url: file?.url || ''
      },
      time
    });

    // Save the message to the database
    await newMessage.save();

    // Send response with the saved message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};
