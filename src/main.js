import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

async function run() {
  const run = await client.actor('devanshlive/goodmoves-jobs-scraper').call({
    discoveryMode: 'sitemap',
    maxItems: 100,
    includeOrganisationDetails: true,
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  console.log(JSON.stringify(items, null, 2));
}

run();
