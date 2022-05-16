import { configureStore, createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age: 20 },
    reducers: {
        changeuser(state) {
            state.name = 'park'
        },
        increase(state, action) {
            state.age = state.age + action.payload;
        },
    }
})

export let { changeuser, increase } = user.actions

export default user;