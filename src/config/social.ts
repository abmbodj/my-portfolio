import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/abmbodj",
        linkTitle: "View Ab's GitHub profile",
        isActive: true,
    },
    {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/ambodj",
        linkTitle: "Connect with Ab on LinkedIn",
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:pmbodj49@gmail.com",
        linkTitle: "Email Ab",
        isActive: true,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    RSS: "RSS",
};
