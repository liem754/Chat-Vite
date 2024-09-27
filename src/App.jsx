import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/login";
import Notify from "./Toastify";
import { useUserStore } from "./lib/useStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  useEffect(() => {
    const check = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      check();
    };
  }, [fetchUserInfo]);
  console.log({ isLoading, currentUser });

  return (
    <div className="main">
      {isLoading ? (
        <div className="max-w-[1400px] w-[90%] h-[95vh]  bg-black-rgba backdrop-blur-lg rounded-sm text-white">
          Loading...
        </div>
      ) : (
        <div className="max-w-[1400px] w-[90%] h-[95vh]  bg-black-rgba backdrop-blur-lg rounded-sm text-white">
          {currentUser === null ? (
            <Login />
          ) : (
            <div className="flex h-[95vh]">
              <List user={currentUser} />
              <Chat user={currentUser} />
              <Detail user={currentUser} />
            </div>
          )}
        </div>
      )}
      <Notify />
    </div>
  );
}

export default App;
