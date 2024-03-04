import { useEffect } from "react";
import { useAuthUser } from "../hooks/contextHooks";
import SideDrawer from "../components/SideDrawer";
import MyChat from "../components/MyChat";
import ChatBox from "../components/ChatBox";

function ChatPage() {
  const auth = useAuthUser();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div className="w-full">
      {auth?.user && <SideDrawer />}
      <div style={{
        height: "calc(100vh - 65px)",
        display: "flex",
        
      }}>
        {
          auth?.user && <MyChat />
          // <MyChats fetchAgain={fetchAgain} />
        }
        {
          auth?.user && <ChatBox />
          // (<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)
        }
      </div>
    </div>
  );
}

export default ChatPage;
