import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const Chat = ({ group, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      storedUser.profilePicture = storedUser.profilePicture?.url || defaultProfilePictureUrl;
      setCurrentUser(storedUser);
    }

    setTimeout(() => {
      const randomMember1 = group.selectedMembers[Math.floor(Math.random() * group.selectedMembers.length)];
      const randomMember2 = group.selectedMembers[Math.floor(Math.random() * group.selectedMembers.length)];

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: { 
            name: randomMember1.name, 
            profilePicture: randomMember1.profilePicture || defaultProfilePictureUrl 
          },
          text: 'Hello there!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          user: { 
            name: randomMember2.name, 
            profilePicture: randomMember2.profilePicture || defaultProfilePictureUrl 
          },
          text: 'How are you doing today?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 3000);
  }, [group.selectedMembers]);

  const handleSendMessage = () => {
    if (message.trim() && currentUser) {
      const newMessage = {
        user: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          profilePicture: currentUser.profilePicture || defaultProfilePictureUrl,
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

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-4">
        <div className="flex items-center">
          <FaArrowLeft onClick={onBack} className="cursor-pointer text-gray-600 mr-4" size={20} />
          <img
            src={group.imagePreview || 'https://via.placeholder.com/50'}
            alt={group.groupName}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-lg font-bold">{group.groupName} Chat</h2>
            <p className="text-sm text-gray-500">General chat for {group.groupName}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 chat-scroll">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex items-start ${msg.user.name === `${currentUser.firstName} ${currentUser.lastName}` ? 'justify-end' : 'justify-start'}`}>
              <img
                src={msg.user?.profilePicture?.url || defaultProfilePictureUrl}
                alt={msg.user?.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="bg-gray-100 p-3 rounded-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold">{msg.user?.name}</p>
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
                {msg.replyTo && (
                  <div className="text-xs text-gray-500 bg-gray-200 p-1 rounded-md mb-2">
                    <p>
                      <strong>{msg.replyTo.user?.name}</strong> said: {msg.replyTo.text}
                    </p>
                  </div>
                )}
                <div
                  className="text-sm break-words"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
                <button
                  className="text-blue-500 text-xs hover:underline"
                  onClick={() => setReplyMessage(msg)}
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No messages yet.</p>
        )}
      </div>

      <div className="border-t border-gray-300 pt-3 relative flex items-center">
        <ReactQuill
          value={message}
          onChange={(content) => setMessage(content)}
          placeholder="Enter your message"
          modules={{
            toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['image']],
          }}
          className="flex-1"
        />
        <button
          className="absolute right-2 bottom-1 p-2 flex items-center justify-center"
          style={{ width: '40px', height: '40px', color: 'blue' }}
          onClick={handleSendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
