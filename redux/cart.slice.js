import { createSlice } from '@reduxjs/toolkit';
import helper from '../config/auth-helper'

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            state.splice(0, state.length)
            state.push(...action.payload);
        },
        addToCart: (state, action) => {
            const itemExists = state.find((item) => item.product == action.payload.product);
            if (itemExists) {
                itemExists.quantity++;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.product == action.payload.product);
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.product == action.payload.product);
            if (item.quantity == 1) {
                const index = state.findIndex((item) => item.product == action.payload);
                state.splice(index, 1);
            } else {
                item.quantity--;
            }
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex((item) => item.id == action.payload);
            state.splice(index, 1);
        },
        resetCart: (state, action) => {
            state.splice(0, state.length)
        },
        replaceCartItem: (state, action) => {
            const item = state.find((item) => item.id == action.payload.id);
            item['quantity'] = action.payload.quantity;
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    setCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    resetCart,
    replaceCartItem
} = cartSlice.actions;


export const fetchCart = () => {
    return async dispatch => {
        const { data } = await helper.axiosInstance('carts');
        dispatch(setCart(data.cartItems));
    };
};