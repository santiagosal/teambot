import { Entity, MessageFactory, TurnContext } from "botbuilder";
import { ENTITIES, UNKNOWN_MESSAGE_SPA } from "../../../constants";
import messages from "./messages";

const platformEntityHandler = (entity: Entity) => {
    const options = {
        prism: messages.prism,
        openair: messages.openAir
    };

    return options[entity?.category] || UNKNOWN_MESSAGE_SPA;
};

const modeEntityHandler = () => {
    return messages.how;
};

const placeEntityHandler = () => {
    return messages.place;
};

const timeEntityHandler = () => {
    return messages.place;
};

export const workHoursIntentHandler = async (context: TurnContext, entities: Array<Entity>): Promise<void> => {
    let message = "";

    for (const entity of entities) {
        const options = {
            [ENTITIES.PLATFORM]: platformEntityHandler,
            [ENTITIES.MODE]: modeEntityHandler,
            [ENTITIES.PLACE]: placeEntityHandler,
            [ENTITIES.TIME]: timeEntityHandler
        };
        message = options[entity.category] && options[entity.category](entity);
        if (message) break;
        message = UNKNOWN_MESSAGE_SPA;
    };

    const replyActivity = MessageFactory.text(message);
    await context.sendActivity(replyActivity);
};
