import { useEffect } from "react";
import { AuthUser } from "../hooks/contextHooks";
import SideDrawer from "../components/SideDrawer";

function ChatPage() {
  const auth = AuthUser();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div className="w-full">
      {auth?.user && <SideDrawer />}
      <div className="flex justify-between w-full h-91.5vh p-10">
        {
          auth?.user && <div>my chats</div>
          // <MyChats fetchAgain={fetchAgain} />
        }
        {
          auth?.user && <div>chatbox</div>
          // (<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)
        }
      </div>
    </div>
  );
}

export default ChatPage;
