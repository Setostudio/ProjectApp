import getLayout from "../../helpers/getLayout";
import appColor from "../../commonTheme";
const imageView = {
  width: getLayout.width / 4,
  height: 100,
  borderRadius: 20
};

const descriptionView = {
  marginTop: 10,
  padding: 10,
  width: getLayout.width,
  backgroundColor: appColor.cardGrey
};

const bottomButton = {
  height: getLayout.height / 15,
  width: getLayout.width,
  justifyContent: "flex-end"
};
export default { imageView, descriptionView, bottomButton };
