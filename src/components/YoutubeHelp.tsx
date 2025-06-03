import First from "../assets/first.jpg"
import Second from "../assets/second.jpg"
import Third from "../assets/third.jpg"

interface Props {
    visible : boolean;
    onClose : () => void;
}

export default function YoutubeHelp({visible, onClose}:Props) {
    return (
        <div className={`${visible ? "visible opacity-100":"hidden opacity-0"} p-10 w-[300px] md:w-[700px] h-[80%] bg-white fixed z-20  overflow-y-auto`}>
            <button onClick={() => {onClose();}} className="absolute right-5 top-5 hover:bg-gray-500 bg-black w-7 h-7 text-white rounded-full cursor-pointer duration-100">X</button> 
            <h1 className=" text-black font-bold text-[28px]  mb-8">How to get embed link from youtube video?</h1> 
            <div className="flex flex-col gap-15">
                <div>
                    1. Get youtube link normally.
                    <img className="w-[60%] mt-5" src={First} alt="" />
                </div>
                
                <div>
                    2. Go to <a href="https://iframely.com/domains/youtube?url=https%3A%2F%2Fyoutu.be%2FJGqzKmp_5Bg%3Fsi%3DBTj7qLrMeCIjj7gl" className="text-blue-500 underline" target="/">iframely.com</a>
                    , paste your link, and copy <span className="font-bold">"just a link"</span> like in the picture.
                    <img src={Second} className="mt-5" alt="" />
                </div>

                <div>
                    3. Paste to the website.
                    <img src={Third} className="mt-5" alt="" />
                </div>
                
            </div>
        </div>
            
        
    )
}