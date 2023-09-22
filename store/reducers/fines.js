import {
	FINES_LOADING,
    FINES_GET_SUCCESS,
    FINES_GET_FAIL,
    FINES_POST_SUCCESS,
    FINES_POST_FAIL,
    FINES_PATCH_SUCCESS,
    FINES_PATCH_FAIL,
} from "../actions/types";

const fines = (state = { info: null }, action) => {
    switch (action.type) {
        case FINES_LOADING:
            return { ...state, loading: true };
        case FINES_GET_SUCCESS:
            return { ...state, info: action.payload, loading: false };
        case FINES_GET_FAIL:
            return { info: null, loading: false };
        case FINES_POST_SUCCESS:
            return { ...state, info: action.payload, loading: false };
        case FINES_POST_FAIL:
            return { ...state, loading: false };
        case FINES_PATCH_SUCCESS:
            return { ...state, info: action.payload, loading: false };
        case FINES_PATCH_FAIL:
            return { ...state, loading: false };
        default:
            return state;
    }
};
export default fines;
