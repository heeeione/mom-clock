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

const DetailAlarm = ({ open, onClose, alarm, onSave, onDelete }) => {
  const [time, setTime] = React.useState(alarm ? alarm.time : '');

  React.useEffect(() => {
    if (alarm) {
      setTime(alarm.time);
    }
  }, [alarm]);

  const handleSave = () => {
    if (alarm) {
      onSave({ ...alarm, time });
      onClose();
    }
  };

  const handleDelete = () => {
    if (alarm) {
      onDelete(alarm.idx);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Edit Alarm
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailAlarm;
