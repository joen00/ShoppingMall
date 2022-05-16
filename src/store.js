import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'


const stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

const cartdata = createSlice({
    name: 'cartdata',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 1, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changecount(state, action) {
            let 번호 = state.findIndex((a) => { return a.id === action.payload })
            state[번호].count++;
        },
        addcart(state, action) {
            state.push({ id: state[state.length - 1].id + 1, name: action.payload, count: 1 });
        }
    }
})

export let { changecount, addcart } = cartdata.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cartdata: cartdata.reducer
    }
}) 