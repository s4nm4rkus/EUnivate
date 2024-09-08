import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AdminAddEvents = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        borderRadius: '12px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
        mt: 6,
      }}
    >
      {/* Upload Image Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4,
          position: 'relative',
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-image">
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <PhotoCamera sx={{ fontSize: 50, color: '#888888' }} />
            )}
          </Box>
        </label>
        <Typography color="primary" sx={{ cursor: 'pointer', color: '#0000FF' }}>
          Upload Cover Photo
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          width: '100%',
          mb: 4,
        }}
      >
        <TextField
          label="Event Name"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Time"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          sx={{ gridColumn: 'span 2', backgroundColor: '#f5f5f5' }}
        />
      </Box>

      {/* Add Now Button */}
      <Button
        variant="contained"
        color="error"
        sx={{
          width: '200px',
          height: '50px',
          borderRadius: '25px',
          backgroundColor: '#8B0000',
        }}
      >
        Add Now
      </Button>
    </Box>
  );
};

export default AdminAddEvents;
