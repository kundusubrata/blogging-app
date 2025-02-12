import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./api/postApi";
import { userApi } from "./api/userApi";
import userReducer from "./features/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux Persist configuration
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], // Persist user and authentication status only
};

// Wrap auth reducer with Redux Persist
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    auth: persistedUserReducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat([postApi.middleware, userApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
