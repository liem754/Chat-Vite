import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

import search from "../../assets/search.png";
import { useState } from "react";
import ItemChat from "./ItemChat";
function ChatList() {
  const [mode, setMode] = useState(false);
  return (
    <div className="mt-5 ">
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
      <div className="scroll overflow-y-auto h-[500px] mt-2">
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
        <ItemChat />
      </div>
    </div>
  );
}

export default ChatList;
