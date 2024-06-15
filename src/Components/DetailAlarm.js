import { Box, Modal, TextField, Typography, Button } from '@mui/material';
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

const DetailAlarm = ({ open, onClose, alarm, onSave, onRemove }) => {
  const [editedTime, setEditedTime] = React.useState(alarm?.time);

  const handleTimeChange = (event) => setEditedTime(event.target.value);
  const handleSave = () => {
    const formattedAlarmTime = new Date(`1970-01-01T${editedTime}:00`).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    onSave({ ...alarm, time: formattedAlarmTime });
  };
  const handleRemove = () => onRemove(alarm.idx);
  return (<Modal open={open} onClose={onClose}>
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        알람 상세 정보
      </Typography>
      <TextField
        label="알람 시간"
        type="time"
        value={editedTime}
        onChange={handleTimeChange}
        fullWidth
        sx={{ mt: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          저장
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          삭제
        </Button>
      </Box>
    </Box>
  </Modal>);
};

export default DetailAlarm;
