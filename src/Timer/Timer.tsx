import { useEffect, useState } from "react";

interface Props {
    duration : number;
    onSendTime : (time:number) => void;
    title: string; // เพิ่ม title เพื่อใช้เป็น key
}

export default function Timer({duration,onSendTime, title}:Props) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        const storageKey = `timer-endTime-${title}`;
        let endTime = localStorage.getItem(storageKey);
        let now = Date.now();

        if (!endTime) {
            endTime = (now + duration).toString();
            localStorage.setItem(storageKey, endTime);
        }

        const interval = setInterval(() => {
            const left = parseInt(endTime!) - Date.now();
            setTime(left > 0 ? left : 0);
            onSendTime(left > 0 ? left : 0);
            if (left <= 0) {
                clearInterval(interval);
                localStorage.removeItem(storageKey);
            }
        }, 1000);

        return () => clearInterval(interval);
    // เพิ่ม title, duration ใน dependency เผื่อเปลี่ยน countdown
    }, [title, duration]);

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