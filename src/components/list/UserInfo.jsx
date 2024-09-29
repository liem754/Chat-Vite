/* eslint-disable no-unused-vars */
import avatar from "../../assets/avatar.png";
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";
import video from "../../assets/video.png";
import { useUserStore } from "../../lib/useStore";

function UserInfo() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  return (
    <div className=" px-4 flex items-center justify-between">
      <div className=" flex items-center gap-4">
        <img
          src={currentUser.avatar}
          alt="avatar"
          className="w-[45px] h-[45px] rounded-[50%]"
        />
        <span>{currentUser.username}</span>
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
