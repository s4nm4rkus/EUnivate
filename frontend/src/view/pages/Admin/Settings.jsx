import React from "react";
import Profile from './Profile';
import Notifications from './Notification';
import Account from './Account';
import Privacy from './Privacy';
import Apps from './Apps';

const Settings = () => {
    return (
        <div className="min-h-screen flex items-start justify-center p-4">
            {/* Box with shadow */}
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex mt-10 ">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className=" w-52 p-4 flex flex-col space-y-2">
                        <a href="#profile" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Profile
                        </a>

                        <a href="#notification" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Notification
                        </a>

                        <a href="#account" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Account
                        </a>

                        <a href="#privacy-policy" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Privacy Policy
                        </a>

                        <a href="#apps" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Apps
                        </a>
                    </div>

                  {/* Main content */}
                    <div className="flex-1 p-4 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                        <section id="profile" className="mb-6"> {/* Margin bottom */}
                            <Profile />
                        </section>
    
                        <section id="notification" className="mb-6"> {/* Margin bottom */}
                            <Notifications />
                        </section>

                        <section id="account" className="mb-6"> {/* Margin bottom */}
                            <Account />
                        </section>

                        <section id="privacy-policy" className="mb-6"> {/* Margin bottom */}
                            <Privacy />
                        </section>

                        <section id="apps">
                            <Apps />
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
