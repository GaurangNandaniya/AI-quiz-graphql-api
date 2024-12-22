import DataLoader from "dataloader";
import {
  getQuestionsByIds,
  getQuizQuestionsIdsByQuizIds,
} from "Controllers/quizQuestionControllers";
import { getQuizzesByIds } from "Controllers/quizzesController";
import { fetchAndMapDataToKeys } from "Utils/dataloaderUtils";

export const dataLoaders = {
  batchQuizLoader: new DataLoader((keys) =>
    fetchAndMapDataToKeys({ keys, batchFetchFn: getQuizzesByIds })
  ),
  batchQuestionLoader: new DataLoader((keys) =>
    fetchAndMapDataToKeys({ keys, batchFetchFn: getQuestionsByIds })
  ),
  batchQuizQuestionIdsLoader: new DataLoader((keys) =>
    fetchAndMapDataToKeys({ keys, batchFetchFn: getQuizQuestionsIdsByQuizIds })
  ),
};
