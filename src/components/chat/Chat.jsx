import avatar from "../../assets/avatar.png";
import phone from "../../assets/phone.png";
import info from "../../assets/info.png";
import video from "../../assets/video.png";
import img from "../../assets/img.png";
import camera from "../../assets/camera.png";
import mic from "../../assets/mic.png";
import icon from "../../assets/emoji.png";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function Chat() {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const handle = (e) => {
    setText((prev) => prev + e.emoji);
    setShow(false);
  };
  return (
    <div className="flex-2 border-r border-r-[#dddddd35] flex flex-col justify-between">
      <div className="top border-b-[#dddddd35] p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-[50%]"
          />
          <div className="">
            <span className="text-md">Name</span>
            <p className="text-sm">chat</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src={phone} alt="avatar" className="w-[15px] h-[15px]" />
          <img src={video} alt="avatar" className="w-[15px] h-[15px]" />
          <img src={info} alt="avatar" className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div className=" scroll overflow-y-auto flex flex-col">
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="self-end flex text-xs  w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span className="flex flex-start text-xs w-[70%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat animi
          sapiente magnam enim quo amet porro, eum aut molestiae expedita
          blanditiis deserunt corporis totam illo quisquam aspernatur
          doloremque! Quia, impedit.
        </span>
      </div>
      <div className="bottom flex items-center gap-3 p-3">
        <div className="flex items-center gap-3">
          <img src={img} alt="avatar" className="w-[20px] h-[20px]" />
          <img src={camera} alt="avatar" className="w-[20px] h-[20px]" />
          <img src={mic} alt="avatar" className="w-[20px] h-[20px]" />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border-none outline-none p-2 rounded-lg bg-black-rgba5 text-white placeholder-gray-300 text-sm "
          placeholder="Message"
        />
        <div className="flex items-center gap-3">
          <div className=" relative">
            <img
              src={icon}
              alt="avatar"
              className="w-[20px] h-[20px]"
              onClick={() => setShow((pre) => !pre)}
            />

            <div className="absolute bottom-[40px] left-0">
              <EmojiPicker open={show} onEmojiClick={handle} />
            </div>
          </div>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
