import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faStar, faHeart, faPaperPlane, faPaperclip, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MessageContent = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

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

  const sendVoiceMessage = () => {
    if (audioBlob) {
      // Handle audio message upload
    }
  };

  return (
    <div className="message-content flex-1 bg-gray-100 p-6">
      {/* Header */}
      <div className="header mb-4">
        <h2 className="text-xl font-semibold">Superboard</h2>
        <p className="text-sm text-gray-600">Superboard general chat</p>
      </div>

      {/* Messages */}
      <div className="messages flex flex-col space-y-4">
        <div className="message flex">
          <div className="avatar mr-4">
            <img src="https://via.placeholder.com/40" alt="Mark Wazauiski" className="rounded-full" />
          </div>
          <div className="message-content bg-white p-4 rounded-lg shadow-sm flex-1">
            <div className="message-header flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Dan Carlo Pogi</p>
              <p className="text-xs text-gray-400">12:50 PM</p>
            </div>
            <p className="text-sm">Kati ng bulbol ko mga pri. Sarap mag pa brazillian wax.</p>
            <div className="message-actions flex space-x-2 mt-2">
              <FontAwesomeIcon icon={faReply} className="text-gray-400 cursor-pointer" />
              <FontAwesomeIcon icon={faStar} className="text-gray-400 cursor-pointer" />
              <FontAwesomeIcon icon={faHeart} className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Add more messages here following the same structure */}
      </div>

      {/* Message Input */}
      <div className="message-input mt-4">
        <div className="relative">
          {/* ReactQuill with placeholder */}
          <ReactQuill
            value={message}
            onChange={handleQuillChange}
            className="bg-white border rounded-lg shadow-sm"
            theme="snow"
            placeholder="Type a message..."
          />

          {/* Icons inside ReactQuill */}
          <div className="absolute right-2 top-2 flex items-center space-x-2 z-10">
            <label className="cursor-pointer">
              <input type="file" className="hidden" />
              <FontAwesomeIcon icon={faPaperclip} className="text-gray-600" style={{ fontSize: '1rem' }} />
            </label>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2 transition duration-300 ${isRecording ? 'bg-red-500 text-white' : 'text-gray-600'}`}
            >
              <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '1rem' }} />
            </button>
          </div>

          {/* Send Message Button */}
          <button className="absolute right-2 bottom-2 p-2 text-blue-500 hover:text-blue-600 transition duration-300 z-10">
            <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: '1rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageContent;
