import {Client, Guild, GuildChannel, Permissions, TextChannel} from "discord.js";
import {Response} from "express";

/**
 * Utility singleton class for discordjs related functions
 */
export class DiscordManager {
    client: Client;
    private static instance: DiscordManager;

    constructor() {
        this.client = new Client();
        this.client.login(process.env.discord_token).then(() => console.log("started"));
    }

    /**
     * Get the instance of DiscordManager
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new DiscordManager();
        }

        return this.instance;
    }

    /**
     * Get the guild for this server id, but only if the given user id is an admin
     * @param userId The user's discord id
     * @param serverId The discord server id
     */
    async getGuildIfAdmin(userId: string, serverId: string): Promise<Guild|null> {
        const guild: Guild|null = this.client.guilds.resolve(serverId);
        if (guild) {
            const member = guild.members.resolve(userId);
            if (member?.hasPermission(Permissions.FLAGS.ADMINISTRATOR)) {
                return guild;
            }
        }

        return null;
    }
}