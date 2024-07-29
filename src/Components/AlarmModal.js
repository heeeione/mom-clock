import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';

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

const AlarmModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" color="#000">
          알람
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} color="#000">
          알람이 울리고 있습니다!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            종료
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlarmModal;
