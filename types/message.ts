import { EmbedBuilder } from "DiscordMC/classes/embed";

export interface MessageReference {
    type?: MessageReferenceType;
    message_id?: string;
    channelId?: string;
    channel_id?: string;
    fail_if_not_exists?: boolean;
}

export enum MessageReferenceType {
    Default,
    Forward,
}

export interface MessagePayload {
    content: string,
    embeds?: EmbedBuilder[],
    message_reference?: MessageReference

}

