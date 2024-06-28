import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../hooks/storageHooks";
import { cn } from "../utils/cn";
import { Boxes } from "../animations/Boxes";
function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getLocalStorage("userInfo");
    if (userInfo) {
      navigate("/chats");
    }
  }, []);

  return (
    <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Xost
      </h1>
      <p className="relative z-20 mt-2 text-center text-neutral-300">
        Connecting people, one message at a time
      </p>
      <a
        href="/login"
        className="z-20 p-2 pl-6 pr-6 mt-10 bg-white outline-1 outline-offset-4 outline-white rounded-xl outline"
      >
        Login
      </a>
    </div>
  );
}

export default HomePage;
