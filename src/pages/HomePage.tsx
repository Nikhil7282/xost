import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../hooks/storageHooks";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(getLocalStorage("userInfo") || '""');
    if (userInfo) {
      navigate("/chats");
    } else {
    }
  }, []);

  return <div>HomePage</div>;
}

export default HomePage;
