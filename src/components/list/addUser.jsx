import avatar from "../../assets/avatar.png";
function AddUser() {
  return (
    <div className=" bg-black-rgba absolute top-[50%] left-[50%]  -translate-y-1/2 -translate-x-1/2 p-4 w-[400px]">
      <form action="" className="flex items-center gap-2 mb-7">
        <input
          type="text"
          className="outline-none border-none rounded-sm p-2 text-black flex-1"
        />
        <button className="py-2 px-4 rounded-md border-none outline-none bg-blue-500">
          Search
        </button>
      </form>
      <div className="user flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={avatar}
            className="w-[40px] h-[40px] rounded-[50%] "
            alt="avatar"
          />
          <span>name</span>
        </div>
        <button className="py-2 px-4 rounded-md border-none outline-none bg-blue-500">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddUser;
