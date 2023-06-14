import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserState {
    username: string|null,
    token: string|null
}


const initialState: IUserState = {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token")
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state, action:PayloadAction<string>) => {
            state.username = action.payload
        },
        setToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})
export const {
    setUserName,
    setToken
} = userSlice.actions

export default userSlice.reducer;