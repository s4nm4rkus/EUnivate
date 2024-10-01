import Workspace from "../../models/SuperAdmin/addWorkspaceModel.js";

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