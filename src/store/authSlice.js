import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    loading: false,
    error: null,
    emailVerified: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.emailVerified = action.payload.userData?.emailVerification || false;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.emailVerified = false;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUserData: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        },
        setEmailVerified: (state, action) => {
            state.emailVerified = action.payload;
            if (state.userData) {
                state.userData.emailVerification = action.payload;
            }
        }
    }
})

export const { login, logout, setLoading, setError, clearError, updateUserData, setEmailVerified } = authSlice.actions;

export default authSlice.reducer;