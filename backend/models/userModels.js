// UserSchema that fetch the profile picture of the Admin
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        enum: ['User', 'Admin', 'Superadmin'], 
        default: 'User'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    profilePicture: {
        type: String,
        default: '',     },
    refreshToken: [String], 
}, 
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;
