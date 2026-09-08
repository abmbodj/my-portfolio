export interface DisplayMeta {
    label?: string;
    value: string;
    datetime?: string;
}

export interface DisplayLink {
    href: string;
    label: string;
    external?: boolean;
}

export interface ListingItem {
    title: string;
    description?: string;
    date?: string;
    tags: string[];
    links: DisplayLink[];
    image?: string;
}

export interface DetailItem extends ListingItem {
    backHref: string;
}
