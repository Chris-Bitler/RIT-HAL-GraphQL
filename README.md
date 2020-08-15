<p align="center">
<img alt="HAL profile picture" src="https://cdn.discordapp.com/app-icons/643590178727919616/7a9a0505cdd4f951e34f392e6ef9eba1.png?size=512" />
</p>

## HAL Discord Bot - GraphQL web server

GraphQL server powering the backend for the HAL web panel

Currently hosted on Heroku

## How to run HAL
1. Pull the code down via `git clone git@github.com:Chris-Bitler/RIT-HAL-GraphQL.git`
4. Move .env.bk to .env
2. Set the .env variables per below
5. Run npm install in the project directory
6. Run tsc to build the typescript code
7. Run the bot via `npm run graphql`

## Filling in .env
The environment file includes 6 different environment variables that need to be filled out for HAL to work correctly. They are as follows:
```
session_secret: Secret for web sessions
oauth_secret: Discord both oauth secret
discord_client_id: Discord bot client ID
discord_token: Discord bot token
discord_authorize_url: Discord authorize url to use
sentry_dsn: Sentry error logging DSN
callback_url: The callback url for oauth completion
DATABASE_URL: Postgres server urll
```