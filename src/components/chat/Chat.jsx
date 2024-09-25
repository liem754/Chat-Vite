import avatar from "../../assets/avatar.png";
import phone from "../../assets/phone.png";
import info from "../../assets/info.png";
import video from "../../assets/video.png";
function Chat() {
  return (
    <div className="flex-2 border-r border-r-[#dddddd35]">
      <div className="top border-b-[#dddddd35] p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-[50%]"
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
    </div>
  );
}

export default Chat;
