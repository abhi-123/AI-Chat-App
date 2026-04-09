import Header from "./Header";
import MessageContainer from "./MessageContainer";
import InputMessage from "./InputMessage";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

function ChatLayout() {
  const { state } = useContext(MessageContext);
  const { bottomRef, containerRef, scrollToBottom } = useAutoScroll(
    state.messages,
  );
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
        <Header />

        {/* Messages */}
        <MessageContainer containerRef={containerRef} bottomRef={bottomRef} />

        {/* Input */}
        <InputMessage scrollToBottom={scrollToBottom} />
      </div>
    </div>
  );
}

export default ChatLayout;
