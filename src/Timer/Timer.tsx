import { useEffect, useState } from "react";

interface Props {
    duration : number;
    onSendTime : (time:number) => void;
}

export default function Timer({duration,onSendTime}:Props) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000);
        },1000)
        onSendTime(time);
    },[time])

    const getFormattedTime = (milliseconds:number) => {
        let total_seconds = Math.floor(milliseconds / 1000);
        let total_minutes = Math.floor(total_seconds / 60);
        let total_hours = Math.floor(total_minutes / 60);
        let days = Math.floor(total_hours / 24);

        let seconds = total_seconds % 60;
        let minutes = total_minutes % 60;
        let hours = total_hours % 24;

        return `${days} : ${hours} : ${minutes} : ${seconds}`;
    }

    return(
        <div>{getFormattedTime(time)}</div>
    )
}