import { NERResponse } from "../interfaces/nerResponse";

export const extractTextIntent = (response: NERResponse) => {
    const topEntities = response?.entities?.filter(entity => entity?.confidenceScore > 0.9) || [];

    return { intent: response?.topIntent, entities: topEntities };
};
