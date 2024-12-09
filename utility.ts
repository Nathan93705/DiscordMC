import { HttpRequestMethod, HttpRequest, HttpHeader } from "@minecraft/server-net";

export function discordAPI(string: string, method: HttpRequestMethod, botToken: string): HttpRequest {
    const request = new HttpRequest(`https://discord.com/api/v10/${string}`);

    request.method = method;

    request.headers = [
        new HttpHeader("Content-Type", "application/json"),
        new HttpHeader("Authorization", `Bot ${botToken}`)
    ]
    return request
}