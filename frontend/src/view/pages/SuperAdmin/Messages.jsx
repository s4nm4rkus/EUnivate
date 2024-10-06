import React, { useState } from 'react'; 
import MessageContent from '../../components/SuperAdmin/MessageContent';
import SidebarMessage from '../../components/SuperAdmin/SidebarMessage';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import MediaModal from '../../components/MediaModal';

const Messages = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMedia, setModalMedia] = useState(null);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    // Define your messages array or fetch it from a state or props
    const messages = []; // Replace this with actual message data

    const openModal = (media) => {
        setModalMedia(media);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalMedia(null);
    };

    const toggleProjectDropdown = () => setIsProjectDropdownOpen(!isProjectDropdownOpen);
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-6"> {/* Adjust padding for different screens */}
            {/* Dashboard Text */}
            <div className="flex justify-between items-center mb-6 md:mb-12">  {/* Adjust bottom margin for different screens */}
                <h1 className="text-lg md:text-xl font-medium text-gray-800">Messages</h1>  {/* Adjust font size for smaller screens */}
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">  {/* Stack vertically on mobile, horizontally on larger screens */}
                <div className="w-full md:w-1/4">  {/* Sidebar occupies full width on mobile, 1/4 on larger screens */}
                    <SidebarMessage />  {/* Sidebar Component */}
                </div>
                <div className="w-full md:w-3/4">  {/* Message content occupies full width on mobile, 3/4 on larger screens */}
                    <MessageContent />  {/* Message Content Component */}
                </div>
            </div>

            {/* Render messages */}
            <div className="mt-6">  {/* Add top margin to separate messages */}
                {messages.map((msg, index) => (
                    <div key={index} className="message mb-4">  {/* Add margin-bottom for spacing */}
                        {msg.file && (
                            msg.file.type.startsWith('image/') ? (
                                <img
                                    src={msg.file.url}
                                    alt={msg.file.name}
                                    className="message-file cursor-pointer max-w-full h-auto"
                                    onClick={() => openModal(msg.file)}
                                />
                            ) : msg.file.type.startsWith('video/') ? (
                                <video
                                    controls
                                    src={msg.file.url}
                                    className="message-file cursor-pointer max-w-full h-auto"
                                    onClick={() => openModal(msg.file)}
                                />
                            ) : (
                                <a href={msg.file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {msg.file.name}
                                </a>
                            )
                        )}
                    </div>
                ))}
            </div>

            {/* Media Modal */}
            <MediaModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                media={modalMedia}
            />
        </div>
    );
};

export default Messages;
