
import { format } from 'date-fns'; // For date formatting

const Activity_Task = ({ projects, taskDetails, profilePicture, userName, defaultProfilePictureUrl }) => {
  
  // Helper function to get task changes
  const getTaskChanges = (task) => {
    let changes = [];

    const isTaskNew = task.createdAt === task.updatedAt;

    if (isTaskNew) {
      changes.push({
        type: 'created',
        label: 'Add task',
        value: task.taskName
      });
    }

    if (!isTaskNew) {
      if (task.startDate !== task.previousStartDate) {
        changes.push({
          type: 'startDate',
          label: 'Change start date to',
          value: format(new Date(task.startDate), 'MMM dd, yyyy')
        });
      }
      if (task.dueDate !== task.previousDueDate) {
        changes.push({
          type: 'dueDate',
          label: 'Change due date to',
          value: format(new Date(task.dueDate), 'MMM dd, yyyy')
        });
      }
      if (task.priority !== task.previousPriority) {
        changes.push({
          type: 'priority',
          label: 'Change priority to',
          value: task.priority
        });
      }
      if (task.status !== task.previousStatus) {
        changes.push({
          type: 'status',
          label: 'Change status to',
          value: task.status
        });
      }
    }
    return changes;
  };

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm activity-div">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="mb-6">
            <h2 className="text-lg md:text-2xs text-gray-800">{project.projectName}</h2>
            <ul className="mt-2">
              {taskDetails[project._id] && taskDetails[project._id].length > 0 ? (
                taskDetails[project._id].map((task) => {
                  const taskChanges = getTaskChanges(task);
                  if (taskChanges.length === 0) return null;

                  return (
                    <div key={task._id} className="mb-6">
                      <div className="flex items-start">
                        <img
                          src={profilePicture || defaultProfilePictureUrl}
                          alt="Profile"
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                        />
                        <div className="ml-3">
                          <span className="text-lg md:text-2xl font-semibold">{task.taskName}</span>
                          <ul>
                            {taskChanges.map((change, index) => (
                              <li key={index} className="text-sm md:text-base text-gray-700">
                                {userName} {change.label} <span className="text-blue-500">{change.value}</span>
                              </li>
                            ))}
                          </ul>
                          <span className="text-xs md:text-sm text-gray-500">{format(new Date(task.updatedAt), 'MMM dd, yyyy hh:mm a')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-lg text-gray-500">No tasks available</p>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-500">No projects available</p>
      )}
    </div>
  );
};

export default Activity_Task; 

