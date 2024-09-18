import SaNewProject from '../models/saNewProject.js';
import saAddTask from '../models/saAddTask.js'; 
export const createSaNewProject = async (req, res) => {
    try {
        const { projectName, thumbnail,invitedUsers  } = req.body;

        const newSaNewProject = new SaNewProject({
            projectName: projectName,
            thumbnail: thumbnail,
            owner: req.user._id,
            invitedUsers
        });

        const savedSaNewProject = await newSaNewProject.save();
        return res.status(201).json(savedSaNewProject);
    } catch (error) {
        console.error("Error in creatingSaNewProject:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while creating the SaNewProject' });
    }
};

//Get all Project
export const getAllProjects = async (req, res) => {
    try {
        const projects = await SaNewProject.find({
          $or: [
            { owner: req.user._id },
            { invitedUsers: req.user._id }
          ]
        });
    
        if (projects.length === 0) {
          return res.status(404).json({ message: 'No projects found' });
        }
    
        return res.status(200).json(projects);
      } catch (error) {
        console.error("Error in fetching projects:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while fetching the projects' });
      }
    };
    
//Get Project by id
export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Fetch project by ID from the database
        const project = await SaNewProject.findById(projectId);

        // Check if project exists
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error("Error in fetching project:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while fetching the project' });
    }
};

//  delete a project by its ID
export const deleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the project by its ID
        const deletedProject = await SaNewProject.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Also delete all tasks associated with the deleted project
        const deletedTasks = await saAddTask.deleteMany({ project: id });

        return res.status(200).json({
            message: 'Project and associated tasks deleted successfully',
            deletedProject,
            deletedTasks,
        });
    } catch (error) {
        console.error("Error in deleting project and tasks:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while deleting the project and tasks' });
    }
};



// Invite users to a project
// Invite users to a project
export const inviteUsersToProject = async (req, res) => {
    try {
        const { projectId, users } = req.body;

        // Debugging log
        console.log("Request Body:", req.body);

        // Validate input
        if (!Array.isArray(users) || !projectId) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const project = await SaNewProject.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if current user is the owner
        if (!req.user || project.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to invite users to this project' });
        }

        // Add user IDs directly to the invitedUsers array
        project.invitedUsers = [...new Set([...project.invitedUsers, ...users])]; // Prevent duplicates
        await project.save();

        return res.status(200).json(project);
    } catch (error) {
        console.error("Error in inviting users:", error.message);
        return res.status(500).json({ error: error.message || 'An error occurred while inviting users' });
    }
};
