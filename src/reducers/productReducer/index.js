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
  SORT_PRICE,
  FETCH_ALL_PRODUCT,
  COUNT_TOTAL,
  FETCH_ALL_CATEGORY,
  SORT_BY_CATEGORY,
  TOGGLE_SORT_CATEGORY,
  GET_RELATED,
  GET_RANDOM,
  GET_PRODUCT_BY_CATEGORY,
  TOGGLE_LOADING,
  TOGGLE_SORT_SELECTION
} from "../../actions/types";

import data from "../../data";

const productReducer = (state = data, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT:
      return {
        ...state,
        listProduct: action.payload,
        isLoading: !state.isLoading
      };

    case FETCH_ALL_CATEGORY:
      for (let i = 0; i < action.payload.length; i++) {
        action.payload[i].isSelected = false;
      }

      return {
        ...state,
        listCategory: action.payload
      };

    case GET_RANDOM:
      let currentIndex = state.listProduct.length;
      let randomArray = state.listProduct;
      let temporaryValue = 0;
      let randomIndex = 0;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = randomArray[currentIndex];
        randomArray[currentIndex] = randomArray[randomIndex];
        randomArray[randomIndex] = temporaryValue;
      }

      return { ...state, listProduct: randomArray };

    case GET_PRODUCT_BY_CATEGORY:
      console.log(action.payload);
      return { ...state, listCategorySelected: action.payload };

    case TOGGLE_SORT_SELECTION:
      let alterSortList = [...state.listSortSelection];

      for (let i = 0; i < state.listSortSelection.length; i++) {
        if (state.listSortSelection[i]._id == action.payload) {
          alterSortList.slice(i, 1, {
            ...state.listSortSelection[i],
            isSelected: !state.listSortSelection[i].isSelected
          });
          console.log(alterSortList);
          return { ...state, listSortSelection: alterSortList };
        }
      }
      return { ...state };

    case TOGGLE_SORT_CATEGORY:
      return state;

    case GET_RELATED:
      let relatedList = [];
      for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * 10);
        relatedList.push(state.listProduct[index]);
      }
      console.log(relatedList);
      return { ...state, listRelatedProduct: relatedList };
    case SORT_BY_CATEGORY:
      return state;
    case VIEW_PRODUCT:
      return { ...state, selectedProduct: { ...action.payload } };

    case ADD_PRODUCT:
      for (let i = 0; i < state.listSelectedProduct.length; i++) {
        if (action.payload._id == state.listSelectedProduct[i]._id) {
          return { ...state };
        }
      }
      return {
        ...state,
        listSelectedProduct: [
          ...state.listSelectedProduct,
          { ...action.payload, quantity: 0 }
        ]
      };
    case TOGGLE_QUANTITY:
      addedItem = action.payload.isIncrease ? 1 : -1;
      let { listSelectedProduct } = state;
      let alterItem = [...state.listSelectedProduct];
      for (let i = 0; i < listSelectedProduct.length; i++) {
        if (listSelectedProduct[i]._id == action.payload._id) {
          if (listSelectedProduct[i].quantity < 1 && addedItem == -1)
            return state;
          productIndex = i;
          selectedItem = {
            ...listSelectedProduct[i],
            quantity: listSelectedProduct[i].quantity + addedItem
          };
        }
      }

      alterItem.splice(productIndex, 1, selectedItem);
      return {
        ...state,
        listSelectedProduct: alterItem
      };
    case COUNT_TOTAL:
      let currentTotal = 0;
      for (let i = 0; i < state.listSelectedProduct.length; i++) {
        currentTotal =
          currentTotal +
          state.listSelectedProduct[i].price *
            state.listSelectedProduct[i].quantity;
      }
      console.log(currentTotal);
      return { ...state, totalPrice: currentTotal };
    case LIKE_PRODUCT:
      let listItem = [...state.listProduct];

      for (let i = 0; i < listItem.length; i++) {
        if (listItem[i]._id == action.payload) {
          productIndex = i;
          selectedItem = {
            ...listItem[i],
            isLiked: !listItem[i].isLiked
          };
          listItem.splice(productIndex, 1, selectedItem);
        }
      }

      return { ...state, listProduct: listItem };
    case ADD_LIKED:
      for (let i = 0; i < state.listLikedProduct.length; i++) {
        if (action.payload._id == state.listLikedProduct[i]._id) {
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
        if (selectedList[i]._id == action.payload) {
          selectedList.splice(i, 1);
        }
      }
      return { ...state, listSelectedProduct: selectedList };
    case DELETE_FAVOURITE:
      let selectedFavouriteList = [...state.listLikedProduct];
      for (let i = 0; i < selectedFavouriteList.length; i++) {
        if (selectedFavouriteList[i]._id == action.payload) {
          selectedFavouriteList.splice(i, 1);
        }
      }
      return { ...state, listLikedProduct: selectedFavouriteList };

    case FILTER_ITEM:
      let items = [];
      for (let i = 0; i < state.listProduct.length; i++) {
        if (
          state.listProduct[i].name
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
    case TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export default productReducer;
