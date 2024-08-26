import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

/* Client Pages */
import LandingPage from './view/pages/Client/MainPage';
import About from './view/pages/Client/About';
import Advantage from './view/pages/Client/Advantage';
import Contact from './view/pages/Client/Contact';
import OurTeam from './view/pages/Client/OurTeam';
import EuStore from './view/pages/Client/EuStore';
import Mission from './view/pages/Client/Mission';
import Events from './view/pages/Client/Events';
import Quotation from './view/pages/Client/Quotation';
import Showcases from './view/pages/Client/Showcases';
import Challenges from './view/pages/Client/Challenges';
import ProjectManagement from './view/pages/Client/ProjectManagement';
import Webinars from './view/pages/Client/Webinars';
import Login from './view/pages/Client/Login.jsx';
import Signup from './view/pages/Client/Signup.jsx';
import Forgotpassword from './view/pages/Client/Forgotpassword.jsx';
import ResetPassword from './view/pages/Client/Resetpassword.jsx';
import CTA from "./view/components/Client/LastSection/CTA.jsx";
import MainPage from './view/pages/Client/MainPage.jsx';

//Hooks


//Client
import User from './view/pages/Client/User.jsx';



// Admins
import AdminLayout from './view/components/Admin/AdminLayout';
import Dashboard from './view/pages/Admin/Dashboard';
import Project from './view/pages/Admin/Project';
import Task from './view/pages/Admin/Task';
import People from './view/pages/Admin/People';
import Messages from './view/pages/Admin/Messages';

/* Global CSS */
import './index.css';
import './admin.css';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/about" element={<About />} />
        <Route path="/advantage" element={<Advantage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/eu-store" element={<EuStore />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/events" element={<Events />} />x
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/showcases" element={<Showcases />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/project" element={<ProjectManagement />} />
        <Route path="/webinar" element={<Webinars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgotpassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        {/* Admin Routes */}
        <Route
          path="/superadmin/*"
          element={
      
              <AdminLayout />
            
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="project" element={<Project />} />
          <Route path="task" element={<Task />} />
          <Route path="people" element={<People />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Client */}
        <Route path="/user" element={<User />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
