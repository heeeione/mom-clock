import React, {useEffect, useState} from "react";
import alarm_sound from "../assets/iphone_alarm.mp3"
import useSound from 'use-sound';

const Main = () => {
    const [alarmTime, setAlarmTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAlarmSet, setIsAlarmSet] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [alarmTimes, setAlarmTimes] = useState([]);
    const [play] = useSound(alarm_sound)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const currentTimeString = currentTime.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        //오후 02:21, ['14:22']
        if (isAlarmSet && alarmTimes.includes(currentTimeString)) {
            play()
            alert('알람이 울립니다!');
            setAlarmTimes(alarmTimes.filter(time => time !== currentTimeString));
        }
    }, [currentTime, isAlarmSet, alarmTimes]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlarmTime(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const setAlarm = () => {
        const formattedAlarmTime = new Date(`1970-01-01T${alarmTime}:00`).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        setAlarmTimes([...alarmTimes, formattedAlarmTime]);
        setIsAlarmSet(true);
        alert(`알람이 설정되었습니다: ${formattedAlarmTime}`);
        setAlarmTime('');
    };

    return (
        <div style={styles.container}>
            <h1>React Alarm Clock</h1>
            <div style={styles.inputGroup}>
                <input
                    type="time"
                    value={alarmTime}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <button onClick={setAlarm} style={styles.button}>Set Alarm</button>
            </div>
            <div style={styles.inputGroup}>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter phone number"
                    style={styles.input}
                />
            </div>
            <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
            <h3>설정된 알람 시간:</h3>
            <ul>
                {alarmTimes.map((time, index) => (
                    <li key={index}>{time}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    input: {
        marginRight: '10px',
        padding: '5px',
        fontSize: '16px',
    },
    button: {
        padding: '5px 10px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};


export default Main;
