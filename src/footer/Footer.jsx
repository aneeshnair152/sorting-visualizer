import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';


export default function GuestFooter() {
    return (
      <Paper sx={{
      marginTop: '20px',
      width: '100%',
      position: 'relative',
      bottom: 0,
      width: '100%',
      backgroundColor: '#8282FF'
      }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
          </Box>
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Thank you for checking it out!
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }