  import express from 'express';

  import { createQuotation, confirmQuotationEmail, checkVerificationStatus } from '../controllers/quotationController.js'
  // import { sendCompletionEmail } from '../controllers/quotationController.js';
  import upload from '../middlewares/multerMiddleware.js';
  import {createProduct, getProducts, deleteProduct, updateProduct  } from '../controllers/addProductsController.js'
  import { updateProject, deleteProject, getProjects, createProject} from '../controllers/addProjectsController.js';
  import { getDashboardStats } from '../controllers/DashboardController.js';
  import { createSaNewProject, getAllProjects, deleteProjectById, getProjectById } from '../controllers/saNewProjectController.js';
  import { getMembersAndSuperAdmins } from '../controllers/getallMemberController.js';
  import {createUser } from '../controllers/userController.js';
  import { loginUser, forgotPassword, resetPassword } from '../controllers/authController.js';
  import {verifyLoginOtp, verifyTwoFactorAuth, resendOtp } from '../controllers/adminAuthentication.js';
  import { refreshToken } from '../utils/jwtUtils.js';
  import { protect, verifySuperAdmin } from '../middlewares/middleware.js';
  import { ContactEunivate } from '../controllers/contactEunivate.js';
  import { updateUser, updateUserPassword } from '../controllers/updateUserInformation.js';
  import { inviteUsers, updateUserRole, getUsers} from '../controllers/peopleController.js';
  import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/addEventsController.js';
  import { getQuotations, deleteQuotation, checkNotifications } from '../controllers/getQuotationAdminController.js';
  import { createTask, getTasks, getTaskById, updateTask, getTasksByProjectId, deleteTask } from '../controllers/saAddTaskController.js';
  import { findUserByUsername } from '../controllers/findUserNameIDController.js';
const router = express.Router();

// User Authentication Routes
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/verify-otp', verifyTwoFactorAuth);  
router.post('/verify-login-otp',  verifyLoginOtp);  
router.post('/resend-otp',  resendOtp);  
router.post('/refresh-token', refreshToken);

//User Messages Related
router.post('/contactEunivate',ContactEunivate );

//SuperAdminRoutes
router.post('/sa-newproject', createSaNewProject);
router.get('/sa-getnewproject', getAllProjects);
router.delete('/sa-newproject/:id', deleteProjectById);
router.get('/sa-getnewproject/:id', getProjectById)
router.get('/members-superadmins', getMembersAndSuperAdmins);
router.get('/findByUsername/:username', findUserByUsername);

// Task Routes
router.post('/sa-task', createTask);         
router.get('/sa-tasks', getTasks);  
router.get('/sa-tasks/:projectId', getTasksByProjectId);       
router.get('/sa-tasks/:id', getTaskById);     
router.put('/sa-tasks/:id', updateTask);     
router.delete('/sa-tasks/:id', deleteTask);  


// User Management Routes
router.get('/', getUsers); 
router.post('/signup', createUser);  
router.post('/', upload.single('profilePicture'), createUser);
router.post('/invite', inviteUsers);  
router.put('/:userId/role', updateUserRole); 

// quotation route
router.post('/quotation',createQuotation);
router.get('/quotation/confirm/:quotationToken', confirmQuotationEmail);
router.get('/quotations/:id/status', checkVerificationStatus);
// router.post('/quotation/send-completion-email', sendCompletionEmail);


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