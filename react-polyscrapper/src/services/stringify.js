export const toCapitalCase = (phrase) =>
  phrase
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const objectToString = (obj) =>
  "{" +
  Object.entries(obj)
    .map(([k, v]) => `${k}: ${v?.toString()}`)
    .join(", ") +
  "}";

export const arrayToString = (array, putBrackets = false) =>
  (putBrackets ? "[" : "") +
  array
    .map((item) =>
      item && typeof item === "object" ? objectToString(item) : item
    )
    .join(", ") +
  (putBrackets ? "]" : "");

export const anythingToString = (data) => {
  if (!data) return "";
  if (data instanceof Array) return arrayToString(data);
  if (typeof data === "object") return objectToString(data);
  return data.toString();
};
