
import Parser, { Output } from "rss-parser";

export type SubstackPost = {
  title?: string;
  link?: string;
  contentSnippet?: string;
  isoDate?: string;
  image?: string;
  readingMins?: number;
};

// Shape of the RSS items we read from Substack
type SubstackRssItem = {
  title?: string;
  link?: string;
  contentEncoded?: string; // from customFields mapping
  content?: string;
  contentSnippet?: string;
  isoDate?: string;
};

// Tell Parser what an item looks like so we don’t use `any`
const parser = new Parser<unknown, SubstackRssItem>({
  // Substack includes full HTML in content:encoded
  customFields: { item: [["content:encoded", "contentEncoded"]] },
  // A browser-y UA helps avoid occasional empty responses
  requestOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
    },
  },
});

// Accepts a handle like "yourname" or a full Substack URL.
export async function getSubstackPosts(
  handleOrUrl: string,
  limit = 3
): Promise<SubstackPost[]> {
  const candidates = deriveFeedCandidates(handleOrUrl);

  for (const feedUrl of candidates) {
    try {
      const feed: Output<SubstackRssItem> = await parser.parseURL(feedUrl);
      if (feed?.items?.length) {
        return feed.items.slice(0, limit).map((i: SubstackRssItem) => {
          const html = i.contentEncoded ?? i.content ?? "";
          const text = stripHtml(html);
          const image =
            html.match(/<img[^>]+src="([^">]+)"/i)?.[1] ?? undefined;
          const readingMins = Math.max(
            1,
            Math.round(text.split(/\s+/).length / 220)
          );

          return {
            title: i.title ?? "",
            link: i.link,
            // Prefer the short snippet; fall back to stripping HTML from contentEncoded
            contentSnippet: i.contentSnippet ?? text.slice(0, 220),
            isoDate: i.isoDate,
            image,
            readingMins,
          };
        });
      }
    } catch {
      // try next candidate
    }
  }

  return [];
}

function deriveFeedCandidates(input: string): string[] {
  const out = new Set<string>();

  // If they passed a Substack profile like https://substack.com/@yourhandle/posts
  const handleMatch = input.match(/substack\.com\/@([a-z0-9_-]+)/i);
  if (handleMatch) {
    const h = handleMatch[1];
    out.add(`https://${h}.substack.com/feed`);
    out.add(`https://${h}.substack.com/feed.rss`);
    out.add(`https://substack.com/feed/@${h}`);
  }

  // If they passed a subdomain like https://yourname.substack.com/...
  try {
    const u = new URL(input);
    if (u.hostname.endsWith(".substack.com")) {
      const sub = u.hostname.split(".")[0];
      out.add(`https://${sub}.substack.com/feed`);
      out.add(`https://${sub}.substack.com/feed.rss`);
    }
  } catch {
    // not a URL
  }

  // If they passed just a handle like "yourname"
  if (!/^https?:\/\//i.test(input)) {
    out.add(`https://${input}.substack.com/feed`);
    out.add(`https://${input}.substack.com/feed.rss`);
    out.add(`https://substack.com/feed/@${input}`);
  }

  return Array.from(out);
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}