import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const publicResume = path.join(projectRoot, "public", "resume.pdf");
const bioFixture = path.join(projectRoot, "src", "content", "bio.md");
const projectFixture = path.join(projectRoot, "src", "content", "projects", "test-project.md");
const basePath = "/academic-portfolio-astro/";

function build() {
    execFileSync("npm", ["run", "build"], {
        cwd: projectRoot,
        env: {
            ...process.env,
            SITE_URL: "https://example.com",
            BASE_PATH: "/academic-portfolio-astro",
        },
        stdio: "pipe",
    });
}

function htmlFiles(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) return htmlFiles(entryPath);
        return entry.name.endsWith(".html") ? [entryPath] : [];
    });
}

function readOutput(relativePath) {
    return readFileSync(path.join(outputRoot, relativePath), "utf8");
}

function minimalPdf() {
    const objects = [
        "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
        "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
        "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
        "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
        "5 0 obj\n<< /Length 50 >>\nstream\nBT /F1 18 Tf 72 720 Td (Resume PDF fixture) Tj ET\nendstream\nendobj\n",
    ];
    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    for (const object of objects) {
        offsets.push(Buffer.byteLength(pdf));
        pdf += object;
    }

    const xrefOffset = Buffer.byteLength(pdf);
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    return Buffer.from(pdf);
}

test("builds Abdoulaye Mbodj's portfolio with only the intended public sections", () => {
    assert.equal(existsSync(publicResume), true, "the personalized portfolio must ship the supplied resume");
    build();

    for (const page of ["index.html", "projects/index.html", "writing/index.html", "resume/index.html", "tags/index.html"]) {
        assert.equal(existsSync(path.join(outputRoot, page)), true, `${page} should be generated`);
    }

    for (const removed of ["cv", "posts", "publications", "talks", "teaching"]) {
        assert.equal(existsSync(path.join(outputRoot, removed)), false, `${removed} should not be generated`);
    }

    const home = readOutput("index.html");
    assert.match(home, /Abdoulaye “Ab” Mbodj/);
    assert.match(home, /Software Engineer/);
    assert.match(home, /Pennsylvania/);
    assert.match(home, /Lowicks/);
    assert.match(home, /Arcadia University/);
    assert.match(home, /href="https:\/\/github\.com\/abmbodj"/);
    assert.match(home, /href="https:\/\/www\.linkedin\.com\/in\/ambodj"/);
    assert.match(home, /href="mailto:pmbodj49@gmail\.com"/);
    assert.match(home, /src="https:\/\/avatars\.githubusercontent\.com\/u\/93449335\?v=4"/);
    assert.doesNotMatch(home, /267-891-0367/);
    assert.match(home, /href="\/academic-portfolio-astro\/projects\/?"/);
    assert.doesNotMatch(home, /href="\/academic-portfolio-astro\/writing\/?"/);
    assert.match(home, /href="\/academic-portfolio-astro\/resume\/?"/);
    assert.doesNotMatch(home, /Publications|Teaching|Claude Shannon|Bell Labs/);
    assert.doesNotMatch(home, /Developer Tools/);

    const sitemap = readOutput("sitemap-0.xml");
    assert.doesNotMatch(sitemap, /\/dev-tools(?:\/|<)/);

    const projects = readOutput("projects/index.html");
    for (const project of ["AgentShelf", "Dawn", "Riven", "ArchieAI"]) {
        assert.match(projects, new RegExp(project));
    }
    for (const date of ["July 2026", "June 2026", "December 2025", "October 2024"]) {
        assert.match(projects, new RegExp(date));
    }

    const writing = readOutput("writing/index.html");
    assert.match(writing, /http-equiv="refresh"/);
    assert.match(writing, /academic-portfolio-astro\/404/);

    const resume = readOutput("resume/index.html");
    assert.match(resume, /data-resume-state="available"/);
    assert.match(resume, /download="Abdoulaye-Mbodj-Resume\.pdf"/);
    assert.match(resume, /<iframe[^>]*src="\/academic-portfolio-astro\/resume\.pdf"/);
});

test("renders repository and live links for the selected projects", () => {
    build();

    const expectedProjects = [
        ["agentshelf", "https://github.com/abmbodj/AgentShelf"],
        ["dawn", "https://github.com/abmbodj/Dawn"],
        ["riven", "https://github.com/abmbodj/Riven"],
        ["archieai", "https://github.com/abmbodj/ArchieAI"],
    ];

    for (const [slug, repository] of expectedProjects) {
        const project = readOutput(`projects/${slug}/index.html`);
        assert.match(project, new RegExp(repository.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }

    assert.match(readOutput("projects/riven/index.html"), /https:\/\/rivenos\.com/);
});

test("prefixes every generated local URL with the configured base path", () => {
    build();

    const rootRelativeUrls = htmlFiles(outputRoot).flatMap((file) => {
        const html = readFileSync(file, "utf8");
        return [...html.matchAll(/\b(?:href|src|data)=["'](\/[^"']*)["']/g)].map((match) => match[1]);
    });

    const urlsOutsideBase = [...new Set(rootRelativeUrls.filter((url) => !url.startsWith(basePath)))].sort();
    assert.deepEqual(urlsOutsideBase, []);
});

test("renders engineer content links, project tags, and the configured resume", () => {
    mkdirSync(path.dirname(projectFixture), { recursive: true });
    const originalBio = readFileSync(bioFixture, "utf8");

    writeFileSync(
        bioFixture,
        originalBio.replace(
            /^avatar:.*$/m,
            'avatar: "images/test-avatar.png"',
        ),
    );

    writeFileSync(projectFixture, `---
title: "Test Project"
description: "A test project used to verify the portfolio content model."
date: "2026-01-15"
tags:
  - "TypeScript"
repository_url: "https://github.com/example/test-project"
live_url: "https://example.com/test-project"
---

Test project details.
`);
    const originalResume = readFileSync(publicResume);
    writeFileSync(publicResume, minimalPdf());

    try {
        build();

        const project = readOutput("projects/test-project/index.html");
        assert.match(project, /View repository/);
        assert.match(project, /View live project/);

        assert.equal(existsSync(path.join(outputRoot, "tags", "typescript", "index.html")), true);
        assert.match(readOutput("index.html"), /src="\/academic-portfolio-astro\/images\/test-avatar\.png"/);

        const rss = readOutput("rss.xml");
        assert.doesNotMatch(rss, /Test Note/);
        assert.doesNotMatch(rss, /\[Publication\]/);

        const resume = readOutput("resume/index.html");
        assert.match(resume, /data-resume-state="available"/);
        assert.match(resume, /href="\/academic-portfolio-astro\/resume\.pdf"[^>]*>Open resume</);
        assert.match(resume, /href="\/academic-portfolio-astro\/resume\.pdf"[^>]*download="Abdoulaye-Mbodj-Resume\.pdf"[^>]*>Download PDF</);
        assert.match(resume, /<iframe[^>]*src="\/academic-portfolio-astro\/resume\.pdf"/);
        assert.match(resume, /title="Resume PDF viewer"/);
    } finally {
        writeFileSync(bioFixture, originalBio);
        rmSync(projectFixture, { force: true });
        writeFileSync(publicResume, originalResume);
    }
});

test("contains no inherited academic identity in source or public assets", () => {
    const roots = ["src", "public", "example_contents"]
        .map((directory) => path.join(projectRoot, directory))
        .filter(existsSync);
    const banned = /Claude Shannon|Bell Labs|Father of Information Theory|academic portfolio/i;

    function files(directory) {
        return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
            const entryPath = path.join(directory, entry.name);
            if (entry.isDirectory()) return files(entryPath);
            return [entryPath];
        });
    }

    const matches = roots.flatMap(files).filter((file) => banned.test(readFileSync(file, "utf8")));
    assert.deepEqual(matches.map((file) => path.relative(projectRoot, file)), []);
});
