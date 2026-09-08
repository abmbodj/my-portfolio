import type { PagesConfig } from "../types";

export const PAGES: PagesConfig = {
    home: {
        title: "About",
        subtitle: "",
        isActive: true,
    },
    projects: {
        title: "Projects",
        subtitle: "Selected AI, developer-tooling, and full-stack projects.",
        isActive: true,
    },
    writing: {
        title: "Writing",
        subtitle: "Notes on software engineering, systems, and craft.",
        isActive: false,
    },
    resume: {
        title: "Resume",
        subtitle: "Experience, education, projects, and technical skills.",
        isActive: true,
    },
    tags: {
        title: "Tags",
        subtitle: "Browse projects and writing by topic.",
        isActive: true,
    },
};
