import { useContext, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import { getResponse } from "../api/api";

function InputMessage({ scrollToBottom, isOnline }) {
  const { state, dispatch } = useContext(MessageContext);

  const [text, setText] = useState("");

  //   const streamMessage = (fullText, id) => {   //SetInterval UI Chunk Method
  //     let index = 0;

  //     const interval = setInterval(() => {
  //       index++;

  //       dispatch({
  //         type: "STREAM_AI_MESSAGE",
  //         payload: {
  //           id,
  //           message: fullText.slice(0, index),
  //         },
  //       });

  //       if (index >= fullText.length) {
  //         clearInterval(interval);
  //       }
  //     }, 20); // speed control
  //   };

  const streamMessage = async (res, id) => {
    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText = "";
    let buffer = "";
    let isFirstChunk = true;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      for (let char of chunk) {
        buffer += char;

        // 👉 buffer accumulate (flicker fix)
        if (buffer.length < 3 && !/[.\n]/.test(char)) continue;

        fullText += buffer;
        buffer = "";

        if (isFirstChunk) {
          dispatch({ type: "SET_LOADING", payload: false });
          isFirstChunk = false;
        }

        dispatch({
          type: "STREAM_AI_MESSAGE",
          payload: {
            id,
            message: fullText,
          },
        });

        // 👉 smart delay
        const delay = /[.,!?]/.test(char) ? 80 : 30;
        console.log(delay, "delay");
        await sleep(delay);
      }
    }

    // 👉 leftover buffer flush (IMPORTANT)
    if (buffer) {
      fullText += buffer;

      dispatch({
        type: "STREAM_AI_MESSAGE",
        payload: {
          id,
          message: fullText,
        },
      });
    }
  };
  const formatMessages = (messages) => {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      time: Date.now(),
      content: text,
    };
    dispatch({
      type: "ADD_USER_MESSAGE",
      payload: userMessage,
    });
    scrollToBottom(true);
    setText("");
    const aiID = crypto.randomUUID();
    const updatedMessages = [...state.messages, userMessage].slice(-20);
    const apiMessages = formatMessages(updatedMessages);
    // 3️⃣ AI MESSAGE
    dispatch({
      type: "ADD_AI_MESSAGE",
      payload: {
        id: aiID,
        role: "assistant",
        time: Date.now(),
        content: "",
      },
    });
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await getResponse(apiMessages);

      if (!response.ok) {
        let message =
          "⚠️ I couldn’t process your request right now.\n\nPlease try again shortly.";
        dispatch({
          type: "STREAM_AI_MESSAGE",
          payload: { id: aiID, message: message },
        });
        return;
      }

      await streamMessage(response, aiID);
    } catch (error) {
      console.log("RAW ERROR:", error);

      let message = "";

      if (!navigator.onLine) {
        message =
          "🌐 You’re currently offline.\n\nPlease check your internet connection and try again.";
      } else if (error.message.includes("Failed to fetch")) {
        message =
          "⚠️ I couldn’t reach the server right now.\n\nPlease try again in a few moments.";
      } else {
        message =
          "😅 Something didn’t go as expected.\n\nPlease try again — I’ll be right here!";
      }
      dispatch({
        type: "STREAM_AI_MESSAGE",
        payload: { id: aiID, message: message },
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  return (
    <div className="p-4 sm:p-5 border-t border-white/10 flex gap-2">
      <textarea
        rows={1}
        placeholder="Type a message..."
        className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-lg outline-none backdrop-blur-md resize-none max-h-40 overflow-y-auto"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg transition disabled:opacity-50"
        disabled={!text.trim() || !isOnline}
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}

export default InputMessage;
