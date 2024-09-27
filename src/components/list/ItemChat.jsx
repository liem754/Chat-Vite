/* eslint-disable react/prop-types */
import avatar from "../../assets/avatar.png";

// eslint-disable-next-line react/prop-types
function ItemChat({ chat }) {
  return (
    <div className=" border-b border-b-[#dddddd35] flex items-center gap-4 py-3">
      <img
        // eslint-disable-next-line react/prop-types
        src={chat?.user?.avatar || avatar}
        alt="avatar"
        className="w-[40px] h-[40px] rounded-[50%]"
      />
      <div className="">
        <span className="text-sm">{chat?.user?.username}</span>
        <p className="text-xs">{chat?.lastMessage}</p>
      </div>
    </div>
  );
}

export default ItemChat;
