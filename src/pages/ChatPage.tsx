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
      <div className="flex justify-between w-full h-91.5vh p-10">
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
