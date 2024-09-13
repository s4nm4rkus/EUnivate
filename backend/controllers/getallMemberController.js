import User from "../models/userModels.js";

//Get members and Superadmin role
export const getMembersAndSuperAdmins = async (req, res) => {
    try {
        // Query to find users with 'members' or 'superadmin' roles
        const users = await User.find({
            role: { $in: ['members', 'superadmin'] }
        });

        // Return the found users
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};