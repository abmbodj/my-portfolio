import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, PAGES } from "../config";
import { withBase } from "../utils/paths";

export async function GET(context: any) {
    const writing = PAGES.writing.isActive !== false
        ? await getCollection("writing", ({ data }) => data.draft !== true)
        : [];

    const items = writing.map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.description,
        link: withBase(`writing/${entry.id}/`),
    })).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: context.site || "https://example.com",
        items,
    });
}
