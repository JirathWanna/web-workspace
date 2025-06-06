import "./App.css"
import wallpaper from "./assets/steam-summer-sale.1920x1080.mp4"
import settingpic from "./assets/settings-3-fill.png"
import Setting from"./components/Setting"
import { useEffect, useState } from "react"
import Dream from "./components/Dream"
import AddDream from "./components/AddDream"
import CountDown from "./components/CountDown"
import AddCountDown from "./components/AddCountDown"
import AddIcon from "./assets/add-circle-line.svg"
import DreamInfo from "./components/DreamInfo"
import hamburger from "./assets/menu-line.svg"
import help from "./assets/question-line.svg"
import YoutubeHelp from "./components/YoutubeHelp"
import beach from "./assets/pexels-photo-457882.jpeg"
import FileUploader from "./components/FileUploader"
import userPic from "./assets/gray-user-profile-icon-png-fP8Q1P.png"

import youtube_logo from "./assets/youtube-line.svg"
import fire_logo from "./assets/fire-line.svg"
import image_logo from "./assets/image-line.svg"


function App() {
  //useState
  const [settingVisible, setSettingVisible] = useState(false);
  const [addDreamVisible, setAddDreamVisible] = useState(false);
  const [addCountDownVisible, setAddCountDownVisible] = useState(false);
  const [dreamInfoVisible, setDreamInfoVisible] = useState(false);
  const [youtubeVisible, setYoutubeVisible] = useState(false);

  const [rightSidePop, setRightSidePop] = useState(false);

  type Profile = {
    name : string;
    des : string;
    profile : string;
    yt_link : string;
    image_image : string;
  }

  const [profileArr, setProfileArr] = useState<Profile>(() => {
    const item = localStorage.getItem('profileArr');
    return item ? JSON.parse(item) : { name: "Username", des: "This is description. You can write anything.", profile: `${userPic}`,yt_link: "https://www.youtube.com/embed/CriW4rjSUPE?si=Jhg7_gke8VgwRnAr", image_image:`${beach}`};
  })

  useEffect (() => {
    localStorage.setItem('profileArr', JSON.stringify(profileArr));
  },[profileArr])
  



  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [youtubeLinkInput, setYoutubeLinkInput] = useState("");

  const [dreamShowing, setDreamShowing] = useState<Dream>();

  type Dream = {
    img : string;
    des : string;
    title : string;
    emoji : string;
  }
  const [dreams, setDream] = useState<Dream[]>(() => {
    const item = localStorage.getItem('dreams');
    return item ? JSON.parse(item) : [{img:beach, des:"I wanna go to Pattaya.", title:"This is your goal!", emoji:"🛫"}];
  })

  useEffect (() => {
    localStorage.setItem("dreams", JSON.stringify(dreams));
  },[dreams])

  type countDown = {
    title : string;
    duration : number;
  }

  const [countDowns, setCountDowns] = useState<countDown[]>(() => {
    const item = localStorage.getItem('countdowns');
    return item ? JSON.parse(item) : [{title:"Exam 1", duration:10000000000}];
  });

  useEffect (() => {
    localStorage.setItem("countdowns", JSON.stringify(countDowns));
  },[countDowns])

  
  function handleSave(newName:string, newDes:string, newProfile:string) {
    if (newProfile != "") {
      setProfileArr({ name: newName, des: newDes, profile: newProfile, yt_link:`${profileArr.yt_link}`, image_image:`${profileArr.image_image}`})
    } else {
      setProfileArr({ name: newName, des: newDes, profile:`${profileArr.profile}`, yt_link:`${profileArr.yt_link}`, image_image:`${profileArr.image_image}`})
    }
    
  }

  function handleAddDreamSave(newTitle:string, newDes:string, newEmoji:string, newImgUrl: string) {
    let newDream = {img : newImgUrl, title : newTitle, emoji : newEmoji, des:newDes};

    setDream((previous) => [...previous, newDream])
  }

  function handleDelete(inputIndex:number) {
    let updatedDream = dreams.filter((_,index) => (
      index != inputIndex
    ))

    setDream(updatedDream);
  }

  function handleDeleteCD(inputIndex:number) {
    const deleted = countDowns[inputIndex];
    if (deleted) {
      // ลบ localStorage ที่เกี่ยวข้อง
      localStorage.removeItem(`timer-endTime-${deleted.title}`);
    }
    let updatedCD = countDowns.filter((_,index) => (
      index != inputIndex
    ))

    setCountDowns(updatedCD)

  }

  function handleAddCountDownSave(newTitle:string, newDuration:number) {
    console.log(newDuration)
    let newCountDown = {title : newTitle, duration: newDuration};

    setCountDowns((previous) => [...previous, newCountDown])
  }

  function handleDreamClicked(dream:Dream) {
    setDreamInfoVisible(true);
    setDreamShowing(dream);
  }

  const [imgImg, setImgImg] = useState("");

  function handleimgimgurl(imgUrl:string) {
    setImgImg(imgUrl);
  }

  return (
    <div>
      <div className={`${settingVisible || addDreamVisible || addCountDownVisible || dreamInfoVisible || rightSidePop || youtubeVisible ? "absolute inset-0  bg-black/50 z-10" : "-z-50"} `}></div>
      
      {/*หน้าจอทั้งจอ */}
      <div className="h-screen w-screen flex justify-center items-center overflow-y-auto ">
        <video src={wallpaper} loop autoPlay muted className="w-full h-full object-cover -z-1 fixed"> </video>
        {/* Pop-up */}
        <Setting onSave={handleSave} visible={settingVisible} onClose={() => setSettingVisible(false)}></Setting>
        <AddDream onSave={handleAddDreamSave} onClose={() => setAddDreamVisible(false)} visible={addDreamVisible}></AddDream>
        <AddCountDown onSave={handleAddCountDownSave} visible={addCountDownVisible} onClose={() => setAddCountDownVisible(false)}></AddCountDown>
        <DreamInfo 
          title={dreamShowing?.title ?? ""} 
          emoji={dreamShowing?.emoji ?? ""} 
          img={dreamShowing?.img ?? ""} 
          des={dreamShowing?.des ?? ""}
          onClose={() => setDreamInfoVisible(false)} 
          visible={dreamInfoVisible}
        ></DreamInfo>
        <YoutubeHelp visible={youtubeVisible} onClose={() => setYoutubeVisible(false)}></YoutubeHelp>

        <div className="absolute bottom-0 text-black text-[12px] opacity-50">นี่เป็นเวอร์ชันทดลอง ไม่มีการเผยแพร่ในวงกว้าง ไม่มีการแสวงหาผลกำไร และภาพพื้นหลังไม่ใช่ของผู้สร้างแต่อย่างใด This is a test version. It is not publicly distributed, not intended for profit, and the background images do not belong to this website devoloper.</div>
        
        {/* กรอบสีฟ้าใหญ่ */}
        <div className="p-10 bg-gradient-to-bl from-cyan-200/70 to-sky-800/90 h-[92%] md:w-[80%] lg:w-[70%] rounded-2xl flex relative  w-[90%] overflow-y-auto ">
          
          {/* แถบซ้ายทั้งหมด */}
          <div className="flex-3/4  lg:pr-10 h-full flex flex-col">

            {/* แถบ Profile */}
            <div className="flex gap-[2vw]">
              <div className="w-[8vw] min-w-[75px] h-[8vw] min-h-[75px]"><img src={profileArr.profile} className="rounded-full border-4 border-white w-full h-full object-contain " alt="" /></div>
              <div>
                <h1 className="items-center gap-2 flex mb-[2vh] text-white font-black text-[32px] text-shadow-gray-800 text-shadow-md">{profileArr.name}
                  <div className="w-10"><button onClick={() => setSettingVisible(true)} className="cursor-pointer bg-none hover:bg-[#ffffff9c] rounded-full duration-100"><img src={settingpic}/></button></div>
                </h1>
                <span className="text-white text-[16px] font-medium text-shadow-gray-500 text-shadow-sm">{profileArr.des}</span>
              </div>
            </div>
            
            {/* Grid เก็บ Dream */}
            <div className="w-full mt-10 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 grid-cols-2 grid gap-[1vw]">
              
              {dreams.map((i,index) => (
                <Dream onClick={() => handleDreamClicked(i)} onDelete={() => handleDelete(index)} img={i.img} title={i.title} emoji={i.emoji} key={index}></Dream>
              ))}

              {/* ปุ่ม Add */}
              <div onClick={() => setAddDreamVisible(true)} className="flex justify-center items-center h-[20vh] rounded-2xl group cursor-pointer bg-gray-600/20 backdrop-blur-xs hover:bg-white/20 duration-200">
                <button className="group-hover:w-12 w-10 duration-200 cursor-pointer font-semibold"><img src={AddIcon} alt="" /></button>
              </div>
              
            </div>

            {/* เปิดเพลง */}
            <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0SM0LYsmbMT?utm_source=generator"
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg mt-5 lg:mt-auto"
                title="Spotify player"
              ></iframe>

          </div>
          
          
          <button onClick={() => setRightSidePop(!rightSidePop)} className="lg:hidden absolute right-5 top-5 float-right"><img src={hamburger} className="w-5" alt="" /></button>
          {/* แถบขวาทั้งหมด */}
          <div className={`${rightSidePop ? "fixed flex z-20 right-[5vw] top-5 bg-white/50" : "hidden"} lg:flex lg:flex-1/4 overflow-y-auto scroll-smooth  bg-gradient-to-b from-black/20 to-gray-800/50 h-full lg:w-full min-w-60 backdrop-blur-sm rounded-[5px]  flex-col items-center  px-[1vw] py-[5vh]`}>
            
            {rightSidePop ? <div onClick={() => setRightSidePop(false)} className="absolute right-5 top-5 cursor-pointer font-normal text-shadow-gray-800 text-shadow-md text-[20px] text-white hover:text-gray-300">x</div> : ""}
            

            {/* Count down */}
            <h1 className="text-white font-black text-[32px] min-font- text-shadow-gray-800 text-shadow-md mb-10">Count Down</h1>
              
            <div className="w-full flex flex-col items-center group">
              <div className="w-full flex flex-col gap-5 items-center">
                {countDowns.map((i,index) => (
                  <CountDown onDelete={() => handleDeleteCD(index)} title={i.title} duration={i.duration} key={index}></CountDown>
                ))}
              </div>

              <button onClick={() => setAddCountDownVisible(true)} className="w-7 h-7 mb-3 rounded-[100%] cursor-pointer  text-center text-black visible opacity-100 hover:w-8 mt-5 duration-100"><img src={AddIcon} alt="" /></button>
              
            </div>
              
              
              
              
            <div className="w-full">

              {/* ปุ่มเลือก */}
              <div className="flex w-full border-b-2 border-white/70 mb-5 gap-x-1 py-2">
                <div onClick={() => setSelectedTabIndex(0)} className="bg-white/90 overflow-hidden h-6 flex px-1 text-[10px] items-center cursor-pointer hover:bg-gray-300/70 duration-200 rounded-[5px] xl:text-[12px]"><img src={youtube_logo} alt="" className="w-6" />Youtube</div>
                <div onClick={() => setSelectedTabIndex(1)} className="bg-white/90 overflow-hidden h-6 flex px-1 text-[10px] items-center cursor-pointer hover:bg-gray-300/70 duration-200 rounded-[5px] xl:text-[12px]"><img src={fire_logo} alt="" className="w-6" />Streak</div>
                <div onClick={() => setSelectedTabIndex(2)} className="bg-white/90 overflow-hidden h-6 flex px-1 text-[10px] items-center cursor-pointer hover:bg-gray-300/70 duration-200 rounded-[5px] xl:text-[12px]"><img src={image_logo} alt="" className="w-6" />Image</div>
              </div>

              {/* ส่วนที่แสดง */}

              {selectedTabIndex == 0 && 
                <div>
                  <iframe  className="rounded-[5px] w-full" src={profileArr.yt_link} title="Youtube" allowFullScreen></iframe>
                  <div className="mt-3 flex-col gap-3  flex">
                    <div className="flex">
                      <input value={youtubeLinkInput} onChange={(e) => setYoutubeLinkInput(e.target.value)} placeholder="Add Youtube Embed Link" type="text" className="bg-white rounded-[5px] p-1 w-full" />
                      <button onClick={() => setYoutubeVisible(true)} className="mx-1"><img src={help} className="w-7 cursor-pointer" alt="" /></button>
                    </div>
                    <button onClick={() => setProfileArr({ name: profileArr.name, des: profileArr.des, profile:`${profileArr.profile}`, yt_link:`${youtubeLinkInput}`, image_image:`${profileArr.image_image}`})} className="rounded-[5px] bg-blue-500 text-white cursor-pointer">OK</button>
                  </div>
                    
                </div>
              }

              {selectedTabIndex == 1 && <div>Coming soon</div>}

              {selectedTabIndex == 2 && 
                <div>
                  <img src={profileArr.image_image} className="w-fit" alt="" />
                  <div className="mt-3 flex-col gap-3  flex">
                    <FileUploader onSend={handleimgimgurl}></FileUploader>
                    <button onClick={() => setProfileArr({ name: profileArr.name, des: profileArr.des, profile:`${profileArr.profile}`, yt_link:`${profileArr.yt_link}`, image_image:`${imgImg}`})} className="rounded-[5px] bg-blue-500 text-white cursor-pointer">OK</button>
                  </div>
                </div>
              }

            </div>
              
          </div>
          

        </div>

      </div>
    </div>
  )
}

export default App
