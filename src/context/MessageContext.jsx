import { createContext, useReducer } from "react";
import { initialState, messageReducer } from "../reducers/messageReducer";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
}
