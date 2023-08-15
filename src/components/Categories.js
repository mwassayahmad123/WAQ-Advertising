// Categories.js
import React from 'react';
import { Typography, Grid, Button, Paper } from '@mui/material';
import { Toys, Laptop, PhoneAndroid, Business, AttachMoney, DirectionsCar, Build, DirectionsBike, Home, Lightbulb, Print, BuildCircle, Work, Style, Weekend, Pets, CameraAlt, HomeWork, ChildFriendly, MenuBook } from '@mui/icons-material';

const Categories = () => {
  const categoryData = [
    { name: 'Laptop', icon: <Laptop /> },
    { name: 'Mobile', icon: <PhoneAndroid /> },
    { name: 'Accessories', icon: <Business /> },
    { name: 'Jewelry', icon: <AttachMoney /> },
    { name: 'Cars', icon: <DirectionsCar /> },
    { name: 'Appliances', icon: <Home /> },
    { name: 'Fashion', icon: <Style /> },
    { name: 'Furniture', icon: <Weekend /> },
  ];

  return (
    <div>
      <Typography variant="h6" sx={{ margin: '20px 0 10px 0', textAlign: 'center' }}>
        Categories
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {categoryData.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              component={Button}
              variant="outlined"
              fullWidth
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'lightblue',
                },
              }}
            >
              {category.icon}
              <Typography variant="subtitle2" sx={{ marginTop: '8px' }}>
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Categories;
