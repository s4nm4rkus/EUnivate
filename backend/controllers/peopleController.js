import User from '../models/userModels.js';
import sendEmail from '../utils/sendEmail.js';
import InviteMember from '../models/saInvitedMember.js';

// Fetch all users
export const getUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };
  

// Invite users with storation to sainvitedUser Schema

export const inviteUsers = async (req, res) => {
    try {
        const { emails } = req.body;
        const userId = req.user.id; // Get the ID of the inviter

        const emailArray = emails.split(',').map(email => email.trim()).filter(email => email);

        if (emailArray.length === 0) {
            return res.status(400).json({ message: 'No valid email addresses provided' });
        }

        await Promise.all(
            emailArray.map(async (email) => {
                try {
                    // Check if the user already exists
                    const existingUser = await User.findOne({ email }); // Assuming you have a User model
                    const role = existingUser ? existingUser.role : 'User'; // Fetch role if user exists, else default to 'User'

                    const existingMember = await InviteMember.findOne({ email });
                    if (existingMember) {
                        return; // If the member has already been invited, skip
                    }

                    const newMember = new InviteMember({
                        email,
                        role,
                        project: 'N/A',
                        invitedBy: userId, // Store who invited the user
                    });

                    await newMember.save();

                    // Send invitation email
                    await sendEmail({
                        email,
                        subject: 'Invitation to become a Collaborator',
                        message: `You have been invited to join. Please check your role and proceed.`,
                    });
                } catch (error) {
                    console.error(`Failed to invite ${email}:`, error.message);
                }
            })
        );

        res.status(200).json({ message: 'Invitation emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error inviting users', error: error.message });
    }
};


//Get Invited Users
export const getInvitedUsers = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user._id from the decoded token

        // Fetch only the invited members where 'invitedBy' matches the current user ID
        const invitedUsers = await InviteMember.find({ invitedBy: userId });

        if (invitedUsers.length === 0) {
            return res.status(404).json({ message: 'No invited users found' });
        }

        res.status(200).json({ invitedUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invited users', error: error.message });
    }
};


// Update user role
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        console.log(`Updating role for userId: ${userId} to role: ${role}`);

        // Find and update the user role
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

        if (!user) {
            console.warn(`User with ID ${userId} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the role in InviteMember if the user was found and updated
        await InviteMember.updateMany({ email: user.email }, { role });

        console.log(`Updated user role for ${user.email} to ${role}`);

        // Send an email to the user notifying them of the role change
        await sendEmail({
            email: user.email,
            subject: 'Your account role has been changed',
            message: `Your account role has been changed to ${role}. Please log in again.`,
        });

        res.status(200).json({ message: 'Role updated successfully and email sent', user });
    } catch (error) {
        console.error('Error updating role:', error.message);
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
};

//Delete the invited members
export const removeInvitedMember = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the ID of the invited member is passed as a URL parameter

        // Find and delete the invited member by ID
        const deletedMember = await InviteMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ message: 'Invited member not found' });
        }

        res.status(200).json({ message: 'Invited member removed successfully', deletedMember });
    } catch (error) {
        console.error('Error removing invited member:', error.message);
        res.status(500).json({ message: 'Error removing invited member', error: error.message });
    }
};

