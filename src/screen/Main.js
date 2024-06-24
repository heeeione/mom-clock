import React from 'react';
import alarm_sound from '../assets/iphone_alarm.mp3';
import useSound from 'use-sound';
import AlarmList from '../Components/AlarmList';
import AddAlarm from '../Components/AddAlarm';
import AlarmModal from '../Components/AlarmModal';

const Main = () => {
  const [play, { stop }] = useSound(alarm_sound);
  const [openAlarmModal, setOpenAlarmModal] = React.useState(false);
  const [openRingModal, setOpenRingModal] = React.useState(false);
  const [alarmTimes, setAlarmTimes] = React.useState([]);
  const [ringingAlarm, setRingingAlarm] = React.useState(null);
  React.useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      setAlarmTimes(prevAlarmTimes =>
        prevAlarmTimes.map(alarm => {
          if (alarm.time === currentTime && alarm.active) {
            play();
            setRingingAlarm(alarm);
            setOpenRingModal(true);
            return { ...alarm, active: false };
          }
          return alarm;
        })
      );
    };

    const interval = setInterval(checkAlarms, 1000);

    return () => clearInterval(interval);
  }, [play]);
  const handleAlarmModal = () => setOpenAlarmModal(true);
  const handleClose = () => setOpenAlarmModal(false);
  const handleRingModalClose = () => {
    setOpenRingModal(false);
    stop();
  };
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
    <AlarmModal open={openRingModal} onClose={handleRingModalClose} />
  </React.Fragment>);
};
export default Main;
