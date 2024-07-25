import { Entity, MessageFactory, TurnContext } from "botbuilder";
import { ENTITIES, UNKNOWN_MESSAGE_SPA } from "../../../constants";
import messages from "./messages";

const quantityEntityHandler = (entities: Array<Entity>) => {
    let message = "";
    for (const entity of entities) {
        const options = {
            [ENTITIES.BREAK]: messages.quantityVacations,
            [ENTITIES.HOLIDAY]: messages.quantityHolidays
        };
        message = options[entity?.category];
        if (message) break;
        message = messages.quantityVacations;
    }
    return message;
};

const modeEntityHandler = () => {
    return messages.mode;
};

export const holidaysIntentHandler = async (context: TurnContext, entities: Array<Entity>): Promise<void> => {
    let message = "";
    for (const entity of entities) {
        const options = {
            [ENTITIES.QUANTITY]: quantityEntityHandler,
            [ENTITIES.MODE]: modeEntityHandler,
            [ENTITIES.PLACE]: modeEntityHandler,
            [ENTITIES.DAYS]: quantityEntityHandler
        };
        message = options[entity.category] && options[entity.category](entities);
        if (message) break;
        message = UNKNOWN_MESSAGE_SPA;
    };

    const replyActivity = MessageFactory.text(message);
    await context.sendActivity(replyActivity);
};
