import { useState } from "react";
import FileUploader from "./FileUploader";

interface Props {
    visible : boolean;
    onClose : () => void;
    onSave : (title: string, description: string, emoji: string, imgUrl: string) => void;
}

export default function AddDream({visible, onClose, onSave}: Props) {

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[emoji, setEmoji] = useState("");
    const[imgUrl, setImgUrl] = useState("");

    function handleImgUrl(imgUrl:string) {
        setImgUrl(imgUrl)
    }

    function handleReset() {
        setTitle("");
        setDescription("");
        setEmoji("");
        setImgUrl("");
    }

    return (
        <div className={`${visible ? "visible opacity-100":"hidden opacity-0"} w-[300px] md:w-[500px] overflow-y-auto bg-white fixed z-20 rounded-2xl p-10`}>
            <div className="flex items-center justify-between">
                <h1 className=" text-black font-black text-[32px] text-shadow-gray-400 text-shadow-md mb-8">Add Your Dream</h1> 
                <button onClick={() => {handleReset(); onClose();}} className="hover:bg-gray-500 bg-black w-7 h-7 text-white rounded-full cursor-pointer duration-100">X</button> 
            </div>
            
            
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"/>

            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-20 p-5 border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"></textarea>

            Emoji <br />
            <input value={emoji} onChange={(e) => setEmoji(e.target.value)} type="text" className="w-20 border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"/> <br />
            
            Image 
            <FileUploader onSend={handleImgUrl}></FileUploader>

            <button onClick={title.length > 0  ? () => {onSave(title, description, emoji, imgUrl) ; handleReset();  onClose();} : () => alert("Please Enter a Name") } className="float-right cursor-pointer bg-blue-500 text-white p-3 mt-5 rounded-2xl">Change</button>

            

        </div>
            
        
    )
}