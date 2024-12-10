import { Client } from "../client";

class BaseCache<V> {
    protected cache: Map<string, V> = new Map();
    protected client: Client;

    public constructor(client: Client) {
        this.client = client;
    }
}

export { BaseCache }