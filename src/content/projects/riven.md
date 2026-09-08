---
title: "Riven"
description: "A full-stack student platform for study content, collaborative learning, class planning, and AI-assisted workflows."
date: "2025-12-01"
tags:
  - "React"
  - "TypeScript"
  - "Supabase"
  - "PostgreSQL"
  - "Capacitor"
repository_url: "https://github.com/abmbodj/Riven"
live_url: "https://rivenos.com"
---

Riven brings flashcards, notes, study guides, generated exams, class planning, collaborative study groups, and social features into one student-focused product. The client is a React 19 application delivered as both a PWA and a native iOS experience through Capacitor.

The platform uses 39 Deno edge functions over a 48-table PostgreSQL schema. Its AI pipeline converts notes, PDFs, audio, and YouTube transcripts into study materials using transcription, streamed generation, queued jobs, and per-user rate limiting.

Riven also connects the surrounding product systems needed by a full application: Supabase authentication and storage, offline IndexedDB paths, Stripe billing on the web, RevenueCat on iOS, transactional email, observability, and collaborative workflows.

## Highlights

- React 19 client with PWA and Capacitor iOS delivery.
- AI-generated flashcards, mock exams, study guides, and note workflows.
- Realtime study groups, spaced-repetition fields, and progress systems.
- Stripe and RevenueCat billing with verified, idempotent webhook handling.
- Shared business logic tested under Node.js and Deno across more than 60 test files.
