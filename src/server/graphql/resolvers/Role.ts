import {Guild} from "discord.js";

/**
 * Resolver representing the discord roles attached to
 * a discord server
 */
export const RoleResolver = {
    /**
     * Get the roles attached to a discord server
     * @param parent The server to get the roles for
     */
    role: (parent: Guild) => {
        return [...parent.roles.cache.values()];
    }
}