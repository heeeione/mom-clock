import React from 'react';
import alarm_sound from '../assets/iphone_alarm.mp3';
import useSound from 'use-sound';
import AlarmList from '../Components/AlarmList';
import AddAlarm from '../Components/AddAlarm';
import AlarmModal from '../Components/AlarmModal';
import { sendSMS } from '../axios/sms';
import formatPhoneNumber from '../utils/formatPhoneNumber';

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
            setTimeout(() => {
              // 최신 상태 값을 가져오기 위해 함수형 업데이트 사용
              setOpenRingModal(currentOpenRingModal => {
                if (currentOpenRingModal) {
                  console.log('Hi');
                  sendSMS(formatPhoneNumber(alarm.phoneNumber), "지각이에요!!!")
                    .then(response => {
                      alert("문자가 전송되었습니다!")
                    })
                    .catch(error => {
                      alert("에러 발생!")
                    });
                }
                return currentOpenRingModal;
              });
            }, 10000);

            return { ...alarm, active: false };
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
