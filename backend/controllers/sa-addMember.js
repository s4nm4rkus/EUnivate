import Invited from "../models/saInvitedMember.js";
import Project from "../models/saNewProject.js";

export const addMemberToProject = async (req, res) => {
    const { projectId, users } = req.body;

    console.log('Received Project ID:', projectId);
    console.log('Received Users:', users);

    if (!projectId || !Array.isArray(users) || users.length === 0) {
        return res.status(400).json({ message: 'Invalid project ID or users array.' });
    }

    try {
        // Find the project (optional, based on your requirements)
        const project = await Project.findById(projectId);
        if (!project) {
            console.log('Project not found for ID:', projectId);
            return res.status(404).json({ message: 'Project not found.' });
        }
        console.log('Project found:', project);

        // Update each user to add the project ID to their projects array
        const result = await Invited.updateMany(
            { _id: { $in: users } }, // Match users by their IDs
            { $addToSet: { project: projectId } } // Add projectId to the projects array, avoiding duplicates
        );

        console.log('Update Result:', result);

        // Optionally fetch the updated users to return them
        const updatedUsers = await Invited.find({ _id: { $in: users } });
        
        console.log('Updated Users:', updatedUsers);
        res.status(200).json({ message: 'Members added successfully.', invitedUsers: updatedUsers });
    } catch (error) {
        console.error('Error adding members to project:', error);
        res.status(500).json({ message: 'An error occurred while adding members to the project.' });
    }
};


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

//Add member to project