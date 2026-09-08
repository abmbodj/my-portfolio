---
title: "ArchieAI"
description: "A university-focused conversational assistant for finding campus resources, class information, and support services."
date: "2024-10-01"
tags:
  - "Python"
  - "Flask"
  - "Ollama"
  - "AI"
repository_url: "https://github.com/abmbodj/ArchieAI"
---

ArchieAI is a responsive chatbot designed around questions from Arcadia University students. It combines an HTML and CSS conversational interface with Flask routes, REST integrations, prompt handling, and response parsing.

The application uses Ollama for local, privacy-conscious language-model inference. It can stream responses, maintain conversational context, search the web when local university material is insufficient, and persist chat sessions for registered users.

## Highlights

- Responsive conversational interface for campus-focused questions.
- Local model inference through Ollama with streaming responses.
- Flask API routes for chat and session management.
- Account, guest, history, and session-switching workflows.
- Scraped university resources with tool-based web-search fallback.
