// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const isAuthenticatedAndNeedsOtp = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user && user.twoFactorEnabled && !localStorage.getItem('token');
// };

// const isSignupAndNeedsOtp = () => {
//   const user = JSON.parse(localStorage.getItem('signupUser'));
//   return user && user.twoFactorEnabled && !localStorage.getItem('token');
// };

// const PrivateRoute = ({ element }) => {
//   return isAuthenticatedAndNeedsOtp() || isSignupAndNeedsOtp() ? (
//     element
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;
