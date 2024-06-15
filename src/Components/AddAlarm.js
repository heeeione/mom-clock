import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const AddAlarm = ({ open, onClose, onSave }) => {
  const [time, setTime] = React.useState('');

  const handleSave = () => {
    onSave(time);
    onClose();
  };

  return (<React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Set Alarm
          </Typography>
          <TextField
            label="Alarm Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default AddAlarm;
