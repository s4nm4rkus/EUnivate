import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        refreshToken: [String]
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure emails are unique
        
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, enum: ['User', 'Admin', 'Superadmin'], default: 'User'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;


