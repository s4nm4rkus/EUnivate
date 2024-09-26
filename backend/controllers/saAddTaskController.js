import saAddTask from '../models/saAddTask.js'; 
import Project from '../models/saNewProject.js';

//getAddedMembers
  export const getAddedMembers = async (req, res) => {
    try {
        const { projectId } = req.query;

        console.log("Received Project ID:", projectId); // Log the incoming projectId

        if (!projectId) {
            console.log("No Project ID provided."); // Log if projectId is missing
            return res.status(400).json({ message: 'Project ID is required' });
        }

        // Fetching the project by ID
        const project = await Project.findById(projectId).populate('invitedUsers', 'username profilePicture');

        if (!project) {
            console.log("No project found with this ID."); // Log if no project is found
            return res.status(404).json({ message: 'Project not found' });
        }

        console.log("Invited Users found:", project.invitedUsers); // Log the invitedUsers array

        res.status(200).json({
            success: true,
            invitedUsers: project.invitedUsers.map(user => ({
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture
            })) // Return user details including the ID
        });
    } catch (error) {
        console.error('Error fetching invited users:', error); // Log the error
        res.status(500).json({ message: 'Server Error. Could not retrieve invited users.' });
    }
  };




// Create Task Controller
export const createTask = async (req, res) => {
  try {
    const { taskName, assignee, startDate, dueDate, priority, status, description, objectives, questionUpdate, attachment, project } = req.body;

    // Fetch invited users for the project
    const invitedUsers = await saInvitedMember.find({ project }).select('userId');
    const invitedUserIds = invitedUsers.map(user => user.userId.toString());

    // Check if all assignees are invited users
    const invalidAssignees = assignee.filter(userId => !invitedUserIds.includes(userId.toString()));

    if (invalidAssignees.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some assignees are not invited members of this project.',
        invalidAssignees
      });
    }

    // Create a new task document
    const newTask = new saAddTask({
      taskName,
      assignee,
      startDate,
      dueDate,
      priority,
      status,
      description,
      objectives,
      questionUpdate,
      attachment,
      project,
    });

    // Save to the database
    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      data: savedTask
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not create task.',
      error: error.message
    });
  }
};

// Get All Tasks Controller
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required.'
      });
    }

    const query = { project: projectId };
    if (status) {
      query.status = status;
    }

    const tasks = await saAddTask.find(query)
      .populate('assignee', 'name profilePicture')
      .populate({
        path: 'assignee',
        match: { _id: { $in: invitedUserIds } },  // Ensure the assignees are part of invited users
        select: 'name profilePicture'
      });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks by projectId:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not retrieve tasks.',
      error: error.message
    });
  }
};

// Get Single Task by ID

export const getTaskById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query; // Read status from query parameters

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required.'
      });
    }

    // Build the query, including the status if provided
    const query = { project: projectId };
    if (status) {
      query.status = status; // Filter by status if provided
    }

    // Fetch tasks based on the query
    const tasks = await saAddTask.find(query)
      .populate('assignee', 'name profilePicture');

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks by projectId:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not retrieve tasks.',
      error: error.message
    });
  }
};

// Update Task Controller
export const updateTaskStatusById = async (req, res) => {
  try {
    const { status } = req.body; // Extract status from request body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required to update the task.'
      });
    }

    // Find the task by ID and update the status field
    const updatedTask = await saAddTask.findByIdAndUpdate(
      req.params.id,
      { status }, // Only update the status field
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task status updated successfully!',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not update task status.',
      error: error.message
    });
  }
};


// Delete Task Controller
export const deleteTask = async (req, res) => {
  try {
     const deletedTask = await saAddTask.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not delete task.',
      error: error.message
    });
  }
};

// Import your model
// Controller to fetch the task by project ID
export const getTasksByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query; // Read status from query parameters

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required.'
      });
    }

    // Build the query, including the status if provided
    const query = { project: projectId };
    if (status) {
      query.status = status; // Filter by status if provided
    }

    // Fetch tasks based on the query
    const tasks = await saAddTask.find(query).populate('assignee', 'name profilePicture');
    console.log('Tasks found:', tasks); // Debug log

    // Return tasks, even if none are found
    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks by projectId:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not retrieve tasks.',
      error: error.message
    });
  }
};


