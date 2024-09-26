import { toast } from "react-toastify";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    toast.warn("llll");
  };
  const handleSignup = () => {};
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex-1 flex flex-col items-center border-r border-r-[#dddddd35]">
        <h2 className="text-xl font-semibold">Welcome back !</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 mt-5">
          <input
            type="text"
            className=" block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            className=" block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="password"
            placeholder="Password"
          />
          <button className="border-none outline-none py-2 px-7 text-white bg-blue-600 font-medium text-center rounded-md">
            Sign in
          </button>
        </form>
      </div>
      <div className="flex-1  flex flex-col items-center">
        <h2 className="text-xl font-semibold">Create an Account</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-3 mt-5">
          <input
            type="text"
            className=" block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="name"
            placeholder="Username"
          />
          <input
            type="text"
            className=" block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            className="block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="password"
            placeholder="Password"
          />
          <button className="border-none outline-none py-2 px-7 text-white bg-blue-600 font-medium text-center rounded-md">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
