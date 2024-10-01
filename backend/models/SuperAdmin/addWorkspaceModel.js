import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    workspaceTitle: {
        type: String,
        required: true
    }
    }, {
        timestamps: true
    });

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;