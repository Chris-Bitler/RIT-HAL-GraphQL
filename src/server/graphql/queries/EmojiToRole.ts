import gql from "graphql-tag";

/**
 * Query type representing an Emoji->Role row
 */
export const EmojiToRole = gql`
    type EmojiToRole {
        emojiId: String
        channelId: String
        serverId: String
        roleId: String
    }
`;