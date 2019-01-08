const data = {
  listProduct: [],
  filterList: [],
  listCategory: [],
  listCategorySelected: [],
  listRelatedProduct: [],
  listSelectedProduct: [],
  listLikedProduct: [],
  selectedProduct: {},
  isCard: true,
  isLoading: true,
  totalPrice: 0,
  listSortSelection: [
    {
      _id: "az",
      name: "A-Z",
      isSelected: false
    },
    {
      _id: "za",
      name: "Z-A",
      isSelected: false
    },
    {
      _id: "lh",
      name: "LOW-HIGH",
      isSelected: false
    },
    {
      _id: "hl",
      name: "HIGH-LOW",
      isSelected: false
    }
  ]
};

export default data;
