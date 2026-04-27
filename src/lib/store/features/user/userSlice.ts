import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  email: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_metadata: any | null;
  created_at: string | null;
  isLoaded: boolean;
}

const initialState: UserState = {
  id: null,
  email: null,
  user_metadata: null,
  created_at: null,
  isLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, "isLoaded">>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.user_metadata = action.payload.user_metadata;
      state.created_at = action.payload.created_at;
      state.isLoaded = true;
    },
    clearUser: () => {
      return { ...initialState, isLoaded: true };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
