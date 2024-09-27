  import express from 'express';

  import { createQuotation, confirmQuotationEmail, checkVerificationStatus } from '../controllers/Client/quotationController.js'
  import upload from '../middlewares/multerMiddleware.js';
  import {createProduct, getProducts, deleteProduct, updateProduct  } from '../controllers/AdminControllers/addProductsController.js'
  import { updateProject, deleteProject, getProjects, createProject} from '../controllers/AdminControllers/addProjectsController.js';
  import { getDashboardStats } from '../controllers/AdminControllers/DashboardController.js';
  import { createSaNewProject, getAllProjects, getProjectById, inviteUsersToProject } from '../controllers/SuperAdmin/Project/saNewProjectController.js';
  import {createUser } from '../controllers/UserAccounts/userController.js'
  import { loginUser, forgotPassword, resetPassword } from '../controllers/UserAccounts/authController.js';
  import {verifyLoginOtp, verifyTwoFactorAuth, resendOtp } from '../controllers/SuperAdmin/adminAuthentication.js';
  import { refreshToken } from '../utils/jwtUtils.js';
  import { protect, verifySuperAdmin } from '../middlewares/middleware.js';
  import { ContactEunivate } from '../controllers/Client/contactEunivate.js'
  import { updateUser, updateUserPassword } from '../controllers/UserAccounts/updateUserInformation.js'
  import { inviteUsers, updateUserRole, getInvitedUsers, removeInvitedMember, getUsers} from '../controllers/SuperAdmin/People/peopleController.js';
  import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/AdminControllers/addEventsController.js';
  import { getQuotations, deleteQuotation, checkNotifications } from '../controllers/Client/getQuotationAdminController.js';
  import { getAddedMembers, createTask, getTasks, getTaskById, updateTaskStatusById, getTasksByProjectId, deleteTask } from '../controllers/SuperAdmin/Task/saAddTaskController.js';
  import { findUserByUsername } from '../controllers/findUserNameIDController.js';
  import { assignProjectToUser } from '../controllers/SuperAdmin/Project/assignUserProjectController.js';
  import { addMemberToProject } from '../controllers/SuperAdmin/Project/sa-addMember.js';


const router = express.Router();

// User Authentication Routes
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/verify-otp', protect, verifyTwoFactorAuth);  
router.post('/verify-login-otp',  verifyLoginOtp);  
router.post('/resend-otp',  resendOtp);  
router.post('/refresh-token', refreshToken);

//User Messages Related
router.post('/contactEunivate',ContactEunivate );

//SuperAdminRoutes
router.post('/sa-newproject',protect, createSaNewProject);
router.post('/sa-invite-users',protect,  inviteUsers);
router.get('/sa-getnewproject', protect, getAllProjects);
router.get('/sa-getnewproject/:id', protect,  getProjectById)
router.get('/findByUsername/:username', findUserByUsername);

//get the Invited users from people on superadmin
router.get('/invited', protect, getInvitedUsers);
router.delete('/invited/:id', protect, removeInvitedMember);
//people Controller
router.put('/assign-project', protect, assignProjectToUser);
//add member on the project details on user add icon
router.post('/add-member-to-project', addMemberToProject);
// Task Routes
router.get('/get-assignee', getAddedMembers);
router.post('/sa-task', createTask,);         
router.get('/sa-tasks', getTasks);  
router.get('/sa-tasks/:projectId', getTasksByProjectId); 
router.get('/sa-tasks/:id', getTaskById);     
router.patch('/sa-tasks/:id', updateTaskStatusById);     
router.delete('/sa-tasks/:id', deleteTask);  


// User Management Routes
router.get('/', getUsers); 
router.post('/signup', createUser);  
router.post('/', upload.single('profilePicture'), createUser);
router.post('/invite', protect, inviteUsers); 
// router.get('/invitedMembers', protect, getInvitedMembersByUserId); 
router.put('/:userId/role', updateUserRole); 


// quotation route  
router.post('/quotation',createQuotation);
router.get('/quotation/confirm/:quotationToken', confirmQuotationEmail);
router.get('/quotations/:id/status', checkVerificationStatus);


// User Update Routes
router.put('/:id', updateUser);
router.put('/:id/password', updateUserPassword);

//Admin Routes
      //Products
      router.post('/addproduct', upload.single('image'), createProduct );
      router.get('/products', getProducts);
      router.delete('/products/:id', deleteProduct);
      router.put('/products/:id', upload.single('image'), updateProduct);
      //Projects
      router.post('/addproject', upload.single('image'), createProject);
      router.get('/projects', getProjects);
      router.put('/projects/:id', upload.single('image'), updateProject);
      router.delete('/projects/:id', deleteProject);
      //Events
      router.post('/addevent', upload.single('image'), createEvent);
      router.get('/events', getEvents);
      router.put('/events/:id', upload.single('image'), updateEvent);
      router.delete('/events/:id', deleteEvent);
      //Dashboard
      router.get('/stats', getDashboardStats);
      // Get all quotations
      router.get('/quotations', getQuotations);
      router.delete('/quotations/:id', deleteQuotation);
      //Notification for admin
      router.get('/notifications', checkNotifications);
// SuperAdmin Route (Protected)
router.get('/superadmin', protect, verifySuperAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the SuperAdmin dashboard' });
});

export default router;