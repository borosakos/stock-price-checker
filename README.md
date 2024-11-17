# Stock Price Checker

## Description

This application is a stock monitoring service that checks the price of the required stock and calculates the moving average of it.

## Project setup

You can either set up this application on your computer, or you can use the `docker-compose.yaml` file.

```bash
$ docker compose up -d
```

```bash
$ npm install
```

## Environment variables

To be able to run the application define the environment variables listed in the `.env.example` file.

- `DB_NAME`: The name of the database.
- `DB_HOST`: The hostname of the database.
- `DB_PORT`: The port number of the database.
- `DB_PASSWORD`: The password to connect to the database.
- `DB_USERNAME`: The user name to connect to the database.
- `STOCK_API_KEY`: The API_KEY of the third-party stock API provider (currently Finnhub).

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
