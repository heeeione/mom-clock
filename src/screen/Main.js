import React, {useEffect, useState} from "react";

const Main = () => {
    const [alarmTime, setAlarmTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAlarmSet, setIsAlarmSet] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleAlarmChange = (event) => {
        setAlarmTime(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const setAlarm = () => {
        setIsAlarmSet(true);
        alert(`Alarm set for ${alarmTime}`);
    };

    return (
        <div style={styles.container}>
            <h1>React Alarm Clock</h1>
            <div style={styles.inputGroup}>
                <input
                    type="time"
                    value={alarmTime}
                    onChange={handleAlarmChange}
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
