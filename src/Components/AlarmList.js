import React from 'react';
import { Switch } from '@mui/material';
import DetailAlarm from './DetailAlarm';

const AlarmList = ({ alarmTimes, setAlarmTimes }) => {
  const [openDetailAlarm, setOpenDetailAlarm] = React.useState(false);
  const [selectedAlarm, setSelectedAlarm] = React.useState(null);
  const handleToggleAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.map((alarm, i) => i === index ? { ...alarm, active: !alarm.active } : alarm);
    setAlarmTimes(updatedAlarmTimes);
  };

  const handleDetailAlarm = () => setOpenDetailAlarm(true);
  const handleCloseDetailAlarm = () => setOpenDetailAlarm(false);
  const handleSaveEditedAlarm = (editedAlarm) => {
    const updatedAlarmTimes = alarmTimes.map(alarm =>
      alarm.idx === editedAlarm.idx ? editedAlarm : alarm
    );
    setAlarmTimes(updatedAlarmTimes);
    setSelectedAlarm(null);
  };
  const handleSelectAlarm = (alarm) => setSelectedAlarm(alarm);
  const handleRemoveAlarm = (index) => {
    const updatedAlarmTimes = alarmTimes.filter((_, i) => i !== index);
    setAlarmTimes(updatedAlarmTimes);
  };
  ;

  return (
    <React.Fragment>
      <ul>
        {alarmTimes.map((alarm, index) => (<li key={index} onClick={() => handleSelectAlarm(alarm)}>
          {alarm.time}
          <Switch
            checked={alarm.active}
            onChange={() => handleToggleAlarm(index)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <button onClick={handleDetailAlarm}>Detail</button>
          <DetailAlarm open={openDetailAlarm} onClose={handleCloseDetailAlarm} />
        </li>))}
      </ul>
      {selectedAlarm && (
        <DetailAlarm
          open={Boolean(selectedAlarm)}
          onClose={handleCloseDetailAlarm}
          alarm={selectedAlarm}
          onSave={handleSaveEditedAlarm}
          onRemove={handleRemoveAlarm}
        />
      )}
    </React.Fragment>
  );
};

export default AlarmList;
