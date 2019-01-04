import {
  VIEW_PRODUCT,
  ADD_PRODUCT,
  TOGGLE_QUANTITY,
  LIKE_PRODUCT,
  GET_PRODUCT,
  ADD_LIKED,
  CHANGE_VIEW,
  LIKE_SELECTED_PRODUCT,
  DELETE_ITEM,
  DELETE_FAVOURITE,
  FILTER_ITEM,
  SORT_ALPHABET,
  SORT_PRICE
} from "./types";

export const viewProductAction = item => {
  return {
    type: VIEW_PRODUCT,
    payload: item
  };
};

export const addProductIdAction = item => {
  return {
    type: ADD_PRODUCT,
    payload: item
  };
};

export const likeProductAction = id => {
  return {
    type: LIKE_PRODUCT,
    payload: id
  };
};

export const addLikedProductAction = item => {
  return {
    type: ADD_LIKED,
    payload: item
  };
};

export const likeSelectedProduct = item => {
  return {
    type: LIKE_SELECTED_PRODUCT,
    payload: item
  };
};
export const changeViewAction = () => {
  return {
    type: CHANGE_VIEW
  };
};
export const getProductAction = (listId, listProduct) => {
  return {
    type: GET_PRODUCT,
    payload: { listId, listProduct }
  };
};
export const toggleQuantityAction = (id, isIncrease) => {
  return {
    type: TOGGLE_QUANTITY,
    payload: { id, isIncrease }
  };
};

export const deleteItemAction = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const deleteFavouriteAction = id => {
  return {
    type: DELETE_FAVOURITE,
    payload: id
  };
};

export const filterItemAction = keyWord => {
  return {
    type: FILTER_ITEM,
    payload: keyWord
  };
};

export const sortAlphabetAction = method => {
  return {
    type: SORT_ALPHABET,
    payload: method
  };
};

export const sortPriceAction = method => {
  return { type: SORT_PRICE, payload: method };
};
