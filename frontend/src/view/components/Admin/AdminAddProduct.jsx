import React, { useState } from 'react';
import { Box, Button, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AdminAddProduct = () => {
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
        <Typography color="primary" sx={{ cursor: 'pointer', color: '#8B0000' }}>
          Upload Image
        </Typography>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          mb: 4,
        }}
      >
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: '#f5f5f5' }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          sx={{ backgroundColor: '#f5f5f5' }}
        />
      </Box>

      {/* Availability Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          mb: 4,
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Availability
        </Typography>
        <RadioGroup row defaultValue="Available" sx={{ justifyContent: 'flex-start' }}>
          <FormControlLabel
            value="Available"
            control={<Radio />}
            label="Available"
            sx={{
              '& .MuiSvgIcon-root': {
                display: 'none', // Hide the default radio button icon
              },
              '& .MuiFormControlLabel-label': {
                color: '#008080',
                backgroundColor: '#E0F2F1',
                borderRadius: '12px',
                padding: '8px 16px',
                border: '2px solid #008080',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#D1ECEA',
                },
              },
              '&.Mui-checked .MuiFormControlLabel-label': {
                color: 'white',
                backgroundColor: '#008080',
                border: '2px solid #008080',
              },
            }}
          />
          <FormControlLabel
            value="Pending"
            control={<Radio />}
            label="Pending"
            sx={{
              '& .MuiSvgIcon-root': {
                display: 'none', // Hide the default radio button icon
              },
              '& .MuiFormControlLabel-label': {
                color: '#FFA500',
                backgroundColor: '#FFF3E0',
                borderRadius: '12px',
                padding: '8px 16px',
                border: '2px solid #FFA500',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#FFE5B4',
                },
              },
              '&.Mui-checked .MuiFormControlLabel-label': {
                color: 'white',
                backgroundColor: '#FFA500',
                border: '2px solid #FFA500',
              },
            }}
          />
          <FormControlLabel
            value="NotAvailable"
            control={<Radio />}
            label="Not Available"
            sx={{
              '& .MuiSvgIcon-root': {
                display: 'none', // Hide the default radio button icon
              },
              '& .MuiFormControlLabel-label': {
                color: '#808080',
                backgroundColor: '#ECEFF1',
                borderRadius: '12px',
                padding: '8px 16px',
                border: '2px solid #808080',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#D3D3D3',
                },
              },
              '&.Mui-checked .MuiFormControlLabel-label': {
                color: 'white',
                backgroundColor: '#808080',
                border: '2px solid #808080',
              },
            }}
          />
        </RadioGroup>
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

export default AdminAddProduct;
