import { useState, type ChangeEvent } from "react"

interface Props {
    onSend : (imgUrl:string) => void;
}


export default function FileUploader({onSend} : Props) {

    const [file, setFile] = useState<File | null>(null);

    const [imageUrl, setImageUrl] = useState("");
    
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImageUrl(base64);
                onSend(base64);
            };
            reader.readAsDataURL(selectedFile); // แปลงเป็น base64
        }
    }

    

    return(
        <div>
            <input type="file" onChange={handleFileChange} className="mt-3 w-full bg-gray-200 p-1 border-2 border-gray-500 rounded-[10px] "/>
            {file && (
                <div>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <img className="h-20" src={imageUrl} alt="" />
                </div>
            )}
            
        </div>
    )
}