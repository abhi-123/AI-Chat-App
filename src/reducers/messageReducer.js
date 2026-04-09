export const initialState = {
  messages: [],
  loading: false,
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_MESSAGE": {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.payload.id,
            role: action.payload.role,
            content: action.payload.content,
            time: action.payload.time,
          },
        ],
      };
    }
    case "ADD_AI_MESSAGE": {
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.payload.id,
            role: action.payload.role,
            content: action.payload.content,
            time: action.payload.time,
          },
        ],
      };
    }
    case "STREAM_AI_MESSAGE": {
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, content: action.payload.message }
            : msg,
        ),
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
