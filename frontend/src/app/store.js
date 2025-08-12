import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

// Step 1: Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: false,
    },
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    signOut
} = userSlice.actions;

// Step 2: Redux Persist config
const persistConfig = {
    key: 'root',
    storage,
};

// Step 3: Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

// Step 4: Create store
const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Step 5: Create persistor
export const persistor = persistStore(store);

export default store;
