import React from 'react';
import { List, ListItem, ListItemText, Switch, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AlarmList = ({ alarmTimes, setAlarmTimes }) => {
  const handleToggleAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.map((alarm, i) => i === index ? { ...alarm, active: !alarm.active } : alarm);
    setAlarmTimes(updatedAlarmTimes);
  };

  const handleRemoveAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.filter((_, i) => i !== index);
    setAlarmTimes(updatedAlarmTimes);
  };

  return (
    <List>
      {alarmTimes.map((alarm, index) => (
        <ListItem key={index} secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAlarm(index)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={alarm.time} />
          <Switch
            checked={alarm.active}
            onChange={() => handleToggleAlarm(index)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AlarmList;
