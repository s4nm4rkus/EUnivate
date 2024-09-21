import mongoose from 'mongoose';

const saInvitedMemberSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, 
    },
    role: {
        type: String,
        enum: ['User', 'members', 'admin', 'superadmin'],
        default: 'User',
    },
    project: {
        type: String,
        default: 'N/A',
    },
    profilePicture: {
        publicId: {
            type: String,
            required: false,
            default: 'default', 
        },
        url: {
            type: String,
            required: false,
            default: 'https://res.cloudinary.com/dzxzc7kwb/image/upload/v1725974053/DefaultProfile/qgtsyl571c1neuls9evd.png',
        },
    },
}, {
    timestamps: true,
});

const saInvitedMember = mongoose.model('saInvitedMember', saInvitedMemberSchema);
export default saInvitedMember;