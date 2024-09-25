import avatar from "../../assets/avatar.png";

function ItemChat() {
  return (
    <div className=" border-b border-b-[#dddddd35] flex items-center gap-4 py-3">
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
  );
}

export default ItemChat;
