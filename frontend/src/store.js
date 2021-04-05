// create a redux store

import data from './data';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    
}

const reducer = (state, action) => {
    return { products: data.products };
};

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));


export default store; 