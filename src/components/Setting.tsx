import { useState } from "react";
import FileUploader from "./FileUploader";

interface Props {
    visible : boolean;
    onClose : () => void;
    onSave : (name: string, Description: string, imgUrl: string) => void;
}



export default function setting({visible, onClose, onSave}:Props) {
    type Profile = {
        name : string;
        des : string;
        profile : string;
    }

    const [profileArr] = useState<Profile>(() => {
        const item = localStorage.getItem('profileArr');
        return item ? JSON.parse(item) : { name: "", des: "", profile: `` };
    })


    const [name, setName] = useState(profileArr.name);
    const [description, setDescription] = useState(profileArr.des);
    const[imgUrl, setImgUrl] = useState(profileArr.profile);

    function handleImgUrl(imgUrl:string) {
        setImgUrl(imgUrl)
    }
    

    return (
        <div className={` ${visible ? "visible opacity-100":"hidden opacity-0"} h-[70%] w-[300px] md:w-[500px] overflow-y-auto bg-white fixed z-20 rounded-2xl p-10`}>
            <div className="flex items-center justify-between">
                <h1 className=" text-black font-black text-[32px] text-shadow-gray-400 text-shadow-md mb-8">Profile Setting</h1> 
                <button onClick={onClose} className="hover:bg-gray-500 bg-black w-7 h-7 text-white rounded-full cursor-pointer duration-100">X</button> 
            </div>
            
            
            Name
            <input value={name}  onChange={(e) => setName(e.target.value)} type="text" className="w-full border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"/>

            Description
            <textarea value={description}  onChange={(e) => setDescription(e.target.value)} className="w-full h-30 p-5 border-2 border-gray-500 mt-3 rounded-[10px] px-5 mb-5"></textarea>

            Profile Image 
            <FileUploader onSend={handleImgUrl}></FileUploader>

            <button onClick={name.length > 0 ? () => {onSave(name, description, imgUrl) ;  onClose();} : () => alert("Please Enter a Name") }  className="float-right mt-5 cursor-pointer bg-blue-500 text-white p-3 rounded-2xl">Change</button>

        </div>
            
        
    )
}