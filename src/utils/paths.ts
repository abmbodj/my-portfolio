export function withBase(path: string): string {
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(path)) return path;

    const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
    return `${base}${path.replace(/^\/+/, "")}`;
}
