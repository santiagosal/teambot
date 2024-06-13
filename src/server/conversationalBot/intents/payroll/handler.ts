import { Entity, MessageFactory, TurnContext } from "botbuilder";
import { ENTITIES, UNKNOWN_MESSAGE_SPA } from "../../../constants";
import messages from "./messages";

const modeEntityHandler = () => {
    return messages.mode;
};

const placeEntityHandler = () => {
    return messages.place;
};

const timeEntityHandler = () => {
    return messages.time;
};

export const payrollIntentHandler = async (context: TurnContext, entities: Array<Entity>): Promise<void> => {
    let message = "";

    for (const entity of entities) {
        const options = {
            [ENTITIES.MODE]: modeEntityHandler,
            [ENTITIES.PLACE]: placeEntityHandler,
            [ENTITIES.TIME]: timeEntityHandler,
            [ENTITIES.DAYS]: timeEntityHandler
        };
        message = options[entity.category] && options[entity.category]();
        if (message) break;
        message = UNKNOWN_MESSAGE_SPA;
    };

    const replyActivity = MessageFactory.text(message);
    await context.sendActivity(replyActivity);
};
