import {

  ADD_ACTIVE_USER,
} from "../actions/types";

const activeUsers = (
  state = { allUsers: [] },
  action
) => {
  switch (action.type) {
    case ADD_ACTIVE_USER:
      return { ...state, allUsers: action.payload };
    default:
      return state;
  }
};

export default activeUsers;
