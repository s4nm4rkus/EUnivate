// import express from 'express';
// import chatMessageRoutes from '../routes/chatMessageRoutes.js';

// const app = express();
// app.use(express.json());

// // Chat message routes
// app.use('/api/messages', chatMessageRoutes);

// // Global error handler for this function
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Something went wrong on the server!',
//     error: process.env.NODE_ENV === 'production' ? {} : err.message,
//   });
// });

// export default app;
