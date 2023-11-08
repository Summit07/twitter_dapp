"use client";

import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./Features/counter/counterSlice";
import counterReducer from "./feature/counter/counterSlice";
// import dataReducer from "./feature/counter/dataSlice";
// import userReducer from "./feature/users/userSlice";
import walletReducer from "./feature/wallet/walletSlice";
import userReducer from "./feature/users/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wallet: walletReducer,
    user: walletReducer,
    tweetContract: walletReducer,
    profileContract: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
