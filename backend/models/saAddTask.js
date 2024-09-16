    import mongoose from 'mongoose';
    


    const saAddTaskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    status: { type: String, required: true, enum: ['Pending', 'Todo', 'Ongoing', 'Done', 'Backlog'] },
    description: { type: String },
    objectives: [{ type: String }],  // Array of strings
    questionUpdate: { type: String },
    attachment: [{
        publicId: { type: String, required: true },
        url: { type: String, required: true },
    }],
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'SaNewProject'}, 
    }, { timestamps: true });

    const saAddTask = mongoose.model('saAddTask', saAddTaskSchema);

    export default saAddTask;
