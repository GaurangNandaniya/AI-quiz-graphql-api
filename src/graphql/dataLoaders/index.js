import { getQuizzesByIds } from "Controllers/quizzesController";
import DataLoader from "dataloader";
import { fetchAndMapDataToKeys } from "Utils/dataloaderUtils";

export const dataLoaders = {
  batchQuizLoader: new DataLoader((keys) =>
    fetchAndMapDataToKeys({ keys, batchFetchFn: getQuizzesByIds })
  ),
};
