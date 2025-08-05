import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create the slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
        reset: (state) => { state.value = 0 },
    },
});

// Step 2: Export actions
export const { increment, decrement, reset } = counterSlice.actions;

// Step 3: Create and export store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});

export default store;
