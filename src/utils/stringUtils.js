import _ from "lodash";

export const replacePlaceholders = ({ string, data, placeholderText = "" }) => {
  return _.replace(string, /{{(.*?)}}/g, (_, key) => {
    const value = data[key];
    return value !== undefined && value !== null ? value : `${placeholderText}`;
  });
};
