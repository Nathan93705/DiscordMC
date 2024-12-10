import { TextChannel } from "DiscordMC/classes/channel";

export enum ChannelType {
    GuildText,
    Dm,
    GuildVoice,
    GroupDm,
    GuildCategory,
    GuildAnnouncement,
    AnnouncementThread,
    PublicThread,
    PrivateThread,
    GuildStageVoice,
    GuildDirectory,
    GuildForum,
    GuildMedia,
}

export interface Channels {
    [ChannelType.GuildText]: typeof TextChannel;
}