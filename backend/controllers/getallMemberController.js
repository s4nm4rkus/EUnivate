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
//tobecontinued hihi -_-, XD
//Invite to project
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
