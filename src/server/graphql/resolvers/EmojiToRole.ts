import {Guild} from "discord.js";
import {EmojiToRole} from "../../models/EmojiToRole";

/**
 * Resolve to get the EmojiToRole instances for this server
 */
export const EmojiToRoleResolver = {
    /**
     * Get the emoji->role instances for this server
     * @param parent The discord server the emoji->role instances belong to
     */
    emojiToRole: (parent: Guild) => {
        return EmojiToRole.findAll({
            where: {
                serverId: parent.id
            }
        })
    }
}