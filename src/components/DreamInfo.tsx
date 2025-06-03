

interface Props {
    title: string;
    emoji : string;
    img : string;
    des : string;
    visible : boolean;
    onClose : () => void;
}

export default function DreamInfo({visible, onClose, title, emoji, img, des}: Props) {


    return (
        <div className={`${visible ? "visible opacity-100":"hidden opacity-0"} w-[300px] md:w-[500px] bg-white fixed z-20 rounded-2xl `}>
            <div style={{ backgroundImage: `url("${img}")` }} className={` relative rounded-t-2xl py-17 px-5 bg-cover bg-center bg-no-repeat`}>
                <div className="absolute inset-0 bg-black/50 rounded-t-2xl z-0"></div>
                <h1 className="text-white font-black text-[45px] text-shadow-black text-shadow-md mb-8 z-10 relative">{emoji} {title}</h1> 
                <button onClick={() => {onClose();}} className="absolute text-white cursor-pointer font-normal text-shadow-gray-800 text-shadow-md right-5 top-2 text-[20px] hover:text-gray-300">x</button> 
            </div>

            <div className="p-10 overflow-auto break-words whitespace-pre-line">
                {des}
            </div>
            
            

        
        </div>
            
        
    )
}