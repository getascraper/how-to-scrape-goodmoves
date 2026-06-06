<div align="center">

# Goodmoves Jobs Scraper | Charity Sector Jobs API | Apify Actor

[![Apify Actor](https://img.shields.io/badge/Apify-Actor-ff6b35?style=for-the-badge&logo=apify&logoColor=white)](https://apify.com/devanshlive/goodmoves-jobs-scraper) [![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Free Tier](https://img.shields.io/badge/Free-Tier%20Included-blue?style=for-the-badge)](https://apify.com/devanshlive/goodmoves-jobs-scraper/apify/console) [![JSON-LD](https://img.shields.io/badge/Schema.org-JobPosting-ff6b35?style=for-the-badge)](https://schema.org/JobPosting)

**Goodmoves scraper and charity sector job data extraction API for Scottish nonprofits.** Pull titles, employers, salaries, locations, apply links, OSCR charity numbers, and organisation websites from Goodmoves.org with this Apify Actor. Free tier included.

Pull structured Scottish voluntary sector job postings as JSON-LD with apply metadata and OSCR charity register joins. Drop into Apify, Make, n8n, or your RAG pipeline.

[Quick Start](#quick-start) · [Output Schema](#output-schema) · [Pricing](#pricing) · [FAQ](#faq)

[![Apify Actor Hero](https://raw.githubusercontent.com/getascraper/how-to-scrape-goodmoves/main/docs/hero-screenshot.png)](https://apify.com/devanshlive/goodmoves-jobs-scraper)

</div>

---

## What is Goodmoves Jobs Scraper?

**Goodmoves jobs scraper and Scottish charity sector recruitment data API.** This Apify Actor turns [Goodmoves.org](https://goodmoves.org/) (Scotland's largest charity and voluntary sector job board, run by SCVO) into clean structured JSON with title, employer, salary, location, dates, apply metadata, and organisation enrichment.

Built for charity sector analysts, recruitment agencies, AI/RAG developers, and labour market researchers who need Scottish nonprofit hiring data without copy-pasting from job boards.

## Why use Goodmoves Jobs Scraper?

- **Schema.org JobPosting output** - Title, salary, location, dates, employment type, full description, and organisation address all parsed from the page's `application/ld+json` block (the same data Google reads). Drop-in for Google Jobs feeds, Indeed imports, or your ATS.
- **Apply metadata captured** - Recruiter email (mailto), outbound apply URL, or downloadable PDF. The "Application notes" section yields the contact, no resolver step needed.
- **Scottish Charity Register join** - Each row can include the OSCR charity number (e.g. `SC039119`) for free, joining job data to Scotland's official nonprofit register.
- **JSON-LD backed accuracy** - Same data source as Google, Bing, and other search engines. No guessing, no regex scraping.
- **No anti-bot, no auth** - All 300+ live vacancies scrape in under a minute. Direct API access, no browser overhead.
- **Lower price** - $1.99 per 1,000 jobs vs $2.60 to $2.90 on the main competitors.
- **Flexible discovery** - Use the sitemap (all live jobs), pass listing URLs (e.g. `/jobs-in/glasgow`), or paste direct vacancy URLs.

## Quick Start

```bash
npm install apify-client
```

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor('devanshlive/goodmoves-jobs-scraper').call({
  discoveryMode: 'sitemap',
  maxItems: 100,
  includeOrganisationDetails: true,
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

## How to use

1. Open the Actor in [Apify Console](https://apify.com/devanshlive/goodmoves-jobs-scraper)
2. Set **Discovery mode** to `Sitemap` to fetch all live vacancies (default), or `Listing` for a specific region
3. Optionally add Goodmoves URLs (listing, search, browse, or direct vacancy)
4. Set **Maximum jobs** (default 100, max 5000)
5. Enable **Include organisation details** to enrich rows with website + OSCR charity number
6. Click **Start** and download the dataset as JSON, CSV, or Excel

Supported URL types:

- `https://goodmoves.org/jobs-in/glasgow` (location listing)
- `https://goodmoves.org/search?keywords=fundraising` (search results)
- `https://goodmoves.org/browse/charity-sector` (browse facets)
- `https://goodmoves.org/vacancy/{salesforce-id}/{slug}` (direct vacancy)

You do not need Goodmoves cookies, a Goodmoves account, or a separate Goodmoves API key.

## What data does it extract?

| Field | Description |
|---|---|
| `type` | Always `job` |
| `jobId` | 15-char Salesforce job identifier (lowercase) |
| `jobId18Char` | 18-char mixed-case Salesforce identifier from JSON-LD `@id` |
| `jobUrl` | Direct vacancy URL |
| `sourceListingUrl` | Listing URL that produced this job |
| `title` | Job title |
| `descriptionHtml` / `descriptionText` | Full job description (HTML and plain text) |
| `postedDate` / `closingDate` | ISO 8601 timestamps |
| `daysUntilClosing` | Computed from closing date |
| `companyName` | Organisation name |
| `companyLogoUrl` | Organisation logo URL |
| `companyProfileUrl` | Goodmoves organisation profile URL |
| `companyWebsite` / `companyDomain` | Organisation website (enrichment) |
| `oscrCharityNumber` | Scottish Charity Register number (enrichment) |
| `location` | Object: street, locality, region, country, postcode, joined text |
| `salary` | Raw text + parsed min/max + currency + period |
| `applyType` | `email`, `url`, `pdf`, or `none` |
| `applyEmail` | Application email from mailto link |
| `applyUrl` / `externalApplyUrl` | Application URL (internal or external) |
| `employmentType` | Full time, Part time, etc. |
| `occupationalCategory` | Role categories (array) |
| `industry` | Industry tags (array) |
| `workplaceType` | On site, Hybrid, Remote |
| `workHours` | Work hours description |
| `workingPattern` | Full time, Part time, Management Board |
| `enrichment` | Metadata about organisation enrichment state |
| `scrapedAt` | ISO 8601 timestamp of scrape |

## Output example

```json
{
  "type": "job",
  "jobId": "a4sp1000001gpvniay",
  "jobUrl": "https://goodmoves.org/vacancy/a4sp1000001gpvniay/supporter-care-executive",
  "sourceListingUrl": "https://goodmoves.org/jobs-in/glasgow",
  "title": "Supporter Care Executive",
  "companyName": "Glasgow Children's Hospital Charity",
  "companyWebsite": "https://www.gchc.scot",
  "companyDomain": "gchc.scot",
  "oscrCharityNumber": "SC039119",
  "location": {
    "streetAddress": "Paisley Northwest",
    "locality": "Paisley and Renfrewshire North",
    "region": "Renfrewshire",
    "country": "Scotland",
    "postalCode": "PA3 2RB",
    "text": "Paisley Northwest, Paisley and Renfrewshire North, PA3 2RB"
  },
  "salary": {
    "rawText": "£26000 - £29000",
    "min": 26000,
    "max": 29000,
    "currency": "GBP",
    "period": "YEAR"
  },
  "postedDate": "2026-05-28T14:24:00",
  "closingDate": "2026-06-14T22:59:00",
  "daysUntilClosing": 8,
  "employmentType": "Full time or Part time",
  "industry": ["Children & Early Years", "Health"],
  "occupationalCategory": ["Administration"],
  "workplaceType": "On site",
  "workHours": "35 hours per week",
  "applyType": "email",
  "applyEmail": "melissa.sutherland@gchc.scot",
  "scrapedAt": "2026-06-06T10:00:00.000Z"
}
```

## Use cases

- **Charity sector analysts** - Track hiring trends, build longitudinal datasets on Scotland's voluntary sector workforce.
- **Salary benchmarking** - Join Goodmoves salary data with OSCR charity register for compensation reports.
- **Recruitment agencies** - Source-of-truth feed of new charity vacancies, no manual copy-paste.
- **AI/RAG pipelines** - Build vector indexes over Scottish charity job descriptions for recruitment chatbots.
- **Academic researchers** - Longitudinal workforce studies on the UK third sector.
- **Job aggregators** - Ingest Goodmoves listings into a unified nonprofit jobs board.
- **Talent acquisition** - Competitive intelligence on which charities are hiring what roles.

## Pricing

**$1.99 per 1,000 scraped jobs.** Runs that find no matching jobs do not create paid items. A typical run of 100 jobs completes in 1 to 2 minutes.

## Tips

- For monitoring new listings over time, enable `onlyNewJobs` and run on a schedule
- Set `discoveryMode: sitemap` to scrape the full job board in one run
- For targeted extraction (e.g. only Edinburgh), use `discoveryMode: listing` with `/jobs-in/edinburgh` as the start URL
- Disable `includeOrganisationDetails` to skip the org enrichment pass and speed up large runs
- Pair this Actor with the [Apify MCP server](https://mcp.apify.com/) to query Goodmoves data from Claude or ChatGPT

## FAQ

### Can I scrape Goodmoves without a login?

Yes. Goodmoves jobs are public pages. This Actor works with public data and does not ask for cookies, passwords, or API keys.

### Can I use direct vacancy URLs?

Yes. Add direct Goodmoves vacancy URLs to `startUrls` and set `discoveryMode: none`. Each valid direct vacancy URL saves one job item.

### Can I monitor new Goodmoves jobs?

Yes. Enable `onlyNewJobs` and run the Actor on a schedule. The first run builds the baseline, later runs save only new jobs. Use `Reset seen jobs` to rebuild the baseline.

### Why is a salary field empty?

Some Goodmoves postings do not show salary details. When salary text is visible, the Actor saves the raw text and parses numeric min and max values.

### What is the OSCR charity number?

OSCR is the Office of the Scottish Charity Regulator. Each registered charity has a unique number (format `SC######`). This Actor extracts it from the organisation's Goodmoves profile page, so you can join job data to Scotland's official charity register.

### How does this compare to the main competitor?

We are 24 to 31 percent cheaper than the two main Goodmoves Actors on Apify Store ($1.99 per 1,000 vs $2.60 to $2.90). We also include organisation enrichment (website, domain, OSCR number) by default, output Schema.org JobPosting JSON-LD, and offer a sitemap discovery mode for one-click full-board extraction.

## Limits and caveats

- Goodmoves can omit fields such as salary, work hours, workplace type, apply email, or organisation details on some vacancies
- Organisation enrichment depends on public Goodmoves organisation profiles. If a profile is missing or incomplete, organisation fields can stay empty
- `onlyNewJobs` is Actor-level monitoring state, not a Goodmoves account feature
- Direct vacancy URLs normally produce one job item each when the page still exposes public job data

## Support

For issues, questions, or feature requests, file a ticket in the [Apify Console](https://console.apify.com/actors/devanshlive~goodmoves-jobs-scraper/issues).

## Related resources

- [Goodmoves.org](https://goodmoves.org/) - Scotland's charity and voluntary sector job board
- [SCVO](https://scvo.scot/) - Scottish Council for Voluntary Organisations
- [OSCR](https://www.oscr.org.uk/) - Office of the Scottish Charity Regulator
- [Apify Client for JavaScript](https://docs.apify.com/api/client/js/)
- [Apify MCP Server](https://mcp.apify.com/) - Query Apify Actors from Claude or ChatGPT
