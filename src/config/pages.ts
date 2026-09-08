import type { PagesConfig } from "../types";

export const PAGES: PagesConfig = {
    home: {
        title: "About",
        subtitle: "",
        isActive: true,
    },
    projects: {
        title: "Projects",
        subtitle: "Selected software projects and the decisions behind them.",
        isActive: true,
    },
    writing: {
        title: "Writing",
        subtitle: "Notes on software engineering, systems, and craft.",
        isActive: true,
    },
    resume: {
        title: "Resume",
        subtitle: "Professional experience and technical background.",
        isActive: true,
    },
    tags: {
        title: "Tags",
        subtitle: "Browse projects and writing by topic.",
        isActive: true,
    },
};
