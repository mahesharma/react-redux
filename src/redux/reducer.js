// import { combineReducers } from 'redux'
import { createSlice } from "@reduxjs/toolkit";

// const eventsReducer = (state = [], action) => {
//     switch (action.type) {
//         case "ADD_EVENT":
//             return [...state, { title: action.payload.text, time: action.payload.time }]

//         case "DELETE_EVENT":
//             return [...state, {id: action.payload.id}]

//         default: return state
//     }
// }
// const rootReducer = combineReducers({
//     events: eventsReducer
// });

// export default rootReducer;

const eventsReducer = createSlice({
  name: "events",
  initialState: { modalIsOpen: false },
  reducers: {
    changeModalstate(state, action) {
      console.log(state.modalIsOpen);
      state.modalIsOpen = action.payload;
    },
  },
});

export default eventsReducer.reducer;
export const changeModalstateaction = eventsReducer.actions;
