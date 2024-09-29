import avatar from "../../assets/avatar.png";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../lib/useStore";
function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  const handle = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot?.docs[0]?.data());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userchatsRef = collection(db, "userchats");
    try {
      const newchatref = doc(chatRef);
      await setDoc(newchatref, {
        messages: [],
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(userchatsRef, user.id), {
        chats: arrayUnion({
          chatId: newchatref.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userchatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newchatref.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-black-rgba absolute top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2 p-4 w-[400px]">
      <form onSubmit={handle} className="flex items-center gap-2 mb-7">
        <input
          type="text"
          className="outline-none border-none rounded-sm p-2 text-black flex-1"
          placeholder="Username"
          name="username"
        />
        <button className="py-2 px-4 rounded-md border-none outline-none bg-blue-500">
          Search
        </button>
      </form>
      {user && (
        <div className="user flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || avatar}
              className="w-[40px] h-[40px] rounded-[50%] "
              alt="avatar"
            />
            <span>{user.username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="py-2 px-4 rounded-md border-none outline-none bg-blue-500"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUser;
