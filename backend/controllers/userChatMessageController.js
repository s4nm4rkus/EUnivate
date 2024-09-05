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
  const { content, sender, file, time } = req.body;
  try {
    const message = new Message({ content, sender, file, time });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
