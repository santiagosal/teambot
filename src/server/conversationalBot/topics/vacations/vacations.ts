import { MessageFactory, TurnContext } from "botbuilder";

const handleVacationsEntity = async (context: TurnContext): Promise<void> => {
    const replyActivity = MessageFactory.text("to defined");
    await context.sendActivity(replyActivity);
};
