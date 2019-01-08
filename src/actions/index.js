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
  SORT_PRICE,
  FETCH_ALL_PRODUCT,
  COUNT_TOTAL,
  FETCH_ALL_CATEGORY,
  TOGGLE_SORT_CATEGORY,
  GET_RELATED,
  GET_RANDOM,
  GET_PRODUCT_BY_CATEGORY,
  TOGGLE_LOADING,
  TOGGLE_SORT_SELECTION
} from "./types";

import ApiService from "../apis";
const fetchAllProductAction = listItem => {
  return {
    type: FETCH_ALL_PRODUCT,
    payload: listItem
  };
};

const fetchAllCategoryAction = listCategory => {
  return {
    type: FETCH_ALL_CATEGORY,
    payload: listCategory
  };
};

const fetchProductByCategoryAction = listSelectedCategory => {
  return {
    type: GET_PRODUCT_BY_CATEGORY,
    payload: listSelectedCategory
  };
};

export const getRelatedAction = () => {
  return {
    type: GET_RELATED
  };
};
export const toggleCategoryAction = _id => {
  return {
    type: TOGGLE_SORT_CATEGORY,
    payload: _id
  };
};
export const toggleSortAction = _id => {
  return {
    type: TOGGLE_SORT_SELECTION,
    payload: _id
  };
};
export const fetchProductByCategory = categoryId => dispatch => {
  ApiService._fetchAllProductCategory(categoryId)
    .then(res => {
      let { data } = res;
      dispatch(fetchProductByCategoryAction(data));
    })
    .catch(err => {
      console.log(err);
    });
};
export const fetchAllCategory = () => dispatch => {
  ApiService._fetchAllCategory()
    .then(res => {
      let { data } = res;
      dispatch(fetchAllCategoryAction(data));
    })
    .catch(err => {
      console.log(err);
    });
};
export const fetchAllProduct = () => dispatch => {
  setTimeout(() => {
    ApiService._fetchAllProduct()
      .then(res => {
        dispatch(fetchAllProductAction(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, 1000);
};

export const randomListAction = () => {
  return {
    type: GET_RANDOM
  };
};
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
export const toggleQuantityAction = (_id, isIncrease) => {
  return {
    type: TOGGLE_QUANTITY,
    payload: { _id, isIncrease }
  };
};

export const countTotalAction = () => {
  return { type: COUNT_TOTAL };
};

export const toggleQuantity = (_id, isIncrease) => dispatch => {
  dispatch(toggleQuantityAction(_id, isIncrease));
  dispatch(countTotalAction());
};
export const deleteItemAction = _id => {
  return {
    type: DELETE_ITEM,
    payload: _id
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

export const toggleLoadingAction = () => {
  return { type: TOGGLE_LOADING };
};
