import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import * as sentry from "@sentry/node";
import session from "express-session";
import merge from "lodash/merge";
import {configurePassport} from "./config/passportConfig";
import {DiscordManager} from "./discord/DiscordManager";
import {ApolloServer, gql} from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import {AuthorizationError} from "passport-oauth2";
import {Server} from "./graphql/queries/Server";
import {serverResolver} from "./graphql/resolvers/Server";
import {Channel} from "./graphql/queries/Channel";
import {ChannelResolver} from "./graphql/resolvers/Channel";
import {IncomingMessage} from "http";
import {Sequelize} from "sequelize-typescript";
import {ConfigProperty} from "./models/ConfigProperty";
import {Emoji} from "./models/Emoji";
import {EmojiToRole} from "./models/EmojiToRole";
import {Punishment} from "./models/Punishment";
import {Alarm} from "./models/Alarm";
import {MailConfig} from "./models/MailConfig";
import {ConfigPropertyResolver} from "./graphql/resolvers/ConfigProperty";
import {ConfigProperty as ConfigPropertyType} from "./graphql/queries/ConfigProperty";
import {AlarmResolver} from "./graphql/resolvers/Alarm";
import {Alarm as AlarmPropertyType} from "./graphql/queries/Alarm";
import {MailConfig as MailConfigType} from "./graphql/queries/MailConfig";
import {EmojiToRole as EmojiToRoleType} from "./graphql/queries/EmojiToRole";
import {MailConfigResolver} from "./graphql/resolvers/MailConfig";
import {EmojiToRoleResolver} from "./graphql/resolvers/EmojiToRole";
import {Role} from "./graphql/queries/Role";
import {RoleResolver} from "./graphql/resolvers/Role";

dotenv.config();

sentry.init({
    dsn: process.env.sentry_dsn
})

const app = express();
app.use(sentry.Handlers.requestHandler());
app.use(session({
    secret: process.env.session_secret as string,
    cookie: {
        secure: false,
        sameSite: "lax"
    },
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

const sequelize: Sequelize = new Sequelize(
    process.env.DATABASE_URL as string,
    {
        dialect: "postgres",
        logging: false,
        models: [ConfigProperty, Emoji, EmojiToRole, Punishment, Alarm, MailConfig]
    });
sequelize.sync();

// Overall query type
const queryTypeDefs = gql`
  type Query {
    Server(id: String!): Server
  }
`;

// Set up resolvers
const resolvers = {
    Query: {
        Server: serverResolver.server
    },
    Server: {
        channels: ChannelResolver.channel,
        config: ConfigPropertyResolver.configProperty,
        alarms: AlarmResolver.alarm,
        mailConfig: MailConfigResolver.mailconfig,
        emojiToRoles: EmojiToRoleResolver.emojiToRole,
        roles: RoleResolver.role
    }
};

DiscordManager.getInstance(); // Initialize the client

const schema = makeExecutableSchema({
    typeDefs: [queryTypeDefs, Server, Channel, ConfigPropertyType, AlarmPropertyType, MailConfigType, EmojiToRoleType, Role],
    resolvers: resolvers
});

// two rest endpoints for oauth
app.get("/oauth", passport.authenticate("oauth2"));

app.get("/oauth/callback",
    passport.authenticate("oauth2", {successRedirect: "/graphql"}),
);

// Set up graphql server
const server = new ApolloServer({
    schema,
    context: (req: ApolloRequest) => {
        const user = req.req.user;
        if (!user) throw new AuthorizationError('You must be logged in', "400");

        return { user }
    }
});

server.applyMiddleware({app, path: '/graphql'});

app.use(sentry.Handlers.errorHandler());

app.listen(80, () => {
    console.log("Started");
});