import Header from "./Header";
import MessageContainer from "./MessageContainer";
import InputMessage from "./InputMessage";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../context/MessageContext";

function ChatLayout() {
  const { state } = useContext(MessageContext);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { bottomRef, containerRef, scrollToBottom } = useAutoScroll(
    state.messages,
  );

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
      {/* Glass Container */}
      <div
        className="
   w-full 
max-w-md 
sm:max-w-4xl 
md:max-w-5xl 
lg:max-w-6xl 
xl:max-w-7xl 
2xl:max-w-8xl
h-[85vh]
backdrop-blur-xl 
bg-white/10 
border border-white/20 
rounded-2xl 
shadow-2xl 
flex flex-col 
overflow-hidden
    "
      >
        {/* Header */}
        <Header isOnline={isOnline} />

        {/* Messages */}
        <MessageContainer containerRef={containerRef} bottomRef={bottomRef} />

        {/* Input */}
        <InputMessage scrollToBottom={scrollToBottom} isOnline={isOnline} />
      </div>
    </div>
  );
}

export default ChatLayout;
