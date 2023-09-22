import {
  WALLET_BALACE_GET_SUCCESS,
  WALLET_BALANCE_LOADING,
} from "../actions/types";
const wallet = (state = { info: null }, action) => {
  const type = action.type;
  switch (type) {
    case WALLET_BALANCE_LOADING:
      return { ...state, loading: true };
    case WALLET_BALACE_GET_SUCCESS:
      return { ...state, loading: false, info: action.payload };
    default:
      return state;
  }
};

export default wallet;
