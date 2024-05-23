import { Entity, MessageFactory, TurnContext } from "botbuilder";

export const savingFoundIntentHandler = async (context: TurnContext, entities: Array<Entity>): Promise<void> => {
    const message = "save found";
    const replyActivity = MessageFactory.text(message);
    await context.sendActivity(replyActivity);
};
