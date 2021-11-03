import { ADD_STUDENTS, ADD_TAG } from "./action-types";

type ITags = {
  id: number;
  info: Array<string>;
};

const initialState: {
  students: Array<IStudent>;
  tags: Array<ITags>;
} = {
  students: [],
  tags: [],
};

type actionTypes = {
  type: string;
  payload: Array<IStudent> & ITags;
}

function rootReducer(state = initialState, action: actionTypes) {
  if (action.type === ADD_STUDENTS) {
    state.students.push(...action.payload);
    return state;
  } else if (action.type === ADD_TAG) {
    state.tags.push(action.payload);
    return state;
  } else {
    return state;
  }
}

export default rootReducer;
