import User from '../models/userModels.js';
import sendEmail from '../utils/sendEmail.js';

// Fetch all users
export const getUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };
  
// Invite users
export const inviteUsers = async (req, res) => {
    try {
        const { emails, role } = req.body;
        console.log(`Inviting users with role: ${role}, emails: ${emails}`);
        const emailArray = emails.split(',').map(email => email.trim()).filter(email => email); // Split and remove empty emails

        if (emailArray.length === 0) {
            console.warn('No valid email addresses provided');
            return res.status(400).json({ message: 'No valid email addresses provided' });
        }

        console.log(`Processed email array: ${emailArray}`);

        const newUsers = emailArray.map(email => ({
            email,
            role,
            firstName: 'First',
            lastName: 'Last',
        }));

        const createdUsers = await User.insertMany(newUsers);
        console.log(`Created ${createdUsers.length} users`);

        // Send invitation emails
        createdUsers.forEach(user => {
            console.log(`Sending email to ${user.email}`);
            sendEmail({
                to: user.email,
                subject: 'You have been invited',
                text: `You have been invited as a ${role}. Please check the details and proceed.`,
            });
        });

        res.status(201).json({ message: 'Users invited successfully', users: createdUsers });
    } catch (error) {
        console.error('Error inviting users:', error.message);
        res.status(500).json({ message: 'Error inviting users', error });
    }
};

// Update user role
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        console.log(`Updating role for userId: ${userId} to role: ${role}`);

        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`Updated user role for ${user.email} to ${role}`);

   
     
        res.status(200).json({ message: 'Role updated successfully', user });
    } catch (error) {
        console.error('Error updating role:', error.message);
        res.status(500).json({ message: 'Error updating role', error });
    }
};
