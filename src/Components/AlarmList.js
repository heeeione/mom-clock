import React from 'react';
import { Switch } from '@mui/material';
import DetailAlarm from './DetailAlarm';

const AlarmList = ({ alarmTimes, setAlarmTimes }) => {
  const [openDetailAlarm, setOpenDetailAlarm] = React.useState(false);
  const handleToggleAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.map((alarm, i) => i === index ? { ...alarm, active: !alarm.active } : alarm);
    setAlarmTimes(updatedAlarmTimes);
  };

  const handleRemoveAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.filter((_, i) => i !== index);
    setAlarmTimes(updatedAlarmTimes);
  };

  const handleDetailAlarm = () => setOpenDetailAlarm(true);
  const handleCloseDetailAlarm = () => setOpenDetailAlarm(false);

  return (<ul>
    {alarmTimes.map((alarm, index) => (<li key={index}>
      {alarm.time}
      <Switch
        checked={alarm.active}
        onChange={() => handleToggleAlarm(index)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <button onClick={() => handleRemoveAlarm(index)}>Remove</button>
      <button onClick={handleDetailAlarm}>Detail</button>
      <DetailAlarm open={openDetailAlarm} onClose={handleCloseDetailAlarm} />
    </li>))}
  </ul>);
};

export default AlarmList;
