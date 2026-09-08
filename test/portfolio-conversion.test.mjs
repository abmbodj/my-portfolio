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
const writingFixture = path.join(projectRoot, "src", "content", "writing", "test-note.md");
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

test("builds the neutral portfolio shell with only the intended public sections", () => {
    assert.equal(existsSync(publicResume), false, "the neutral template must not ship a resume");
    build();

    for (const page of ["index.html", "projects/index.html", "writing/index.html", "resume/index.html", "tags/index.html"]) {
        assert.equal(existsSync(path.join(outputRoot, page)), true, `${page} should be generated`);
    }

    for (const removed of ["cv", "posts", "publications", "talks", "teaching"]) {
        assert.equal(existsSync(path.join(outputRoot, removed)), false, `${removed} should not be generated`);
    }

    const home = readOutput("index.html");
    assert.match(home, /Your Name/);
    assert.match(home, /Software Engineer/);
    assert.match(home, /href="\/academic-portfolio-astro\/projects\/?"/);
    assert.match(home, /href="\/academic-portfolio-astro\/writing\/?"/);
    assert.match(home, /href="\/academic-portfolio-astro\/resume\/?"/);
    assert.doesNotMatch(home, /Publications|Teaching|Claude Shannon|Bell Labs/);
    assert.doesNotMatch(home, /Developer Tools/);

    const sitemap = readOutput("sitemap-0.xml");
    assert.doesNotMatch(sitemap, /\/dev-tools(?:\/|<)/);

    assert.match(readOutput("projects/index.html"), /data-empty-state="projects"/);
    assert.match(readOutput("writing/index.html"), /data-empty-state="writing"/);

    const resume = readOutput("resume/index.html");
    assert.match(resume, /data-resume-state="missing"/);
    assert.match(resume, /Resume not added yet/);
    assert.doesNotMatch(resume, /<iframe/);
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

test("renders engineer content links, writing RSS, tags, and the configured resume", () => {
    mkdirSync(path.dirname(projectFixture), { recursive: true });
    mkdirSync(path.dirname(writingFixture), { recursive: true });
    const originalBio = readFileSync(bioFixture, "utf8");

    writeFileSync(
        bioFixture,
        originalBio.replace(/^---\n/, '---\navatar: "images/test-avatar.png"\n'),
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
    writeFileSync(writingFixture, `---
title: "Test Note"
date: "2026-02-01"
description: "A test note used to verify Writing, RSS, and tags."
tags:
  - "TypeScript"
image: "images/test-note.png"
---

Test note body.
`);
    writeFileSync(publicResume, minimalPdf());

    try {
        build();

        const project = readOutput("projects/test-project/index.html");
        assert.match(project, /View repository/);
        assert.match(project, /View live project/);

        assert.equal(existsSync(path.join(outputRoot, "writing", "test-note", "index.html")), true);
        assert.equal(existsSync(path.join(outputRoot, "tags", "typescript", "index.html")), true);
        assert.match(readOutput("index.html"), /src="\/academic-portfolio-astro\/images\/test-avatar\.png"/);
        assert.match(readOutput("writing/test-note/index.html"), /content="https:\/\/example\.com\/academic-portfolio-astro\/images\/test-note\.png"/);

        const rss = readOutput("rss.xml");
        assert.match(rss, /Test Note/);
        assert.doesNotMatch(rss, /\[Publication\]/);

        const resume = readOutput("resume/index.html");
        assert.match(resume, /data-resume-state="available"/);
        assert.match(resume, /href="\/academic-portfolio-astro\/resume\.pdf"[^>]*>Open resume</);
        assert.match(resume, /href="\/academic-portfolio-astro\/resume\.pdf"[^>]*download="resume\.pdf"[^>]*>Download PDF</);
        assert.match(resume, /<iframe[^>]*src="\/academic-portfolio-astro\/resume\.pdf"/);
        assert.match(resume, /title="Resume PDF viewer"/);
    } finally {
        writeFileSync(bioFixture, originalBio);
        rmSync(projectFixture, { force: true });
        rmSync(writingFixture, { force: true });
        rmSync(publicResume, { force: true });
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
