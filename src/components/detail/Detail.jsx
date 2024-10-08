import avatar from "../../assets/avatar.png";
import arrowUp from "../../assets/arrowUp.png";
import arrowDown from "../../assets/arrowDown.png";
import download from "../../assets/download.png";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/useStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Detail() {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserStore();

  const {
    isReceiverBlocked,
    isCurrentUserBlocked,

    changeBlock,
    user,
  } = useChatStore();

  const handleBlock = async () => {
    if (!user) return;
    const userRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-1 p-3 text-sm">
      <div className="flex flex-col items-center border-b border-b-[#dddddd35] justify-center mt-2">
        <img
          src={user?.avatar || avatar}
          alt="avatar"
          className="w-[70px] h-[70px] rounded-[50%] text-center"
        />
        <p className="text-lg mt-3">{user?.username}</p>
        <span>lorem</span>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center">
          <h3>Setting</h3>
          <img
            src={arrowUp}
            alt="up"
            className="w-[35px] h-[35px] rounded-[50%] bg-black-rgba5 p-3 "
          />
        </div>
      </div>

      <div className="py-1">
        <div className="flex justify-between items-center">
          <h3>Privacy & Help</h3>
          <img
            src={arrowUp}
            alt="up"
            className="w-[35px] h-[35px] rounded-[50%] bg-black-rgba5 p-3 "
          />
        </div>
      </div>

      <div className="py-1">
        <div className="flex justify-between items-center">
          <h3>Setting</h3>
          <img
            src={arrowUp}
            alt="up"
            className="w-[35px] h-[35px] rounded-[50%] bg-black-rgba5 p-3 "
          />
        </div>
      </div>

      <div className={`py-1 `}>
        <div className="flex justify-between items-center">
          <h3>Shared photos</h3>
          <img
            src={!show ? arrowDown : arrowUp}
            alt="up"
            className="w-[35px] h-[35px] rounded-[50%] bg-black-rgba5 p-3 "
            onClick={() => setShow(!show)}
          />
        </div>
        <div
          className={`mt-2 w-full ${
            show ? "top-[100%]" : "top-[-500%]"
          } transition-all overflow-y-auto scroll h-[200px] p-1 `}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2 ">
              <img src={avatar} alt="vd" className="w-[35px] h-[35px]" />
              <span>name</span>
            </div>
            <img
              src={download}
              alt="download"
              className="w-[25px] h-[25px] rounded-[10%] bg-black-rgba5 p-2"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleBlock}
        className="border-none outline-none w-full py-2 bg-red-400 text-white rounded-md mt-3"
      >
        {isCurrentUserBlocked
          ? "You are Block"
          : isReceiverBlocked
          ? "User Block"
          : "Block User"}
      </button>
      <button
        onClick={() => auth.signOut()}
        className="border-none outline-none w-full py-2 bg-black text-white rounded-md mt-3"
      >
        Log out
      </button>
    </div>
  );
}

export default Detail;
