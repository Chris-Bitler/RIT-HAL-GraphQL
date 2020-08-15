import gql from "graphql-tag";

/**
 * Overall query type representing a discord server and its underlying resources
 */
export const Server = gql`
    type Server {
        name: String
        channels: [Channel]
        alarms: [Alarm]
        roles: [Role]
        mailConfig: MailConfig
        emojiToRoles: [EmojiToRole]
        config(key: String!): ConfigProperty
    }
`;