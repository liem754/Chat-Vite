import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

function List() {
  return (
    <div className=" flex-1 py-3 border-r border-r-[#dddddd35]">
      <UserInfo />
      <ChatList />
    </div>
  );
}

export default List;
