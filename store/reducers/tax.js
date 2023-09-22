import {
    TAX_LOADING,
    TAX_GET_SUCCESS,
    TAX_GET_FAIL,
    TAX_POST_SUCCESS,
    TAX_POST_FAIL,
    TAX_PATCH_SUCCESS,
    TAX_PATCH_FAIL
    
} from "../actions/types";

const tax = (state = { tax: null }, action) => {
    switch (action.type) {
        case TAX_LOADING:
            return { ...state, loading: true };
        case TAX_GET_SUCCESS:
            return { ...state, tax: action.payload, loading: false };
        case TAX_GET_FAIL:
            return { tax: null, loading: false };
        case TAX_POST_SUCCESS:
            return { ...state, tax: action.payload, loading: false };
        case TAX_POST_FAIL:
            return { ...state, loading: false };
        case TAX_PATCH_SUCCESS:
            return { ...state, tax: action.payload, loading: false };
        case TAX_PATCH_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
}
export default tax;