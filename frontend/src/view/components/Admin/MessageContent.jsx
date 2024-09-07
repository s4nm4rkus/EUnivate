import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faStar, faHeart, faPaperPlane, faPaperclip, faMicrophone, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MessageContent = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [activeIcons, setActiveIcons] = useState({});
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      recorder.ondataavailable = (e) => setAudioBlob(e.data);
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  const sendMessage = async () => {
    if (message.trim() || file) {
      const cleanMessage = message.replace(/<\/?p>/g, '');

      if (editingMessageId) {
        // Update the existing message
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === editingMessageId ? { ...msg, content: cleanMessage, edited: true } : msg
          )
        );
        setEditingMessageId(null);
      } else {
        const newMessage = {
          content: cleanMessage,
          sender: { name: 'You', avatar: 'https://via.placeholder.com/40' },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          file: file ? { name: file.name, type: file.type, url: URL.createObjectURL(file) } : null,
          replyTo: replyingTo ? replyingTo : null,
          edited: false
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
          const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setMessages((prevMessages) =>
            prevMessages.map((msg) => (msg === newMessage ? data : msg))
          );
        } catch (error) {
          console.error('Error sending message:', error);
        }

        setReplyingTo(null);
      }

      setMessage('');
      setFile(null);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleQuillChange = (value) => setMessage(value);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleIconClick = (messageId, icon) => {
    setActiveIcons((prevActiveIcons) => ({
      ...prevActiveIcons,
      [messageId]: prevActiveIcons[messageId] === icon ? null : icon,
    }));
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleEdit = (messageId, messageContent) => {
    setEditingMessageId(messageId);
    setMessage(messageContent);
  };

  const handleDelete = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
  };

  const getIconColor = (messageId, icon) => {
    switch (icon) {
      case 'reply':
        return activeIcons[messageId] === 'reply' ? 'text-blue-500' : 'text-gray-400';
      case 'star':
        return activeIcons[messageId] === 'star' ? 'text-yellow-500' : 'text-gray-400';
      case 'heart':
        return activeIcons[messageId] === 'heart' ? 'text-red-500' : 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (message) => {
    if (message.replyTo) {
      return `
        <div>
          <p><strong>Replying to ${message.replyTo.sender.name}:</strong></p>
          <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
            <p><strong>${message.replyTo.sender.name}</strong> <span class="text-gray-500 text-xs">(${message.replyTo.time})</span></p>
            <p>${message.replyTo.content}</p>
          </div>
          <p>${message.content}</p>
        </div>
      `;
    }
    return message.content;
  };

  return (
    <div className="message-content flex flex-col h-full">
      {/* Header */}
      <div className="header mb-2 pl-2">
        <h2 className="text-xl font-semibold text-black">Superboard</h2>
        <p className="text-sm text-gray-600 mt-2">Superboard general chat</p>
      </div>

      <hr className="border border-gray-200 mt-4" />

      {/* Messages */}
      <div className="messages flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message flex items-start space-x-4 ${
              msg.sender.name === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender.name !== 'You' && (
              <img src={msg.sender.avatar} alt={msg.sender.name} className="rounded-full w-10 h-10 mt-2" />
            )}
            <div className={`p-3 rounded-lg shadow-sm ${
                msg.sender.name === 'You' ? 'bg-blue-200 text-gray-800' : 'bg-white text-gray-800'
              } max-w-[60%] border border-black relative ${editingMessageId === msg._id ? 'border-blue-500' : ''}`}
            >
              <div className="message-header flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <p className={`text-sm font-semibold ${msg.sender.name === 'You' ? 'text-blue-800' : 'text-gray-800'}`}>{msg.sender.name}</p>
                  {msg.edited && <span className="text-xs text-gray-500 mx-2">(Edited)</span>}
                </div>
                <p className="text-xs text-gray-400">{msg.time}</p>
              </div>

              <div
                className="message-body text-sm break-words"
                dangerouslySetInnerHTML={{ __html: formatMessageContent(msg) }}
              />

              {msg.file && (
                <div className="mt-1 text-xs flex items-center space-x-2">
                  <a href={msg.file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" download={msg.file.name}>
                    {msg.file.name}
                  </a>
                  {msg.file.type && <span className="text-gray-400 text-xs">({msg.file.type})</span>}
                </div>
              )}

              <div className="message-actions flex space-x-2 mt-2">
                <FontAwesomeIcon
                  icon={faReply}
                  onClick={() => handleReply(msg)}
                  className={`cursor-pointer ${getIconColor(msg._id, 'reply')}`}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  onClick={() => handleIconClick(msg._id, 'star')}
                  className={`cursor-pointer ${getIconColor(msg._id, 'star')}`}
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleIconClick(msg._id, 'heart')}
                  className={`cursor-pointer ${getIconColor(msg._id, 'heart')}`}
                />
                {msg.sender.name === 'You' && (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEdit(msg._id, msg.content)}
                      className="cursor-pointer text-gray-400 hover:text-blue-500"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(msg._id)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Box */}
      {replyingTo && (
        <div className="reply-box p-4 border-t border-gray-200 bg-gray-50 flex flex-col">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faReply} className="text-blue-500 mr-2" />
            <p className="text-sm text-blue-500">{`Replying to:`}</p>
          </div>
          <div className="reply-content p-2 bg-white border border-gray-200 rounded-lg">
            <p><strong>{replyingTo.sender.name}</strong> <span className="text-gray-500 text-xs">({replyingTo.time})</span></p>
            <p>{replyingTo.content}</p>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="message-input flex items-center p-4 border-t border-gray-200 bg-gray-50">
        <FontAwesomeIcon
          icon={faPaperclip}
          className="text-gray-500 cursor-pointer mr-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <ReactQuill
          value={message}
          onChange={handleQuillChange}
          onKeyDown={handleKeyDown}
          className="flex-1"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-full"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        {isRecording ? (
          <FontAwesomeIcon
            icon={faMicrophone}
            onClick={stopRecording}
            className="text-red-500 ml-2 cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMicrophone}
            onClick={startRecording}
            className="text-gray-500 ml-2 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default MessageContent;
