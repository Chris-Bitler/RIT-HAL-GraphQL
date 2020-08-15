import {Guild} from "discord.js";
import {MailConfig} from "../../models/MailConfig";

/**
 * Get the mail config for a server
 */
export const MailConfigResolver = {
    /**
     * Get the mail config for a server
     * @param parent The server that the mail config belongs to
     */
    mailconfig: (parent: Guild) => {
        return MailConfig.findOne({
            where: {
                serverId: parent.id
            }
        })
    }
}