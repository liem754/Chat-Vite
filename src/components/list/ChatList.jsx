import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

import search from "../../assets/search.png";
import { useEffect, useState } from "react";
import ItemChat from "./ItemChat";
import AddUser from "./addUser";
import { useUserStore } from "../../lib/useStore";
import { db } from "../../lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
function ChatList() {
  const { currentUser } = useUserStore();
  const [mode, setMode] = useState(false);
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
  return (
    <div className="mt-7">
      <div className="flex items-center justify-between gap-4">
        <div className=" flex items-center gap-4 bg-black-rgba5 py-2 px-3 rounded-md flex-1">
          <img src={search} alt="search" className="w-[20px] h-[20px]" />
          <input
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
        {chats.map((item) => (
          <ItemChat key={item.chatId} chat={item} />
        ))}
      </div>
      {mode && <AddUser />}
    </div>
  );
}

export default ChatList;
