import React from 'react';
import { Paper } from '@mui/material';

const AnimatedDeleteItem = ({ 
  isDeleting, 
  children, 
  sx = {},
  ...props 
}) => {
  return (
    <Paper
      sx={{
        transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isDeleting ? 0 : 1,
        transform: isDeleting ? 'scale(0.8)' : 'scale(1)',
        maxHeight: isDeleting ? '0px' : '1000px',
        marginTop: isDeleting ? 0 : undefined,
        marginBottom: isDeleting ? 0 : 2,
        padding: isDeleting ? '0px' : 2,
        overflow: 'hidden',
        bgcolor: '#2D3748',
        borderRadius: 1,
        transformOrigin: 'top',
        ...sx
      }}
      {...props}
    >
      {children}
    </Paper>
  )
};

export default AnimatedDeleteItem; 