import React from 'react';
import alarm_sound from '../assets/iphone_alarm.mp3';
import useSound from 'use-sound';
import AlarmList from '../Components/AlarmList';
import AddAlarm from '../Components/AddAlarm';

const Main = () => {
  const [play, { stop }] = useSound(alarm_sound);
  const [openAlarmModal, setOpenAlarmModal] = React.useState(false);
  const [alarmTimes, setAlarmTimes] = React.useState([]);
  const handleAlarmModal = () => setOpenAlarmModal(true);
  const handleClose = () => setOpenAlarmModal(false);

  const handleSaveAlarm = (time) => {
    const formattedAlarmTime = new Date(`1970-01-01T${time}:00`).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    setAlarmTimes([...alarmTimes, { time: formattedAlarmTime, active: true, idx: alarmTimes.length }]);
    setOpenAlarmModal(false);
  };

  return (<React.Fragment>
    <h1>알람</h1>
    <button onClick={handleAlarmModal}>+</button>
    <AddAlarm open={openAlarmModal} onClose={handleClose} onSave={handleSaveAlarm} />
    <AlarmList alarmTimes={alarmTimes} setAlarmTimes={setAlarmTimes} />
  </React.Fragment>);
};
export default Main;
