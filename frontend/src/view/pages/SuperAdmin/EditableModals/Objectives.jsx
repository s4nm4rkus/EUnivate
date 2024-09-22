import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Objectives = ({ objectives, isAddingObjective, newObjective, setNewObjective, onAddObjective, onDeleteObjective, toggleAddingObjective }) => {
  return (
    <div className="mb-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-gray-500 font-semibold">Objectives:</div>
        <FaPlus className="cursor-pointer text-gray-500 hover:text-black" onClick={toggleAddingObjective} />
      </div>
      {objectives && objectives.length > 0 ? (
        <ul className="list-disc list-inside">
          {objectives.map((objective, index) => (
            <li key={index} className="mt-1 flex justify-between items-center text-gray-500 text-sm">
              {objective}
              <FaTrash
                className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => onDeleteObjective(objective)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-gray-500 text-sm">No objectives defined</span>
      )}
      {isAddingObjective && (
        <div className="mt-2 flex">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="New objective"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
          />
          <button className="ml-2 bg-red-700 text-white py-1 px-4 rounded text-sm" onClick={onAddObjective}>Add</button>
        </div>
      )}
    </div>
  );
};

export default Objectives;
