import React, {useEffect, useState} from "react";
import alarm_sound from "../assets/iphone_alarm.mp3"
import useSound from 'use-sound';
import AlarmList from "../Components/AlarmList";
import {Modal,Box,Typography} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Main = () => {
    const [play, {stop}] = useSound(alarm_sound);
    const [openAlarmModal, setOpenAlarmModal] = React.useState(false)
    const handleAlarmModal = () => setOpenAlarmModal(true)
    const handleClose = () => setOpenAlarmModal(false)

    // 알람 리스트에는 저장된 알람을 불러와야 함
    return (<React.Fragment>
        <h1>알람</h1>
        <button onClick={handleAlarmModal}>+</button>
        <AddAlarm></AddAlarm>
        <AlarmList >
        </AlarmList>
    </React.Fragment>);
}
export default Main;
