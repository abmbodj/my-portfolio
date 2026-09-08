import type { DisplayLink, ListingItem, DetailItem } from "../types";

function formatDate(dateValue: string | Date | undefined): string | undefined {
    if (!dateValue) return undefined;
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) return undefined;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function getListingItem(entry: any, collection?: string): ListingItem {
    const d = entry.data;
    const links: DisplayLink[] = [];

    if (d.repository_url) {
        links.push({ href: d.repository_url, label: "View repository", external: true });
    }
    if (d.live_url) {
        links.push({ href: d.live_url, label: "View live project", external: true });
    }
    
    return {
        title: d.title,
        description: d.description,
        date: formatDate(d.date),
        tags: d.tags || [],
        links,
        image: d.image,
    };
}

export function getDetailItem(entry: any, collection: string): DetailItem {
    const listing = getListingItem(entry, collection);
    
    return {
        ...listing,
        backHref: `/${collection}`,
    };
}
