import { BotDeclaration } from "express-msteams-host";
import * as debug from "debug";
import { CardFactory, ConversationState, MemoryStorage, UserState, TurnContext, MessageFactory, ActivityTypes } from "botbuilder";
import { DialogBot } from "./dialogBot";
import { MainDialog } from "./dialogs/mainDialog";
import WelcomeCard from "./cards/welcomeCard/welcomeCard";
import HolidaysCard from "./cards/holidaysCard/holidaysCard";
import OpenairCard from "./cards/openairCard/openairCard";
import PayrollCard from "./cards/payrollCard/payrollCard";
import DigitalPasspordCard from "./cards/digitalPassportCard/digitalPassportCard";
import SavingfundCard from "./cards/savingfundCard/savingfundCard";
import OneonOneCard from "./cards/oneononeCard/oneoneCard";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for Conversational Bot
 */
  @BotDeclaration(
      "/api/messages",
      new MemoryStorage(),
      // eslint-disable-next-line no-undef
      process.env.MICROSOFT_APP_ID,
      // eslint-disable-next-line no-undef
      process.env.MICROSOFT_APP_PASSWORD)

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
                        await this.sendWelcomeCard( context );
                    }
                }
            }
            await next();
        });

        this.onMessage(async (context: TurnContext): Promise<void> => {
            switch (context.activity.type) {
                case ActivityTypes.Message:
                    {
                        let text = TurnContext.removeRecipientMention(context.activity);
                        text = text.toLocaleLowerCase();
                        if (text.startsWith("mentionme")) {
                            await this.handleMessageMentionMeOneOnOne(context);
                        } else if (text.includes("hola") || text.includes("hi") || text.includes("hello")) {
                            await context.sendActivity("Hello, how can I help you today?");
                        } else if (text.includes("holidays") || text.includes("festivos") || text.includes("feriados")) {
                            await this.sendHolidaysCard(context);
                        } else if (text.includes("openair") || text.includes("timesheet") || text.includes("hoja de horas")) {
                            await this.sendOpenairCard(context);
                        } else if (text.includes("payroll") || text.includes("quincena") || text.includes("nomina")) {
                            await this.sendPayrollCard(context);
                        } else if (text.includes("digital passport") || text.includes("passport")) {
                            await this.sendDigitalPassportCard(context);
                        } else if (text.includes("saving fund") || text.includes("fondo de ahorro")) {
                            await this.sendSavingFundCard(context);
                        } else if (text.includes("one on one") || text.includes("1:1")|| text.includes("uno a uno")) {
                            await this.sendOneonOneCard(context);
                        }
                        
                    }
                    break;
                default:
                    break;
            }
        });

        this.onTeamsChannelCreatedEvent(async (channelInfo, teamInfo, context: TurnContext, next) => {
            await this.sendWelcomeCard( context );
            await next();
        });
    }

    public async sendWelcomeCard( context: TurnContext ): Promise<void> {
        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
        await context.sendActivity({ attachments: [welcomeCard] });
    }

    public async sendHolidaysCard( context: TurnContext ): Promise<void> {
        const holidaysCard = CardFactory.adaptiveCard(HolidaysCard);
        await context.sendActivity({ attachments: [holidaysCard] });
    }

    public async sendOpenairCard( context: TurnContext ): Promise<void> {
        const openairCard = CardFactory.adaptiveCard(OpenairCard);
        await context.sendActivity({ attachments: [openairCard] });
    }

    public async sendPayrollCard( context: TurnContext ): Promise<void> {
        const payrollCard = CardFactory.adaptiveCard(PayrollCard);
        await context.sendActivity({ attachments: [payrollCard] });
    }

    public async sendDigitalPassportCard( context: TurnContext ): Promise<void> {
        const card = CardFactory.adaptiveCard(DigitalPasspordCard);
        await context.sendActivity({ attachments: [card] });
    }

    public async sendSavingFundCard( context: TurnContext ): Promise<void> {
        const card = CardFactory.adaptiveCard(SavingfundCard);
        await context.sendActivity({ attachments: [card] });
    }

    public async sendOneonOneCard( context: TurnContext ): Promise<void> {
        const card = CardFactory.adaptiveCard(OneonOneCard);
        await context.sendActivity({ attachments: [card] });
    }

    private async handleMessageMentionMeOneOnOne(context: TurnContext): Promise<void> {
        const mention = {
            mentioned: context.activity.from,
            text: `<at>${new TextEncoder().encode(context.activity.from.name)}</at>}`,
            type: "mention"
        };

        const replyActivity = MessageFactory.text(`Hi ${mention.text} from a 1:1 chat.`);
        replyActivity.entities = [mention];
        await context.sendActivity(replyActivity);
    }

}
