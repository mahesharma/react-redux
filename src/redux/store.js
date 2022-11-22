// import { legacy_createStore as createStore } from 'redux'
// import rootReducer from './reducer'

import { configureStore } from "@reduxjs/toolkit";
import  eventsReduceraction from './reducer.js';


// const store = createStore(rootReducer);

// export default store;

export const store = configureStore({
    reducer: { event:eventsReduceraction }
});
