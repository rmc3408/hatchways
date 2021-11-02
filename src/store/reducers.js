import { ADD_STUDENTS, ADD_TAG } from "./action-types";


const initialState = {
  students: [],
  tags: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_STUDENTS) {
    state.students.push(...action.payload);
    return state;
  } else if (action.type === ADD_TAG) {
    state.tags.push(...action.payload);
    return state;
  } else {
    return state;
  }
}

export default rootReducer;
