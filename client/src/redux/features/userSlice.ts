import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";
import storage from "redux-persist/lib/storage";

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const InitialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    rehydrateUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...action.payload,
        loading: false, // ✅ Reset loading to false after rehydration
      };
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      storage.removeItem("persist:auth");
    },
  },
});

export const { setUser, setAuthenticated, setLoading, rehydrateUser, logout } =
  userSlice.actions;
export default userSlice.reducer;
