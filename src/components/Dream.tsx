import { useState, useEffect, useRef} from "react";

interface Props {
    img : string;
    title : string;
    emoji : string;
    onDelete : () => void;
    onClick : () => void;
}


export default function Dream({img,title,emoji,onDelete,onClick}:Props) {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    let menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handler)

        return() => {
            document.removeEventListener("mousedown", handler)
        }
    });

    

    return(
        <div  className="w-full h-full group cursor-pointer overflow-hidden relative">
            
            <div className="right-2 top-2 absolute w-fit flex items-end flex-col">

                <button onClick={() => setDropDownOpen(!dropDownOpen)} className="group-hover:opacity-100 hover:bg-white/50 opacity-0 bg-white/70 w-7 rounded-[10px] px-2 duration-200 cursor-pointer text-center">...</button>
                
                <div ref={menuRef} className={`${dropDownOpen ? "visible" : "hidden"} bg-white rounded-[8px] flex flex-col p-1 mt-1`}>
                    <button onClick={() => { onDelete(); setDropDownOpen(false); }} className="bg-white px-2 text-red-500 rounded-2xl text-[14px] hover:bg-gray-200 cursor-pointer">Delete</button>
                    
                </div>

            </div>
            
            <img onClick={onClick} src={img} alt="" className="w-full rounded-t-2xl h-[15vh] object-cover"/>
            <div onClick={onClick} className="w-full h-[5vh] bg-white rounded-b-2xl group-hover:bg-white/80 duration-200 px-3 flex items-center group-hover:px-4 ">{emoji} {title}</div>
        </div>
    )
}