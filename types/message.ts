import { EmbedBuilder } from "DiscordMC/classes/embed";

interface MessageReference {
    type?: MessageReferenceType;
    message_id?: string;
    channelId?: string;
    channel_id?: string;
    fail_if_not_exists?: boolean;
}

enum MessageReferenceType {
    Default,
    Forward,
}

interface MessagePayload {
    content: string,
    embeds?: EmbedBuilder[],
    message_reference?: MessageReference

}

export { MessageReference, MessageReferenceType, MessagePayload };