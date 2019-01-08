import getLayout from "../../helpers/getLayout";
const imageBackground = index => {
  return {
    width: getLayout.width - 20,
    height: getLayout.height / 5,
    marginBottom: 20,
    alignItems: index % 2 == 0 ? "flex-start" : "flex-end",
    justifyContent: "center"
  };
};

const categoryView = {
  zindex: 2,
  backgroundColor: "#766153",
  width: getLayout.width - 20,
  height: getLayout.height / 5,
  opacity: 0.5
};

export default { imageBackground, categoryView };
