import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const writing = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
    schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        draft: z.boolean().optional().default(false),
    }),
});

const bio = defineCollection({
    loader: glob({ pattern: "bio.md", base: "./src/content" }),
    schema: z.object({
        name: z.string(),
        role: z.string(),
        avatar: z.string().optional(),
        shortBio: z.string().optional(),
        location: z.string().optional(),
        availability: z.string().optional(),
    }),
});

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().optional(),
        tags: z.array(z.string()).optional(),
        repository_url: z.string().url().optional(),
        live_url: z.string().url().optional(),
        image: z.string().optional(),
        draft: z.boolean().optional().default(false),
    }),
});

export const collections = { writing, bio, projects };
