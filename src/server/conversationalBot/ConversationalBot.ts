import { BotDeclaration } from "express-msteams-host";
import * as debug from "debug";
import { CardFactory, ConversationState, MemoryStorage, UserState, TurnContext, MessageFactory, ActivityTypes } from "botbuilder";
import { DialogBot } from "./dialogBot";
import { MainDialog } from "./dialogs/mainDialog";
import WelcomeCard from "./cards/welcomeCard";
import { DialogSet } from "botbuilder-dialogs";

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
                        } else if (text.startsWith("hello")) {
                            await context.sendActivity("Oh, hello to you as well!");
                        } else {
                            await context.sendActivity("I'm terribly sorry, but my developer hasn't trained me.");
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    }

    public async sendWelcomeCard( context: TurnContext ): Promise<void> {
        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
        await context.sendActivity({ attachments: [welcomeCard] });
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
