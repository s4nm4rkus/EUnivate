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
        const { userIds, projects, roles, profilePictures } = req.body;
        const inviterId = req.user.id;

        if (!userIds || !userIds.length) {
            return res.status(400).json({ message: 'No valid user IDs provided' });
        }

        // Process each user ID
        await Promise.all(
            userIds.map(async (userId, index) => {
                try {
                    const existingUser = await User.findById(userId);
                    if (!existingUser) {
                        console.warn(`User with ID ${userId} does not exist. Skipping...`);
                        return;
                    }

                    const existingMember = await InviteMember.findOne({ userId });
                    if (existingMember) {
                        console.warn(`User with ID ${userId} has already been invited. Skipping...`);
                        return;
                    }

                    const userProjects = existingUser.projects.map(project => project.toString());
                    const validProjects = projects.filter(project => userProjects.includes(project.toString()));

                    const projectToInvite = validProjects.length > 0 ? validProjects : 'N/A'; // Set to 'N/A' if no valid projects

                    const newMember = new InviteMember({
                        email: existingUser.email,
                        role: roles[index] || existingUser.role || 'User', // Use the role from the request, fallback to existingUser role
                        project: projectToInvite,
                        invitedBy: [inviterId],
                        userId: existingUser._id,
                        profilePicture: profilePictures[index] || existingUser.profilePicture || {}, // Get profile picture from request or use existing one
                    });

                    await newMember.save();

                    await sendEmail({
                        email: existingUser.email,
                        subject: 'Invitation to become a Collaborator',
                        message: `You have been invited to join the project. Please check your role and proceed.`,
                    });
                } catch (error) {
                    console.error(`Failed to invite user ID ${userId}:`, error.message);
                }
            })
        );

        res.status(200).json({ message: 'Invitation emails sent successfully' });
    } catch (error) {
        console.error('Error inviting users:', error.message);
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
        const { id } = req.params; // This should be the userId from the invitedBy array
        console.log(`Attempting to remove invited member with userId: ${id}`);

        // Find and delete the invited member using the userId in the invitedBy array
        const deletedMember = await InviteMember.findOneAndDelete({ 'invitedBy.userId': id });

        if (!deletedMember) {
            console.log(`No invited member found with userId: ${id}`);
            return res.status(404).json({ message: 'Invited member not found' });
        }

        console.log(`Successfully removed invited member:`, deletedMember);
        res.status(200).json({ message: 'Invited member removed successfully', deletedMember });
    } catch (error) {
        console.error('Error removing invited member:', error.message);
        res.status(500).json({ message: 'Error removing invited member', error: error.message });
    }
};

