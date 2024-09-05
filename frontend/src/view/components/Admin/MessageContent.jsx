import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faStar, faHeart, faPaperPlane, faPaperclip, faMicrophone, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  const messagesEndRef = useRef(null); // Ref to keep track of the end of the messages

  const handleQuillChange = (value) => setMessage(value);

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
      const newMessage = {
        content: message,
        sender: { name: 'You', avatar: 'https://via.placeholder.com/40' },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: file ? { name: file.name, type: file.type, url: URL.createObjectURL(file) } : null,
      };
  
      // Immediately update the local messages array
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
  
        // Update the message with server response data if necessary
        const data = await response.json();
        setMessages((prevMessages) => prevMessages.map(msg =>
          msg === newMessage ? data : msg
        ));
      } catch (error) {
        console.error('Error sending message:', error);
      }
  
      setMessage('');
      setFile(null);
    }
  };
  

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Ensure to scroll every time messages update

  const handleIconClick = (messageId, icon) => {
    setActiveIcons((prevActiveIcons) => ({
      ...prevActiveIcons,
      [messageId]: prevActiveIcons[messageId] === icon ? null : icon,
    }));
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

  return (
    <div className="message-content flex flex-col bg-white">
      {/* Header */}
      <div className="header mb-2 pl-2">
        <h2 className="text-xl font-semibold">Superboard</h2>
        <p className="text-sm text-gray-600 mt-2">Superboard general chat</p>
      </div>

      <hr className="border border-gray-200 mt-4" />

      {/* Messages */}
      <div className="messages flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message flex items-start space-x-4 ${msg.sender.name === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender.name !== 'You' && (
              <img src={msg.sender.avatar} alt={msg.sender.name} className="rounded-full w-10 h-10 mt-2" />
            )}
            <div className={`p-2 rounded-lg shadow-sm ${msg.sender.name === 'You' ? 'bg-blue-100' : 'bg-white'} max-w-[60%]`}>
              <div className="message-header flex justify-between items-center mb-1">
                <p className="text-sm font-semibold mr-2">{msg.sender.name}</p>
                <p className="text-xs text-gray-400">{msg.time}</p>
              </div>
              <div className="text-sm break-words" dangerouslySetInnerHTML={{ __html: msg.content }} />
              {msg.file && (
                  <div className="mt-1 text-xs flex items-center space-x-2">
                    <a 
                      href={msg.file.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline"
                      download={msg.file.name} // Ensures the file keeps its original name when opened or downloaded
                    >
                      {msg.file.name}
                    </a>
                    <span className="text-gray-400 text-xs">({msg.file.type})</span>
                  </div>
                )}
              <div className="message-actions flex space-x-2 mt-2">
                <FontAwesomeIcon
                  icon={faReply}
                  onClick={() => handleIconClick(msg.id, 'reply')}
                  className={`cursor-pointer ${getIconColor(msg.id, 'reply')}`}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  onClick={() => handleIconClick(msg.id, 'star')}
                  className={`cursor-pointer ${getIconColor(msg.id, 'star')}`}
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleIconClick(msg.id, 'heart')}
                  className={`cursor-pointer ${getIconColor(msg.id, 'heart')}`}
                />
              </div>
            </div>
            {msg.sender.name === 'You' && (
              <img src={msg.sender.avatar} alt={msg.sender.name} className="rounded-full w-10 h-10 mt-2" />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input p-4 bg-white border-t sticky bottom-0">
        <div className="relative flex items-center">
          <ReactQuill
            value={message}
            onChange={handleQuillChange}
            onKeyDown={handleKeyDown}
            className="bg-white border rounded-lg shadow-sm flex-1"
            theme="snow"
            placeholder="Enter a message..."
          />

          {/* Icons */}
          <div className="absolute right-2 top-0 flex flex-col items-center space-y-2 z-10">
            {/* Attachment Icon */}
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <FontAwesomeIcon icon={faPaperclip} className="text-gray-600" style={{ fontSize: '1rem' }} />
              {/* Microphone Icon */}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2 transition duration-300 ${isRecording ? 'bg-red-500 text-white' : 'text-gray-600'}`}
              >
                <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '1rem' }} />
              </button>
            </label>
          </div>

          {/* Send Message Button */}
          <button
            onClick={sendMessage}
            className="absolute right-2 bottom-2 p-2 text-blue-500 hover:text-blue-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        {/* File Preview Section */}
        {file && (
          <div className="file-preview mt-2 p-2 bg-gray-100 border rounded-lg flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">{file.name}</span> ({file.type})
            </div>
            <button onClick={removeFile} className="text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageContent;
