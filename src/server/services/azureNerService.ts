import { Activity } from "botbuilder";

const { default: axios } = require("axios");

export const getIntents = async (context: Partial<Activity>, text: String) => {
    try {
        const response = await axios.post(
            process.env.MODEL_ENDPOINT,
            {
                kind: "Conversation",
                analysisInput: {
                    conversationItem: {
                        id: context.id,
                        participantId: context?.from?.id,
                        text
                    }
                },
                parameters: {
                    projectName: "altibotEnglish",
                    deploymentName: "altibot"
                }
            },
            { headers: { "Ocp-Apim-Subscription-Key": process.env.RESOURCE_KEY } }
        );
        return response?.data?.result.prediction;
    } catch (error) {
        console.error("Error ocurred", error);
    }
};
