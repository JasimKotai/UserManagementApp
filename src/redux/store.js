// import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from './userSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
