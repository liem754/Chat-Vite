import avatar from "../../assets/avatar.png";
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";
import video from "../../assets/video.png";

function UserInfo() {
  return (
    <div className="flex items-center justify-between">
      <div className=" flex items-center gap-2">
        <img
          src={avatar}
          alt="avatar"
          className="w-[50px] h-[50px] rounded-[50%]"
        />
        <span>Name</span>
      </div>
      <div className=" flex items-center gap-4">
        <img src={more} alt="avatar" className="w-[15px] h-[15px]" />
        <img src={video} alt="avatar" className="w-[15px] h-[15px]" />
        <img src={edit} alt="avatar" className="w-[15px] h-[15px]" />
      </div>
    </div>
  );
}

export default UserInfo;
