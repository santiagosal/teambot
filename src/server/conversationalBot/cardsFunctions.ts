import { CardFactory, TurnContext } from "botbuilder";
import WelcomeCard from "./cards/welcomeCard/welcomeCard";
import HolidaysCard from "./cards/holidaysCard/holidaysCard";
import OpenairCard from "./cards/openairCard/openairCard";
import PayrollCard from "./cards/payrollCard/payrollCard";
import DigitalPasspordCard from "./cards/digitalPassportCard/digitalPassportCard";
import OfficeCard from "./cards/officeCards/officeCard";
import OneonOneCard from "./cards/oneononeCard/oneoneCard";
import SavingfundCard from "./cards/savingfundCard/savingfundCard";
import LearningCard from "./cards/learningCard/learningCard";
import PrismCard from "./cards/prismCard/prismCard";
import OpportunitiesCard from "./cards/opportunitiesCard/opportunitiesCard";
import MedicCard from "./cards/medicCard/medicCard";
import WellnessCard from "./cards/wellnessCard/wellnessCard";

export const sendWelcomeCard = async function( context: TurnContext ): Promise<void> {
    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
    await context.sendActivity({ attachments: [welcomeCard] });
};

export const sendHolidaysCard = async function( context: TurnContext ): Promise<void> {
    const holidaysCard = CardFactory.adaptiveCard(HolidaysCard);
    await context.sendActivity({ attachments: [holidaysCard] });
};

export const sendOpenairCard = async function( context: TurnContext ): Promise<void> {
    const openairCard = CardFactory.adaptiveCard(OpenairCard);
    await context.sendActivity({ attachments: [openairCard] });
};

export const sendPayrollCard = async function( context: TurnContext ): Promise<void> {
    const payrollCard = CardFactory.adaptiveCard(PayrollCard);
    await context.sendActivity({ attachments: [payrollCard] });
};

export const sendDigitalPassportCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(DigitalPasspordCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendSavingFundCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(SavingfundCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendOneonOneCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(OneonOneCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendOfficeCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(OfficeCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendLearningCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(LearningCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendPrismCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(PrismCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendMedicCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(MedicCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendWellnessCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(WellnessCard);
    await context.sendActivity({ attachments: [card] });
};

export const sendOpportunitiesCard = async function( context: TurnContext ): Promise<void> {
    const card = CardFactory.adaptiveCard(OpportunitiesCard);
    await context.sendActivity({ attachments: [card] });
};
