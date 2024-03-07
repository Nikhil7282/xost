import { useEffect } from "react";
import { useAuthUser } from "../hooks/contextHooks";
import SideDrawer from "../components/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) {
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="w-full">
      {auth?.user && <SideDrawer />}
      <div
        style={{
          height: "calc(100vh - 65px)",
          display: "flex",
        }}
      >
        {auth?.user && <MyChat />}
        {auth?.user && <ChatBox />}
      </div>
    </div>
  );
}

export default ChatPage;
