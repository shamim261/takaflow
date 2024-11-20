import { generateID as gen } from "@nazmul-nhb/id-generator";

const generateID = () => {
  return gen({
    prefix: "TF",
    timeStamp: false,
    length: 10,
    caseOption: "upper",
    separator: "",
  });
};

export default generateID;
