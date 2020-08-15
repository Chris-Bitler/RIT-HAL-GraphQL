import {Guild} from "discord.js";

/**
 * Resolver to get the channels for a server
 */
export const ChannelResolver = {
    /**
     * Get the channels for a server
     * @param parent The discord server being queried
     */
    channel: (parent: Guild) => {
        const channels = parent.channels.cache.values();
        return [...channels];
    }
}