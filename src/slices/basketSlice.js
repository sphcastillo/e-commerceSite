// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      //...state.items = copying the current store (whatever is in the basket)
      // action.payload = the product that we are adding to the basket
      // payload contains the product that we are passing in
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // need to find the item with the id (search for it)
      // have to go thru every basketItem
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      // create a copy of new basket
      // you're changing the current state
      let newBasket =  [...state.items];

      // if it found the item we're trying to remove, index will be greater than 0
        if (index >= 0){
          // The item exists in the basket... remove it
          // splice is a method that removes an item from an array(cutting it out by 1)... removes it
          newBasket.splice(index, 1)
        } else {
          console.warn(
            `Cant remove product (id: ${action.payload.id}) as its not in the basket!`  
          );
        }
        // set the new basket to the current state
        state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
// go thru the items inside the basket and add up the price - 
// add up the price of all the items in the basket
export const selectTotal = (state) => 
  // add on item price to the total price
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
