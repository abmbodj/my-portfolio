import type { SiteConfig, ThemeConfig, SettingsConfig, UmamiAnalyticsConfig, AnalyticsConfig } from "../types";

export const SITE: SiteConfig = {
    author: "Abdoulaye “Ab” Mbodj",
    role: "Software Engineer",
    desc: "Software engineer building AI-enabled developer tools, student products, and full-stack applications.",
    title: "Abdoulaye “Ab” Mbodj",
    favicon: "favicon.svg",
    lang: "en",
};

export const THEME_CONFIG: ThemeConfig = {
    lightAndDark: true,
    themeLight: "light_default",
    themeDark: "dark_notepad",
};

export const SETTINGS: SettingsConfig = {
    showTagsInNavbar: false,
    showRSSInFooter: true,
    addDevToolsInProduction: false,
};

const umami: UmamiAnalyticsConfig = {
    websiteId: "", // e.g., 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    src: "https://cloud.umami.is/script.js", // Default Umami cloud script URL
}

export const ANALYTICS: AnalyticsConfig = {
    // Google Analytics 4 Measurement ID (e.g., 'G-XXXXXXXXXX')
    ga4Id: "",
    // Umami Analytics configuration
    umami: umami
};
