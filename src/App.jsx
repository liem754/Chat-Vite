import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/login";
import Notify from "./Toastify";

function App() {
  const login = true;
  return (
    <div className="main">
      <div className="max-w-[1400px] w-[90%] h-[95vh]  bg-black-rgba backdrop-blur-lg rounded-sm text-white">
        {!login ? (
          <Login />
        ) : (
          <div className="flex h-[95vh]">
            <List />
            <Chat />
            <Detail />
          </div>
        )}
      </div>
      <Notify />
    </div>
  );
}

export default App;
