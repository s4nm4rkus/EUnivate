import React, { useState, useEffect, useRef } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';
import Kanban from './Kanban';
import List from './List';
import Calendar from './Calendar';
import GanttChart from './GanttChart';
import RaciMatrix from './RaciMatrix';

const ProjectdetailsMem = () => {
  return (
    <div>ProjectdetailsMem</div>
  )
}

export default ProjectdetailsMem