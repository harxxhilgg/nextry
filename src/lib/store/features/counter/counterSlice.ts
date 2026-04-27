import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  lastOperation: "Increment" | "Decrement" | "Reset" | null;
}

const initialState: CounterState = {
  value: 0,
  lastOperation: null,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.lastOperation = "Increment";
    },
    decrement: (state) => {
      state.value -= 1;
      state.lastOperation = "Decrement";
    },
    reset: (state) => {
      state.value = 0;
      state.lastOperation = "Reset";
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
