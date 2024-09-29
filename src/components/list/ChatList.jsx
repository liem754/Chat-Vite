/* eslint-disable no-unused-vars */
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import avatar from "../../assets/avatar.png";
import search from "../../assets/search.png";
import { useCallback, useEffect, useState } from "react";
import AddUser from "./addUser";
import { useUserStore } from "../../lib/useStore";
import { db } from "../../lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { connectStorageEmulator } from "firebase/storage";
function ChatList() {
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const [mode, setMode] = useState(false);
  const [input, setInput] = useState("");

  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const docRef = doc(db, "users", item.receiverId);
          const docSnap = await getDoc(docRef);
          const user = docSnap.data();
          return { ...item, user };
        });
        const chats = await Promise.all(promises);
        setChats(chats.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.id]);
  const handleSelect = async (chat) => {
    const userchats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userchats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userchats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userchats,
      });
      changeChat(chat?.chatId, chat?.user);
    } catch (error) {
      console.log(error);
    }
  };
  const chatFilter = chats.filter((c) =>
    c.user?.username.toLowerCase()?.includes(input.toLowerCase())
  );

  return (
    <div className="mt-7 ">
      <div className="flex items-center justify-between gap-4 px-4 ">
        <div className=" flex items-center gap-4 bg-black-rgba5 p-2 rounded-md flex-1">
          <img src={search} alt="search" className="w-[20px] h-[20px]" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
            className="outline-none border-none bg-transparent text-white placeholder-gray-300 text-sm "
          />
        </div>

        <div
          className="rounded-md bg-black-rgba5 cursor-pointer p-[10px]"
          onClick={() => setMode(!mode)}
        >
          <img
            src={mode ? minus : plus}
            alt="plus"
            className="w-[15px] h-[15px]  "
          />
        </div>
      </div>
      <div className="scroll overflow-y-auto h-[500px] mt-4">
        {chatFilter.map((item) => (
          <div
            key={item.chatId}
            onClick={() => handleSelect(item)}
            className={`${
              item?.isSeen ? "bg-transparent" : "bg-[#5183fe]"
            } cursor-pointer border-b border-b-[#dddddd35] flex items-center gap-4 py-3 px-4`}
          >
            <img
              src={
                item?.user?.blocked?.includes(currentUser.id)
                  ? avatar
                  : item?.user?.avatar || avatar
              }
              alt="avatar"
              className="w-[40px] h-[40px] rounded-[50%]"
            />
            <div className="">
              <span className="text-sm">
                {item?.user?.blocked?.includes(currentUser.id)
                  ? "User"
                  : item?.user?.username}
              </span>
              <p className={` text-xs`}>{item?.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {mode && <AddUser />}
    </div>
  );
}

export default ChatList;
