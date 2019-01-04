import { combineReducers } from "redux";
import productReducer from "./productReducer";
import accountReducer from "./accountReducer";

export const allReducers = combineReducers({ productReducer, accountReducer });
