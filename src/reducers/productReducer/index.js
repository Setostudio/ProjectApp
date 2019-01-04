import {
  VIEW_PRODUCT,
  ADD_PRODUCT,
  TOGGLE_QUANTITY,
  DELETE_ITEM,
  LIKE_PRODUCT,
  ADD_LIKED,
  CHANGE_VIEW,
  LIKE_SELECTED_PRODUCT,
  DELETE_FAVOURITE,
  FILTER_ITEM,
  SORT_ALPHABET,
  SORT_PRICE
} from "../../actions/types";
import data from "../../data";

const productReducer = (state = data, action) => {
  switch (action.type) {
    case VIEW_PRODUCT:
      return { ...state, selectedProduct: { ...action.payload } };
    case ADD_PRODUCT:
      for (let i = 0; i < state.listSelectedProduct.length; i++) {
        if (
          action.payload.productId == state.listSelectedProduct[i].productId
        ) {
          return { ...state };
        }
      }
      return {
        ...state,
        listSelectedProduct: [...state.listSelectedProduct, action.payload]
      };
    case TOGGLE_QUANTITY:
      let alterItem = [...state.listSelectedProduct];
      console.log(alterItem);
      addedItem = action.payload.isIncrease ? 1 : -1;

      for (let i = 0; i < alterItem.length; i++) {
        if (alterItem[i].productId == action.payload.id) {
          productIndex = i;
          selectedItem = {
            ...alterItem[i],
            productQuantity: alterItem[i].productQuantity + addedItem * 1
          };
        }
      }
      alterItem.splice(productIndex, 1, selectedItem);
      return {
        ...state,
        listSelectedProduct: alterItem,
        totalPrice: state.totalPrice + selectedItem.productPrice * addedItem
      };
    case LIKE_PRODUCT:
      let listItem = [...state.listProduct];

      for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].productId == action.payload) {
          productIndex = i;
          selectedItem = {
            ...listItem[i],
            isLiked: !listItem[i].isLiked
          };
        }
      }
      listItem.splice(productIndex, 1, selectedItem);

      return { ...state, listProduct: listItem };
    case ADD_LIKED:
      for (let i = 0; i < state.listLikedProduct.length; i++) {
        if (action.payload.productId == state.listLikedProduct[i].productId) {
          return state;
        }
      }
      return {
        ...state,
        listLikedProduct: [...state.listLikedProduct, action.payload]
      };
    case LIKE_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          isLiked: !state.selectedProduct.isLiked
        }
      };
    case CHANGE_VIEW:
      return { ...state, isCard: !state.isCard };
    case DELETE_ITEM:
      let selectedList = [...state.listSelectedProduct];
      for (let i = 0; i < selectedList.length; i++) {
        if (selectedList[i].productId == action.payload) {
          selectedList.splice(i, 1);
        }
      }
      return { ...state, listSelectedProduct: selectedList };
    case DELETE_FAVOURITE:
      let selectedFavouriteList = [...state.listLikedProduct];
      for (let i = 0; i < selectedFavouriteList.length; i++) {
        if (selectedFavouriteList[i].productId == action.payload) {
          selectedFavouriteList.splice(i, 1);
        }
      }
      return { ...state, listLikedProduct: selectedFavouriteList };

    case FILTER_ITEM:
      let items = [];
      console.log("Reducer ne");
      for (let i = 0; i < state.listProduct.length; i++) {
        if (
          state.listProduct[i].productName
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ) {
          items.push(state.listProduct[i]);
        }
      }

      console.log(items);
      return { ...state, filterList: items };
    case SORT_ALPHABET:
      if (action.payload) {
        sortedAlphabetList = state.filterList.sort((a, b) => {
          let firstName = a.productName.toLowerCase();
          let secondName = b.productName.toLowerCase();
          if (firstName < secondName) return -1;
          if (firstName > secondName) return 1;
          return 0;
        });
      } else {
        sortedAlphabetList = state.filterList.sort((a, b) => {
          let firstName = a.productName.toLowerCase();
          let secondName = b.productName.toLowerCase();
          if (firstName > secondName) return -1;
          if (firstName < secondName) return 1;
          return 0;
        });
      }
      return { ...state, filterList: sortedAlphabetList };
    case SORT_PRICE:
      if (action.payload) {
        sortedPriceList = state.filterList.sort((a, b) => {
          return b.productPrice - a.productPrice;
        });
      } else {
        sortedPriceList = state.filterList.sort((a, b) => {
          return a.productPrice - b.productPrice;
        });
      }
      console.log(sortedPriceList);
      return { ...state, filterList: sortedPriceList };
    default:
      return state;
  }
};

export default productReducer;
