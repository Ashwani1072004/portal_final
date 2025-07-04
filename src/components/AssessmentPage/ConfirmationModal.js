import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonColor = '#EF4444',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#0A2E3C',
          color: 'white',
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: '#9CA3AF' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          {cancelButtonText}
        </Button>
        <Button 
          onClick={onConfirm}
          sx={{ 
            bgcolor: confirmButtonColor, 
            color: 'white', 
            '&:hover': { 
              bgcolor: confirmButtonColor,
              filter: 'brightness(0.9)'
            } 
          }}
          variant="contained"
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default ConfirmationModal; 