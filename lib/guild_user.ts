import { User } from "./user";

class GuildUser extends User {

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
        super(id, username, avatar, discriminator, flags, banner, accent_color, global_name, banner_color)
    }

}