import { RawUser } from "DiscordMC/types/raw";
import { Client } from "../client";

class User {
    protected client: Client;

    public readonly id: string;

    public readonly username: string;

    public readonly discriminator: string;

    public readonly bot?: boolean;

    public readonly email?: string;

    public readonly accentColor?: number;

    public readonly locale?: string;

    public readonly flags?: number;

    public readonly publicFlags?: number;

    public readonly verified?: boolean;

    private readonly avatar?: string;

    private readonly banner?: string;

    public constructor(client: Client, data: RawUser) {
        this.client = client;

        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.bot = data.bot;
        this.email = data.email;
        this.accentColor = data.accent_color;
        this.locale = data.locale;
        this.flags = data.flags;
        this.verified = data.verified;
        this.avatar = data.avatar;
        this.banner = data.banner;
        this.publicFlags = data.public_flags;
    }
}

export { User }