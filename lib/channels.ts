import { Client } from "..";

export class GuildChannel {
    id: string;
    type: number;
    flags: number;
    guildId: string;
    name: string;
    parentId: string | null;
    position: number;
    permissionOverwrites: PermissionOverwrite[];

    private client: Client

    constructor(data: any, client: Client) {
        this.client = client
        this.id = data.id;
        this.type = data.type;
        this.flags = data.flags;
        this.guildId = data.guild_id;
        this.name = data.name;
        this.parentId = data.parent_id;
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites.map(
            (po: any) => new PermissionOverwrite(po)
        );
    }
}

export class PermissionOverwrite {
    id: string;
    type: number;
    allow: string;
    deny: string;

    constructor(data: any) {
        this.id = data.id;
        this.type = data.type;
        this.allow = data.allow;
        this.deny = data.deny;
    }
}

// TextChannel subclass
export class TextChannel extends GuildChannel {
    lastMessageId: string | null;
    rateLimitPerUser: number;
    topic: string | null;
    defaultThreadRateLimitPerUser: number;
    nsfw: boolean;
    type = 0
    private _client: Client

    constructor(data: any, client: Client) {
        super(data, client);
        this._client = client
        this.lastMessageId = data.last_message_id;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.topic = data.topic;
        this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;
        this.nsfw = data.nsfw;
    }
}

// VoiceChannel subclass
export class VoiceChannel extends GuildChannel {
    lastMessageId: string | null;
    bitrate: number;
    userLimit: number;
    rtcRegion: string | null;
    nsfw: boolean;
    type = 2
    private _client: Client

    constructor(data: any, client: Client) {
        super(data, client);
        this._client = client
        this.lastMessageId = data.last_message_id;
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
        this.rtcRegion = data.rtc_region;
        this.nsfw = data.nsfw;
    }
}

// CategoryChannel subclass
export class CategoryChannel extends GuildChannel {
    private _client: Client
    type = 4

    constructor(data: any, client: Client) {
        super(data, client);
        this._client = client
    }
}

export enum ChannelType {
    GuildText = 0,
    DM = 1,
    GuildVoice = 2,
    GroupDM = 3,
    GuildCategory = 4,
    GuildAnnouncement = 5,
    AnnouncementThread = 10,
    PublicThread = 11,
    PrivateThread = 12,
    GuildStageVoice = 13,
    GuildDirectory = 14,
    GuildForum = 15,
    GuildMedia = 16,
    GuildNews = 5,
    GuildNewsThread = 10,
    GuildPublicThread = 11,
    GuildPrivateThread = 12
}
