export interface Bio {
    name: string;
    role: string;
    avatar?: string;
    shortBio?: string;
    location?: string;
    availability?: string;
}

export interface BasePage {
    title: string;
    description?: string;
    tags?: string[];
    image?: string;
    draft?: boolean;
}

export interface Writing extends BasePage {
    date: string;
}

export interface Project extends BasePage {
    description: string;
    date?: string;
    repository_url?: string;
    live_url?: string;
}
