const baseURl = "https://ai-chat-app-kt9w.onrender.com/";
//const baseURl = "http://127.0.0.1:8000";

export const getResponse = async (message) => {
  const res = await fetch(baseURl + "/generate-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: message,
    }),
  });
  // const data = await res.json();
  return res;
};
