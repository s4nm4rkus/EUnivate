import User from "../models/userModels.js";
import Project from "../models/saNewProject.js";
// //Get members and Superadmin role
// export const getMembersAndSuperAdmins = async (req, res) => {
//         try {
//             // Query to find users with 'members' or 'superadmin' roles
//             const users = await User.find({
//                 role: { $in: ['members', 'superadmin'] }
//             });

//             // Return the found users
//             res.status(200).json(users);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             res.status(500).json({ message: 'Error fetching users' });
//         }
//     };

//Invite to project
// export const inviteUsers = async (req, res) => {
//     try {
//         const { emails } = req.body;

//         console.log(`Inviting users with emails: ${emails}`);
//         const emailArray = emails.split(',').map(email => email.trim()).filter(email => email); 

//         if (emailArray.length === 0) {
//             console.warn('No valid email addresses provided');
//             return res.status(400).json({ message: 'No valid email addresses provided' });
//         }

//         console.log(`Processed email array: ${emailArray}`);


//         await Promise.all(
//             emailArray.map(async (email) => {
//                 try {
//                     console.log(`Sending email to ${email}`);
//                     await sendEmail({
//                         email: email, 
//                         subject: 'Invitation to become an Collaborator',
//                         message: `You have been invited to become an Collaborator in our system please wait to change your role of the admin to proceed with your login page.`, 
//                     });
//                     console.log(`Email sent to ${email}`);
//                 } catch (error) {
//                     console.error(`Failed to send email to ${email}:`, error.message);
//                 }
//             })
//         );

//         res.status(200).json({ message: 'Invitation emails sent successfully' });
//     } catch (error) {
//         console.error('Error inviting users:', error.message);
//         res.status(500).json({ message: 'Error inviting users', error: error.message });
//     }
// }

export const addProjectsToUsers = async (req, res) => {
    try {
        const { projectId, users } = req.body;

        // Ensure projectId and users array are provided
        if (!projectId || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: 'Project ID and users are required' });
        }

        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Update each user's projects array to include the new project
        const updatedUsers = await Promise.all(users.map(async (userId) => {
            const user = await User.findById(userId);
            if (user) {
                // Add the project to the user's projects array if it's not already there
                if (!user.projects.includes(projectId)) {
                    user.projects.push(projectId);
                    await user.save();
                }
            }
            return user;
        }));

        res.status(200).json({ message: 'Users successfully assigned to the project', updatedUsers });
    } catch (error) {
        console.error('Error assigning project:', error);
        res.status(500).json({ message: 'Server error while assigning project' });
    }
};