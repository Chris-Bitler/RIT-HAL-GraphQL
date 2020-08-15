import passport from "passport";
import OAuth2Strategy from "passport-oauth2";

import axios, {AxiosInstance} from "axios";

// Create axios instance to use with passport to contact discord api
export const instance: AxiosInstance = axios.create({
    baseURL: "https://discord.com/api/v6"
});

/**
 * Config passport to use oauth2 and query the discord api to get user id
 */
export function configurePassport() {
    passport.use(
        new OAuth2Strategy(
            {
                authorizationURL: process.env.discord_authorize_url as string,
                tokenURL: "https://discord.com/api/oauth2/token",
                clientID: process.env.discord_client_id as string,
                clientSecret: process.env.oauth_secret as string,
                callbackURL: process.env.callback_url as string
            },
            async function(accessToken: string, refreshToken: string, profile: any, cb: any) {
                const response = await instance.get("/users/@me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const userId = response.data?.id;
                if (userId) {
                    cb(null, {id: userId});
                } else {
                    cb(JSON.stringify({
                        error: "Invalid user"
                    }))
                }
            }
        )
    );

    passport.serializeUser((id, done) => {
        done(null, id);
    });

    passport.deserializeUser((id, done) => {
        done(null, id);
    })
}