import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AdminAddProject = () => {
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
        maxWidth: '900px',
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
        <Typography color="primary" sx={{ cursor: 'pointer', color: '#8B0000' }}>
          Upload Image
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          mb: 4,
        }}
      >
        <Box sx={{ width: '45%' }}>
          <TextField
            label="Capstone Project Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: '#f5f5f5' }}
          />
          <TextField
            label="Team Members"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: '#f5f5f5' }}
          />
          <TextField
            label="Adviser"
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: '#f5f5f5' }}
          />
        </Box>
        <Box sx={{ width: '50%' }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={8}
            sx={{ backgroundColor: '#f5f5f5' }}
          />
        </Box>
      </Box>

      {/* Save Button */}
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
        Save
      </Button>
    </Box>
  );
};

export default AdminAddProject;
