import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ backgroundColor: 'black '}}> About </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Algorithm Time Complexities:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Merge Sort: O(nlog(n))
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Selection Sort: O(n^2)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Heap Sort: O(nlog(n))
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Quick Sort: O(nlog(n))
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bubble Sort: O(n^2)
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}