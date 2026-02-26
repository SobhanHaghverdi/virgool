import { Transform } from "class-transformer";

const booleanMap = {
  true: true,
  false: false,
  "1": true,
  "0": false,
};

function ToBoolean() {
  return Transform(({ value }) => {
    if (typeof value === "boolean") return value;
    return booleanMap[value] ?? null;
  });
}

export default ToBoolean;
