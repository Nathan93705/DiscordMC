

export class User {
    readonly id: string
    readonly username: string
    readonly avatar: string | null
    readonly discriminator: number
    readonly flags: number
    readonly banner: string | null | undefined
    readonly accent_color: number | null | undefined
    readonly global_name: string | null
    readonly banner_color: number | null | undefined


    constructor(
        id: string,
        username: string,
        avatar: string,
        discriminator: number,
        flags: number,
        banner: string,
        accent_color: number,
        global_name: string,
        banner_color: number
    ) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.discriminator = discriminator;
        this.flags = flags;
        this.banner = banner;
        this.accent_color = accent_color;
        this.global_name = global_name;
        this.banner_color = banner_color;
    }

    avatarURL(): string | null {
        if (!this.avatar) return null
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`
    }

    bannerURL() {
        if (!this.banner) return null
        return `https://cdn.discordapp.com/banners/${this.id}/${this.banner}`
    }

    toString(): string {
        return `<@${this.id}>`
    }
}