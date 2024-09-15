import saAddTask from '../models/saAddTask.js'; 

// Create Task Controller
export const createTask = async (req, res) => {
  try {
    const { taskName, assignee, startDate, dueDate, priority, status, description, objectives, questionUpdate, attachment } = req.body;

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
      attachment
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
    const tasks = await saAddTask.find().populate('assignee'); // Populating the assignee field with the User model
    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
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
    const { id } = req.params; // Extract task ID from request parameters

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required.'
      });
    }

    const task = await saAddTask.findById(id); // Fetch task from the database

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not retrieve task.',
      error: error.message
    });
  }
};

// Update Task Controller
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await saAddTask.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Task updated successfully!',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error. Could not update task.',
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

export const getTasksByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log('Fetching tasks for projectId:', projectId); // Debug log

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: 'Project ID is required.'
      });
    }

    const tasks = await saAddTask.find({ project: projectId });
    console.log('Tasks found:', tasks); // Debug log

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tasks found for this project.'
      });
    }

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
