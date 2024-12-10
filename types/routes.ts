export const API_ENDPOINT = 'https://discord.com/api/v10/';

export enum Routes {
    Channels = API_ENDPOINT + 'channels',
    Guilds = API_ENDPOINT + 'guilds',
    Applications = API_ENDPOINT + 'applications',
    Users = API_ENDPOINT + 'users',
    CDN = 'https://cdn.discordapp.com/',
    Avatar = Routes.CDN + 'avatars',
    Banner = Routes.CDN + 'banners',
}

//Taken From https://github.com/Felipe-Devr/blockybridge/blob/main/types/routes.ts