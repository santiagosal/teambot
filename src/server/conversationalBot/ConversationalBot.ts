import { BotDeclaration } from "express-msteams-host";
import * as debug from "debug";
import {
    ConversationState,
    MemoryStorage,
    UserState,
    TurnContext,
    MessageFactory,
    ActivityTypes
} from "botbuilder";
import { DialogBot } from "./dialogBot";
import { MainDialog } from "./dialogs/mainDialog";
import {
    sendDigitalPassportCard,
    sendHolidaysCard,
    sendLearningCard,
    sendOfficeCard,
    sendOneonOneCard,
    sendOpenairCard,
    sendPayrollCard,
    sendPrismCard,
    sendMedicCard,
    sendWellnessCard,
    sendSavingFundCard,
    sendWelcomeCard,
    sendOpportunitiesCard
} from "./cardsFunctions";
import { getIntents } from "../services/azureNerService";
import { extractTextIntent } from "../utilities/extractTextIntent";
import { CHATBOT_INTENTS } from "../constants";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for Conversational Bot
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD
)
export class ConversationalBot extends DialogBot {
    constructor(conversationState: ConversationState, userState: UserState) {
        super(conversationState, userState, new MainDialog());

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            if (membersAdded && membersAdded.length > 0) {
                for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                    if (membersAdded[cnt].id !== context.activity.recipient.id) {
                        await sendWelcomeCard(context);
                    }
                }
            }
            await next();
        });

        this.onMessage(async (context: TurnContext): Promise<void> => {
            const text = TurnContext.removeRecipientMention(context.activity);
            const response = await getIntents(context.activity, text);
            const { intent } = extractTextIntent(response);

            const intents = {
                [CHATBOT_INTENTS.GREETING]: this.handleGreetings
            };
            intents[intent] ? await intents[intent](context) : await this.handleUnknown(context);

            /* if (
                text.includes("holidays") ||
                            text.includes("festivos") ||
                            text.includes("feriados")
            ) {
                await sendHolidaysCard(context);
            } else if (
                text.includes("openair") ||
                            text.includes("timesheet") ||
                            text.includes("hoja de horas")
            ) {
                await sendOpenairCard(context);
            } else if (
                text.includes("payroll") ||
                            text.includes("quincena") ||
                            text.includes("nomina")
            ) {
                await sendPayrollCard(context);
            } else if (
                text.includes("digital passport") ||
                            text.includes("passport")
            ) {
                await sendDigitalPassportCard(context);
            } else if (
                text.includes("saving fund") ||
                            text.includes("fondo de ahorro")
            ) {
                await sendSavingFundCard(context);
            } else if (
                text.includes("one on one") ||
                            text.includes("1:1") ||
                            text.includes("uno a uno")
            ) {
                await sendOneonOneCard(context);
            } else if (text.includes("office") || text.includes("oficina")) {
                await sendOfficeCard(context);
            } else if (
                text.includes("learning") ||
                            text.includes("courses") ||
                            text.includes("cursos") ||
                            text.includes("career path")
            ) {
                await sendLearningCard(context);
            } else if (
                text.includes("prism") ||
                            text.includes("time off") ||
                            text.includes("vacaciones") ||
                            text.includes("goals") ||
                            text.includes("objetivos")
            ) {
                await sendPrismCard(context);
            } else if (
                text.includes("jobs") ||
                            text.includes("opportunities") ||
                            text.includes("vacantes") ||
                            text.includes("referidos")
            ) {
                await sendOpportunitiesCard(context);
            } else if (
                text.includes("medical") ||
                            text.includes("insurance") ||
                            text.includes("gastos medicos") ||
                            text.includes("gastos médicos")
            ) {
                await sendMedicCard(context);
            } else if (
                text.includes("wellness") ||
                            text.includes("gym") ||
                            text.includes("bienestar")
            ) {
                await sendWellnessCard(context);
            } */

        });

        this.onTeamsChannelCreatedEvent(
            async (channelInfo, teamInfo, context: TurnContext, next) => {
                await this.handleGreetings(context);
                await next();
            }
        );
    }

    private async handleGreetings(context: TurnContext): Promise<void> {
        const replyActivity = MessageFactory.text(
            `Welcome to Altimetrik Bot ${context.activity.from.name}, how can I assist you? 😀`
        );
        await context.sendActivity(replyActivity);
    }

    private async handleUnknown(context: TurnContext): Promise<void> {
        const replyActivity = MessageFactory.text(
            "I am sorry, but my developer hasn't trained me to understand this"
        );
        await context.sendActivity(replyActivity);
    }
}
