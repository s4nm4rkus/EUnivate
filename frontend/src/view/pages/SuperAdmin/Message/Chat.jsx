import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaReply, FaSmile, FaStar, FaFlag } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const emojis = ['😃', '😂', '😍', '👍', '👏']; // Define the emojis you want to display
const flagColors = ['red', 'yellow', 'green']; // Define flag colors

const Chat = ({ group }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null); // Store index of message to show emoji picker
  const [selectedEmoji, setSelectedEmoji] = useState({}); // Store selected emojis by message index
  const [starredMessages, setStarredMessages] = useState({}); // Track starred messages
  const [showFlagPicker, setShowFlagPicker] = useState(null); // Store index of message to show flag picker
  const [selectedFlag, setSelectedFlag] = useState({}); // Track selected flag colors for messages

  const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png';

  // Dummy members list
  const dummyMembers = [
    {
      name: 'Tyrone',
      profilePicture: 'https://www.imghost.net/ib/4csFv8TIohPRyR1_1725211781.png',
    },
    {
      name: 'Tyga',
      profilePicture: 'https://www.imghost.net/ib/0eQvY8FIwQPYKhz_1725211782.png',
    },
    {
      name: 'Johny Sins',
      profilePicture: 'https://www.imghost.net/ib/U0QwL8TIgFPAHrv_1725211783.png',
    },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setCurrentUser({
        ...storedUser,
        profilePicture: storedUser.profilePicture?.url || defaultProfilePictureUrl,
      });
    }

    // Generate initial messages from these dummy members
    const sampleMessages = dummyMembers.map((user) => ({
      user: {
        name: user.name,
        profilePicture: user.profilePicture,
      },
      text: `Sample message from ${user.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    setMessages(sampleMessages);
  }, [group.selectedMembers]);

  const handleSendMessage = () => {
    if (message.trim() && currentUser) {
      const newMessage = {
        user: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          profilePicture: currentUser.profilePicture,
        },
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        replyTo: replyMessage || null,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setReplyMessage(null);
    }
  };

  const handleEmojiSelect = (emoji, index) => {
    setSelectedEmoji((prev) => ({
      ...prev,
      [index]: emoji,
    }));
    setShowEmojiPicker(null); // Hide picker after selecting emoji
  };

  const toggleStar = (index) => {
    setStarredMessages((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the star status for the selected message
    }));
  };

  const handleFlagSelect = (color, index) => {
    setSelectedFlag((prev) => ({
      ...prev,
      [index]: color,
    }));
    setShowFlagPicker(null); // Hide flag picker after selecting a color
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-start border-b pb-3 mb-4">
        <img
          src={group.imagePreview || defaultProfilePictureUrl}
          alt={group.groupName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{group.groupName} Chat</h2>
          <p className="text-sm text-gray-500">General chat for {group.groupName}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex group ${msg.user.name === `${currentUser?.firstName} ${currentUser?.lastName}` ? 'justify-end' : 'justify-start'}`}
          >
            <img
              src={msg.user.profilePicture?.url || defaultProfilePictureUrl}
              alt={msg.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="bg-gray-100 p-3 rounded-lg w-full max-w-4xl relative">
              <div className="flex mb-1 items-center">
                <p className="text-sm font-semibold">{msg.user.name}</p>
                <p className="text-xs text-gray-500 mr-auto ml-2 flex items-center">
                  {msg.time}
                  {/* Display selected flag reaction next to time */}
                  {selectedFlag[index] && (
                    <FaFlag className={`ml-2 text-${selectedFlag[index]}-500 text-xs`} />
                  )}
                </p>
              </div>
              {msg.replyTo && (
                <div className="text-xs text-gray-500 bg-gray-200 p-1 rounded-md mb-2">
                  <p>
                    <strong>{msg.replyTo.user.name}</strong> said: {msg.replyTo.text}
                  </p>
                </div>
              )}
              <div className="text-sm break-words" dangerouslySetInnerHTML={{ __html: msg.text }} />
              
              {/* Display selected emoji reaction */}
              {selectedEmoji[index] && (
                <div className="mt-2">
                  <span className="text-sm bg-green-300 text-white rounded-full py-1 px-1">
                    {selectedEmoji[index]}
                  </span>
                </div>
              )}

              {/* Icons at the end of the message */}
              <div className="absolute top-0 right-0 flex items-center space-x-3 bg-gray-50 p-2 rounded-lg mt-5 mr-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                <button className="text-gray-500 hover:text-blue-500" onClick={() => setReplyMessage(msg)}>
                  <FaReply size={15} />
                </button>
                <button
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => setShowEmojiPicker(index)}
                >
                  <FaSmile size={15} />
                </button>
                {/* Star Icon with yellow toggle */}
                <button
                  className={`hover:text-blue-500 ${starredMessages[index] ? 'text-yellow-500' : 'text-gray-500'}`}
                  onClick={() => toggleStar(index)}
                >
                  <FaStar size={15} />
                </button>
                {/* Flag Icon */}
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-blue-500"
                    onClick={() => setShowFlagPicker(index)}
                  >
                    <FaFlag size={15} />
                  </button>
                  {/* Flag Picker Dropdown */}
                  {showFlagPicker === index && (
                    <div className="absolute bottom-8 right-0 bg-white shadow-lg rounded-lg p-2 flex space-x-2">
                      {flagColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleFlagSelect(color, index)}
                          className={`text-${color}-500`}
                        >
                          <FaFlag size={15} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Emoji Picker */}
              {showEmojiPicker === index && (
                <div className="absolute bottom-2 right-0 bg-white shadow-lg rounded-lg p-2 flex space-x-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiSelect(emoji, index)}
                      className="text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Reply Preview */}
      {replyMessage && (
        <div className="bg-gray-200 p-2 mb-2 rounded-md text-xs text-gray-700">
          <p>
            Replying to <strong>{replyMessage.user.name}</strong>: {replyMessage.text}
          </p>
          <button className="text-red-500 text-xs hover:underline" onClick={() => setReplyMessage(null)}>
            Cancel Reply
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t pt-3 relative flex items-center">
        <ReactQuill
          value={message}
          onChange={(content) => setMessage(content)}
          placeholder="Enter your message"
          modules={{ toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['image']] }}
          className="flex-1"
        />
        <button className="absolute right-2 bottom-1 p-2" onClick={handleSendMessage}>
          <FaPaperPlane className="text-blue-500" size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
