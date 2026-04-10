import { memo, useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { useTyping } from "../hooks/useTyping";
import Markdown from "../utils/Markdown";

function MessageContainer({ containerRef, bottomRef }) {
  const { state } = useContext(MessageContext);
  const typingDots = useTyping(state.loading);

  const getRelativeTime = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
    >
      {state?.messages.length > 0 ? (
        state.messages.map((message) => (
          <div key={message.id}>
            {/* 🟢 USER MESSAGE */}
            {message?.role === "user" && (
              <div className="flex flex-col items-end gap-1">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[75%] break-words shadow-md">
                  {message.content}
                </div>
                <p className="text-xs text-gray-400">
                  {getRelativeTime(message.time)}
                </p>
              </div>
            )}

            {/* 🤖 AI MESSAGE */}
            {message?.role === "assistant" && message?.content !== "" && (
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm shadow">
                  🤖
                </div>

                {/* Bubble */}
                <div className=" text-white px-4 py-3">
                  <Message message={message} />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <div className="text-4xl mb-3">💬</div>

          <h2 className="text-white text-lg sm:text-xl font-semibold">
            No messages yet
          </h2>

          <p className="text-sm mt-2 max-w-sm">
            Start a conversation and explore the power of AI 🚀
          </p>
        </div>
      )}

      {/* 🤖 THINKING */}
      {state.loading && (
        <div className="flex items-center gap-3 text-gray-300 text-sm">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            🤖
          </div>
          <div className="bg-white/5 px-3 py-2 rounded-xl animate-pulse">
            Thinking{typingDots}
          </div>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

const Message = memo(({ message }) => {
  return <Markdown content={message.content} />;
});

export default MessageContainer;
