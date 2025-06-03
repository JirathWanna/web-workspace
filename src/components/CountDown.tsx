import Timer from "../Timer/Timer"

interface Props {
    title : string;
    duration : number;
    onDelete : () => void;
}



export default function CountDown({title, duration, onDelete}:Props) {

    function handleTimeSend(time:number) {
        console.log(time);
    }

    return (
        <>
            <div className="relative w-full bg-white/30 text-center text-white font-bold text-[20px] text-shadow-gray-800 text-shadow-md p-2 rounded-[5px] ">
                <button onClick={onDelete} className="absolute cursor-pointer font-normal text-shadow-gray-800 text-shadow-md right-2 top-0 text-[16px] hover:text-gray-300">x</button>
                {title} 
                <br /> 
                <span className="text-white font-semibold text-[14px] text-shadow-gray-800 text-shadow-md"> <Timer onSendTime={handleTimeSend} duration={duration}></Timer> </span> 
            </div>
        </>
    )
}