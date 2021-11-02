import { ADD_TAG, ADD_STUDENTS } from "./action-types";

export function addTag(payload) {
    return { type: ADD_TAG, payload }
};

export function addStudents(payload) {
    return { type: ADD_STUDENTS, payload }
};