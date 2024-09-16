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
        const { emails } = req.body;

        console.log(`Inviting users with emails: ${emails}`);
        const emailArray = emails.split(',').map(email => email.trim()).filter(email => email); 

        if (emailArray.length === 0) {
            console.warn('No valid email addresses provided');
            return res.status(400).json({ message: 'No valid email addresses provided' });
        }

        console.log(`Processed email array: ${emailArray}`);


        await Promise.all(
            emailArray.map(async (email) => {
                try {
                    console.log(`Sending email to ${email}`);
                    await sendEmail({
                        email: email, 
                        subject: 'Invitation to become an Collaborator',
                        message: `You have been invited to become an Collaborator in our system please wait to change your role of the admin to proceed with your login page.`, 
                    });
                    console.log(`Email sent to ${email}`);
                } catch (error) {
                    console.error(`Failed to send email to ${email}:`, error.message);
                }
            })
        );

        res.status(200).json({ message: 'Invitation emails sent successfully' });
    } catch (error) {
        console.error('Error inviting users:', error.message);
        res.status(500).json({ message: 'Error inviting users', error: error.message });
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

        // Send an email to the user notifying them of the role change
        await sendEmail({
            email: user.email,  // Using 'email' to match the sendEmail function
            subject: 'Your account role has been changed',
            message: `Your account role has been changed to ${role}. Please log in again.`, // Using 'message' to match the sendEmail function
        });

        res.status(200).json({ message: 'Role updated successfully and email sent', user });
    } catch (error) {
        console.error('Error updating role:', error.message);
        res.status(500).json({ message: 'Error updating role', error });
    }
};