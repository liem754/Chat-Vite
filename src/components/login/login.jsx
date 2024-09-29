import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import av from "../../assets/avatar.png";
import upload from "../../lib/upload";
function Login() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.target);

    const { email, password } = Object.fromEntries(data);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(data);

    try {
      const rs = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);
      await setDoc(doc(db, "users", rs.user.uid), {
        ...(imgUrl !== "" ? { avatar: imgUrl } : { avatar: "" }),
        username,
        email,
        id: rs.user.uid,
        block: [],
      });
      await setDoc(doc(db, "userchats", rs.user.uid), {
        chats: [],
      });
      toast.success("Sign up success !");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
          <button
            disabled={loading}
            className=" disabled:cursor-not-allowed disabled:bg-blue-400 border-none outline-none py-2 px-7 text-white bg-blue-600 font-medium text-center rounded-md"
          >
            Sign in
          </button>
        </form>
      </div>
      <div className="flex-1  flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-3">Create an Account</h2>
        <input
          type="file"
          id="avatar"
          hidden
          onChange={(e) =>
            setAvatar({
              file: e.target.files[0],
              url: URL.createObjectURL(e.target.files[0]),
            })
          }
        />
        <div className=" flex gap-2 items-center justify-start">
          <label
            htmlFor="avatar"
            className="bg-black-rgba px-3 py-2 rounded-md cursor-pointer"
          >
            Add avatar
          </label>
          <img
            src={avatar.url !== "" ? avatar.url : av}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-[50%]"
          />
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-3 mt-5">
          <input
            type="text"
            className=" block outline-none border-none placeholder-slate-500 text-white p-2 rounded-sm bg-black-rgba"
            name="username"
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
          <button
            disabled={loading}
            className="disabled:cursor-not-allowed disabled:bg-blue-400 cursor-pointer border-none outline-none py-2 px-7 text-white bg-blue-600 font-medium text-center rounded-md"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
