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
    } else {
    }
  }, []);

  return (
    <div className="h-full absolute w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Xost
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Connecting people, one message at a time
      </p>
    </div>
  );
}

export default HomePage;
