import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";

function App() {
  return (
    <div className="main">
      <div className="max-w-[1400px] w-[90%] h-[90vh]  flex bg-black-rgba backdrop-blur-lg rounded-sm text-white">
        <List />
        <Chat />
        <Detail />
      </div>
    </div>
  );
}

export default App;
