        import Message from "../../../models/SuperAdmin/chatMessageModel.js";
        import {io} from "../../../index.js"


        // Create a new message
        export const createMessage = async (req, res) => {
            const { sender, content, files } = req.body;

            try {
                const newMessage = new Message({
                    sender,
                    content,
                    files
                });

                let savedMessage = await newMessage.save();
                savedMessage = await savedMessage.populate('sender', 'firstName lastName profilePicture');

                io.emit('new-message', savedMessage);

                res.status(201).json(savedMessage);
            } catch (error) {
                console.error('Error creating message:', error);
                res.status(500).json({ message: 'Error creating message', error });
            }
        };

        // Reply to a message
        export const replyToMessage = async (req, res) => {
            const { messageId } = req.params;
            const { sender, content } = req.body;

            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }

                const newReply = { sender, content, createdAt: new Date() };
                message.replies.push(newReply);

                await message.save();
             io.emit('new-reply', { messageId, reply: newReply });
                res.status(201).json(message);
            } catch (error) {
                res.status(500).json({ message: 'Error replying to message', error });
            }
        };


        // React to a message
        export const reactToMessage = async (req, res) => {
            const { messageId } = req.params;
            const { user, reaction } = req.body;

            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }

                const newReaction = { user, reaction, reactedAt: new Date() };
                message.reactions.push(newReaction);

                await message.save();
                io.emit('new-reaction', { messageId, reaction: newReaction }); // Broadcast the new reaction
                res.status(201).json(message);
            } catch (error) {
                res.status(500).json({ message: 'Error reacting to message', error });
            }
        };

        // Star a message
        export const starMessage = async (req, res) => {
            const { messageId } = req.params;
            const { userId } = req.body;

            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }

                if (!message.starredBy.includes(userId)) {
                    message.starredBy.push(userId);
                }

                await message.save();
                io.emit('starred-message', { messageId, userId }); // Broadcast the starred message
                res.status(201).json(message);
            } catch (error) {
                res.status(500).json({ message: 'Error starring message', error });
            }
        };

        // Flag a message with priority
        export const flagMessage = async (req, res) => {
            const { messageId } = req.params;
            const { priorityFlag } = req.body;

            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }

                message.priorityFlag = priorityFlag;

                await message.save();
                io.emit('flagged-message', { messageId, priorityFlag }); // Broadcast the flagged message
                res.status(201).json(message);
            } catch (error) {
                res.status(500).json({ message: 'Error flagging message', error });
            }
        };


        //Get the Message
        export const getAllMessages = async (req, res) => {
            try {
        
                const messages = await Message.find({ removed: { $ne: true } }) 
                    .populate('sender', 'firstName lastName profilePicture') 
                    .populate('replies.sender', 'firstName lastName profilePicture') 
                    .populate('reactions.user', 'firstName lastName profilePicture'); 

                res.status(200).json(messages); 
            } catch (error) {
                res.status(500).json({ message: 'Error fetching messages', error });            
            }
        };

        // Delete a message (soft delete)
        export const deleteMessage = async (req, res) => {
            const { messageId } = req.params;

            try {
                const message = await Message.findById(messageId);

                if (!message) {
                    return res.status(404).json({ message: 'Message not found' });
                }

                message.removed = true;

                await message.save();
                io.emit('deleted-message', { messageId }); // Broadcast message removal
                res.status(200).json({ message: 'Message deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting message', error });
            }
        };
