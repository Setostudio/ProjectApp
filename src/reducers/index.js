import { combineReducers } from "redux";
import productReducer from "./productReducer";
import accountReducer from "./accountReducer";

export default (allReducers = combineReducers({
  product: productReducer,
  account: accountReducer
}));
