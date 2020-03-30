## BUCKETS

Built with React, Node, and Postgres.

Running `npm run start` spins up the server and front-end app.

## Running migrations

Migrations are maintained with db-migrate. To perform a migration, change directory to src/server/db and run:

```
db-migrate up
```

## Scraping stats

Scraping is done with Puppeteer and Cheerio. To scrape data:

```
node ./src/server/scripts/scraper
```

and to parse data:

```
node ./src/server/scripts/parser
```
