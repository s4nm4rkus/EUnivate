import Workspace from "../../models/SuperAdmin/addWorkspaceModel.js";
import SelectedWorkspace from "../../models/SuperAdmin/selectedWorkspaceModel.js";

export const addNewWorkspace = async (req, res) => {
    try {
        const {workspaceTitle} = req.body;

        const addWorkspace = new Workspace ({
            workspaceTitle: workspaceTitle
        });

        const savedWorkspace = await addWorkspace.save();
        return res.status(201).json(savedWorkspace);
        
    } catch (error){
        console.error("Error in creating newWorkspace:", error.message);
        return res.status(500).json({error: error.message || 'An error occured while creating Workspace'});
    }
};

export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find(); // Fetch all workspaces
        return res.status(200).json(workspaces); // Send back the list of workspaces
    } catch (error) {
        console.error("Error in retrieving workspaces:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while retrieving Workspaces' });
    }
};

export const updateSelectedWorkspace = async (req, res) => {
    try {
        const { selectedWorkspace, selectedWorkspaceTitle } = req.body;

        // Find if there's an existing selected workspace record, otherwise create a new one
        let selectedWorkspaceRecord = await SelectedWorkspace.findOne();

        if (selectedWorkspaceRecord) {
            // If a record exists, update both ID and title
            selectedWorkspaceRecord.selectedWorkspace = selectedWorkspace;
            selectedWorkspaceRecord.selectedWorkspaceTitle = selectedWorkspaceTitle;
            await selectedWorkspaceRecord.save();
        } else {
            // If no record exists, create a new one with ID and title
            selectedWorkspaceRecord = new SelectedWorkspace({ 
                selectedWorkspace, 
                selectedWorkspaceTitle 
            });
            await selectedWorkspaceRecord.save();
        }

        return res.status(200).json({ 
            message: 'Selected workspace updated successfully', 
            selectedWorkspaceRecord 
        });
    } catch (error) {
        console.error("Error in updating selected workspace:", error.message);
        return res.status(500).json({ 
            error: error.message || 'An error occurred while updating the selected workspace' 
        });
    }
};


// Get the currently selected workspace
export const getSelectedWorkspace = async (req, res) => {
    try {
        const selectedWorkspace = await SelectedWorkspace.findOne().populate('selectedWorkspace');
        
        if (!selectedWorkspace) {
            return res.status(404).json({ message: 'No selected workspace found' });
        }

        return res.status(200).json({ selectedWorkspace }); // Send the entire selectedWorkspace object
    } catch (error) {
        console.error("Error in retrieving selected workspace:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while retrieving selected workspace' });
    }
};






