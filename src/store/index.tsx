import {createStore} from "redux";
import {questionReducer} from "./questionReducer";

export const store = createStore(questionReducer)