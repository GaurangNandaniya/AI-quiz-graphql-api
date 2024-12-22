import _ from "lodash";

export const fetchAndMapDataToKeys = async ({ keys, batchFetchFn }) => {
  const data = await batchFetchFn(keys);

  const dataMap = {};

  _.forEach(data, (item) => {
    dataMap[item["id"]] = item;
  });

  return _.map(keys, (key) => dataMap[key]);
};
