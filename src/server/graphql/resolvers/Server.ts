import {DiscordManager} from "../../discord/DiscordManager";

/**
 * Server resolver. Overall resolver, gets guild and passes it
 * to child resolvers
 */
export const serverResolver = {
    /**
     * Get the server for the provided id if the querying user is an admin
     * @param _ null
     * @param args object containing server id
     * @param context context containing user with id
     */
    server: async (_: any, args: any, context: any) => {
        const serverId = args.id;
        return DiscordManager.getInstance().getGuildIfAdmin(context.user.id, serverId);
    }
}