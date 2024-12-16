import { fetchPromptByAction } from "Models/Prompts";

export const getPromptByAction = async (data) => {
  return await fetchPromptByAction(data);
};
