import mongoose from 'mongoose';

const selectedWorkspaceSchema = new mongoose.Schema({
    selectedWorkspace: {
        type: mongoose.Schema.Types.ObjectId, // Store ObjectId of selected workspace
        ref: 'Workspace' // Reference to the Workspace model
    },

    selectedWorkspaceTitle: {
        type: String
       
    }
    }, {
        timestamps: true
    });

const SelectedWorkspace = mongoose.model('SelectedWorkspace', selectedWorkspaceSchema);

export default SelectedWorkspace;