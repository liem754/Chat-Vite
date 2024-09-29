import avatar from "../../assets/avatar.png";
import phone from "../../assets/phone.png";
import info from "../../assets/info.png";
import video from "../../assets/video.png";
import camera from "../../assets/camera.png";
import mic from "../../assets/mic.png";
import icon from "../../assets/emoji.png";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/useStore";
import upload from "../../lib/upload";

function Chat() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const endRef = useRef(null);
  const [show, setShow] = useState(false);
  const { chatId, user, isReceiverBlocked, isCurrentUserBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handle = (e) => {
    setText((prev) => prev + e.emoji);
    setShow(false);
  };
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), async (res) => {
      setChat(res.data());
    });
    return () => {
      unsub();
    };
  }, [chatId]);
  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });
      const userIds = [currentUser.id, user.id];
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);
        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };
  console.log(chat);

  return (
    <div className="flex-2 border-r border-r-[#dddddd35] flex flex-col justify-between">
      <div className="top border-b-[#dddddd35] p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || avatar}
            alt="avatar"
            className="w-[45px] h-[45px] rounded-[50%]"
          />
          <div className="">
            <span className="text-md">{user?.username}</span>
            <p className="text-sm">chat</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src={phone} alt="avatar" className="w-[15px] h-[15px]" />
          <img src={video} alt="avatar" className="w-[15px] h-[15px]" />
          <img src={info} alt="avatar" className="w-[15px] h-[15px]" />
        </div>
      </div>
      <div className=" scroll overflow-y-auto flex-1 flex flex-col">
        {chat?.messages.map((message) => (
          <div
            className={`${
              message.senderId === currentUser.id
                ? "max-w-[70%] self-end p-4 mx-1"
                : "max-w-[70%] mt-2 mx-1"
            }`}
            key={message.senderId}
          >
            <div className="w-auto">
              {message?.img && <img src={message.img} alt="img" />}
              <p
                className={`${
                  message.senderId === currentUser.id
                    ? "bg-[#5183fe]  p-2 rounded-sm w-auto"
                    : "bg-black-rgba  p-2 rounded-sm w-auto"
                }`}
              >
                {message.text}
              </p>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="max-w-[70%] self-end p-4">
            <div className="">
              <img src={img.url} alt="img" />
            </div>
          </div>
        )}

        <div className="" ref={endRef}></div>
      </div>
      <div className="bottom flex items-center gap-3 p-3">
        <div className="flex items-center gap-3">
          <label htmlFor="file">
            <img src={img} alt="avatar" className="w-[20px] h-[20px]" />
          </label>
          <input type="file" hidden id="file" onChange={handleImg} />
          <img src={camera} alt="avatar" className="w-[20px] h-[20px]" />
          <img src={mic} alt="avatar" className="w-[20px] h-[20px]" />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border-none outline-none p-2 rounded-lg bg-black-rgba5 text-white placeholder-gray-300 text-sm "
          placeholder={
            isReceiverBlocked || isCurrentUserBlocked
              ? "You cannot send a Message"
              : "Message..."
          }
        />
        <div className="flex items-center gap-3">
          <div className=" relative">
            <img
              src={icon}
              alt="avatar"
              className="w-[20px] h-[20px]"
              onClick={() => setShow((pre) => !pre)}
            />

            <div className="absolute bottom-[40px] left-0">
              <EmojiPicker open={show} onEmojiClick={handle} />
            </div>
          </div>
          <button
            className="px-2 py-1 bg-[#5183fe] disabled:bg-[#5182feb4] disabled:cursor-not-allowed rounded-md"
            onClick={handleSend}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
