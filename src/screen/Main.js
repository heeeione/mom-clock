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
            console.log(alarm.phoneNumber)
            // 5분 후 알람이 종료되지 않은 경우 SMS 전송
            setTimeout(() => {
              if (openRingModal) {
                sendSMS(alarm.phoneNumber);
              }
            }, 300000); // 5분 = 300000 ms

            return { ...alarm, active: false }; // 알람을 비활성화
          }
          return alarm;
        })
      );
    };

    const interval = setInterval(checkAlarms, 1000);

    return () => clearInterval(interval);
  }, [play, openRingModal]);
  const handleAlarmModal = () => setOpenAlarmModal(true);
  const handleClose = () => setOpenAlarmModal(false);
  const handleRingModalClose = () => {
    setOpenRingModal(false);
    stop();
  };
  const handleSaveAlarm = (time, phoneNumber) => {
    const formattedAlarmTime = new Date(`1970-01-01T${time}:00`).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    setAlarmTimes([...alarmTimes, { time: formattedAlarmTime, phoneNumber, active: true, idx: alarmTimes.length }]);
    setOpenAlarmModal(false);
  };

  const sendSMS = (phoneNumber) => {}
  return (
    <React.Fragment>
    <h1>알람</h1>
    <button onClick={handleAlarmModal}>+</button>
    <AddAlarm open={openAlarmModal} onClose={handleClose} onSave={handleSaveAlarm} />
    <AlarmList alarmTimes={alarmTimes} setAlarmTimes={setAlarmTimes} />
    <AlarmModal open={openRingModal} onClose={handleRingModalClose} />
  </React.Fragment>);
};
export default Main;
