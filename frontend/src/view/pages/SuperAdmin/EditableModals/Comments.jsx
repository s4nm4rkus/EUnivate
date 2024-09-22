import React from 'react';

const Comments = ({ comment, setComment, onCommentSubmit, commentsList }) => {
  return (
    <div className="mb-4">
      <textarea
        className="w-full mt-2 p-2 border border-gray-300 rounded"
        placeholder="Ask question or post an update"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="mt-2 bg-red-700 text-white py-2 px-6 rounded text-md w-full hover:bg-red-700 transition-all duration-200"
        onClick={onCommentSubmit}
      >
        Post
      </button>

      {/* Render posted comments */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-500">Comments:</h3>
        {commentsList.length > 0 ? (
          <ul className="list-disc list-inside">
            {commentsList.map((cmt, index) => (
              <li key={index} className="mt-1 flex items-start text-gray-500">
                <img src={cmt.avatar} alt={cmt.name} className="w-8 h-8 rounded-full mr-2" />
                <div>
                  <strong>{cmt.name}</strong>
                  <p>{cmt.text}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500">No comments yet.</span>
        )}
      </div>
    </div>
  );
};

export default Comments;
