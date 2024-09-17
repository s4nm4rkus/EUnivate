import SaNewProject from '../models/saNewProject.js';
import saAddTask from '../models/saAddTask.js'; 
export const createSaNewProject = async (req, res) => {
    try {
        const { projectName, thumbnail } = req.body;

        const newSaNewProject = new SaNewProject({
            projectName: projectName,
            thumbnail: thumbnail,
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
        // Fetch all projects from the database
        const projects = await SaNewProject.find({});

        // Check if projects exist
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

//Mamaya to gaagamitin 
// import SaNewProject from '../models/saNewProject.js';
// import saAddTask from '../models/saAddTask.js'; // Import Task model

// // Delete a project by its ID
// export const deleteProjectById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Delete the project by its ID
//     const deletedProject = await SaNewProject.findByIdAndDelete(id);

//     if (!deletedProject) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     // Also delete all tasks related to this project
//     await saAddTask.deleteMany({ project: id });

//     return res.status(200).json({
//       success: true,
//       message: 'Project and its related tasks deleted successfully!',
//       deletedProject,
//     });
//   } catch (error) {
//     console.error('Error in deleting project:', error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'Server Error. Could not delete project.',
//       error: error.message,
//     });
//   }
// };
