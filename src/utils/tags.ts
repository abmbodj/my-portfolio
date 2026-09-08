import { getCollection } from 'astro:content';

export async function getAllTags() {
    const projects = await getCollection('projects', ({ data }) => data.draft !== true);
    const writing = await getCollection('writing', ({ data }) => data.draft !== true);

    const allEntries = [...projects, ...writing];
    const tags: Record<string, number> = {};

    allEntries.forEach(entry => {
        const entryTags = (entry.data as any).tags || [];
        entryTags.forEach((tag: string) => {
            const normalizedTag = tag.trim().toLowerCase();
            if (normalizedTag) {
                tags[normalizedTag] = (tags[normalizedTag] || 0) + 1;
            }
        });
    });

    return Object.entries(tags)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getContentByTag(tag: string) {
    const normalizedSearchTag = tag.toLowerCase();

    const projects = await getCollection('projects', ({ data }) => data.draft !== true);
    const writing = await getCollection('writing', ({ data }) => data.draft !== true);

    const filterFn = (entry: any) => {
        const entryTags = (entry.data as any).tags || [];
        return entryTags.some((t: string) => t.toLowerCase() === normalizedSearchTag);
    };

    return [
        ...projects.filter(filterFn).map(e => ({ ...e, collection: 'projects' })),
        ...writing.filter(filterFn).map(e => ({ ...e, collection: 'writing' })),
    ].sort((a, b) => {
        const dateA = new Date((a.data as any).date || 0);
        const dateB = new Date((b.data as any).date || 0);
        return dateB.getTime() - dateA.getTime();
    });
}
