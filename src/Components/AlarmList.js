import React from 'react';
import { Switch } from '@mui/material';


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
    <React.Fragment>
      <ul>
        {alarmTimes.map((alarm, index) => (<li key={index}>
          {alarm.time}
          <Switch
            checked={alarm.active}
            onChange={() => handleToggleAlarm(index)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <button onClick={()=>handleRemoveAlarm(index)}>Remove</button>
        </li>))}
      </ul>
    </React.Fragment>
  );
};

export default AlarmList;
