export interface SiteConfig {
    author: string;
    role: string;
    desc: string;
    title: string;
    ogImage?: string;
    favicon: string;
    lang: string;
}

export interface ThemeConfig {
    lightAndDark: boolean;
    themeLight: string;
    themeDark: string;
}

export interface SettingsConfig {
    showTagsInNavbar: boolean;
    showRSSInFooter: boolean;
    addDevToolsInProduction: boolean;
}

export interface UmamiAnalyticsConfig {
    websiteId: string;
    src: string;
}

export interface AnalyticsConfig {
    ga4Id?: string;
    umami?: UmamiAnalyticsConfig;
}

export interface NavLink {
    href: string;
    label: string;
    isActive: boolean;
}

export interface SocialLink {
    name: string;
    href: string;
    linkTitle: string;
    isActive: boolean;
}

export interface PageConfig {
    title: string;
    subtitle: string;
    isActive: boolean;
}

export interface ResumeConfig {
    pdfPath: string;
    downloadName: string;
}

export type PagesConfig = Record<string, PageConfig>;
