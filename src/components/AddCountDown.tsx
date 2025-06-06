
import { useState } from "react";

interface Props {
    visible : boolean;
    onClose : () => void;
    onSave : (title: string, duration: number) => void;
}

export default function AddCountDown({visible, onClose, onSave}: Props) {
    const[title, setTitle] = useState("");
    const [inputDate, setInputDate] = useState<string | undefined>("");

    const [diffMs, setDiffMs] = useState<number | null>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(e.target.value);
        const now = new Date();

        const diff = selectedDate.getTime() - now.getTime(); // ระยะห่างเป็นมิลลิวินาที
        setInputDate(e.target.value);
        setDiffMs(diff);
    };

    const convertToFormula = (ms: number): number => {
        const oneDay = 24 * 60 * 60 * 1000;
        const days = Math.floor(ms / oneDay);
        return (days+1) * 24 * 60 * 60 * 1000;
    };
    

    return (
        <div className={`${visible ? "visible opacity-100":"hidden opacity-0"} h-[50%] w-[300px] md:w-[500px] overflow-y-auto bg-white fixed z-1000 rounded-2xl p-10`}>
            <div className="flex items-center justify-between">
                <h1 className=" text-black font-black text-[32px] text-shadow-gray-400 text-shadow-md mb-8">Add Countdown</h1> 
                <button onClick={onClose} className="hover:bg-gray-500 bg-black w-7 h-7 text-white rounded-full cursor-pointer duration-100">X</button> 
            </div>
            
            
            Name
            <input onChange={(e) => {setTitle(e.target.value)}} type="text" className="w-full border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"/>


            <div>
                <h1>Deadline Date</h1>
                <input value={inputDate} className="mt-3" type="date" onChange={handleChange} />
            </div>
            
            {diffMs !== null && (
                <div>
                ระยะห่าง: {convertToFormula(diffMs)} (เป็นมิลลิวินาที)
                </div>
            )}

            <button
                onClick={title.length > 0 ? () => {
                    if (diffMs !== null) {
                        const converted = convertToFormula(diffMs);
                        onSave(title, converted);
                        onClose();
                    }
                } : () => alert("Please Enter a Title")}

                disabled={diffMs === null}
                className="float-right cursor-pointer bg-blue-500 text-white p-3 rounded-2xl disabled:opacity-50"
                
            >
                Change
            </button>

            

        </div>
            
        
    )
}