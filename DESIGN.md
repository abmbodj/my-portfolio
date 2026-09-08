---
name: Personal Software Engineer Portfolio
description: A precise, content-first portfolio for presenting software engineering work.
colors:
  light-background: "#f9fafb"
  light-foreground: "#111827"
  light-accent: "#1d4ed8"
  light-muted: "#6b7280"
  light-border: "#e5e7eb"
  dark-background: "#241f1c"
  dark-foreground: "#e6dfd3"
  dark-accent: "#d97757"
  dark-muted: "#b7aa9e"
  dark-border: "#3d342d"
typography:
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "4px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
components:
  button:
    backgroundColor: "{colors.light-background}"
    textColor: "{colors.light-foreground}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary:
    backgroundColor: "{colors.light-accent}"
    textColor: "{colors.light-background}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: Personal Software Engineer Portfolio

## Overview

**Creative North Star: "The Engineering Field Note"**

The portfolio should feel like a carefully edited engineering record: compact, legible, and confident enough to let the work speak. The two-column shell keeps identity and contact information steady while the main column carries evidence. It rejects trendy developer clichés and any decoration that competes with the content.

The existing Inter and JetBrains Mono pairing is retained because it is already embedded in the template's identity; no new type family is introduced. Motion is limited to state feedback and restrained entrances that remain fully readable when animation is disabled.

**Key Characteristics:**

- Content-first two-column layout
- Compact spacing with clear grouping
- One functional accent per theme
- Flat surfaces separated by borders
- Direct, descriptive interaction labels

## Colors

The palette uses neutral surfaces and one functional accent in each theme. Accent color is reserved for links, focus, active navigation, and primary actions.

### Primary

- **Signal Blue** (`#1d4ed8`): Light-theme links, focus rings, and primary actions.
- **Burnished Coral** (`#d97757`): Dark-theme links, focus rings, and primary actions.

### Neutral

- **Clear Canvas** (`#f9fafb`) and **Deep Umber** (`#241f1c`): Theme backgrounds and surfaces.
- **Graphite Ink** (`#111827`) and **Soft Chalk** (`#e6dfd3`): Primary text.
- **Slate Note** (`#6b7280`) and **Warm Gray Note** (`#b7aa9e`): Secondary text that remains readable at AA contrast.
- **Quiet Rule** (`#e5e7eb`) and **Dark Rule** (`#3d342d`): Dividers and component boundaries.

**The One Accent Rule.** Never introduce a second decorative accent within a theme.

## Typography

**Display Font:** Inter (with system sans-serif fallback)  
**Body Font:** Inter (with system sans-serif fallback)  
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Inter provides compact, neutral readability. JetBrains Mono is limited to code, tags, and document metadata; it must not become terminal cosplay.

### Hierarchy

- **Title** (800, `1.5rem`, `1.2`): Page and sidebar identity headings.
- **Headline** (700, `1.25rem`, `1.3`): Section and item titles.
- **Body** (400, `0.95rem`, `1.65`): Main copy capped near 70 characters per line.
- **Label** (500, `0.85rem`, `1.5`): Tags, code, and compact metadata.

**The Read-Once Rule.** Text hierarchy must be clear without relying on color alone.

## Elevation

The system is flat. It uses solid one-pixel rules, spacing, and subtle surface changes instead of shadows. Hover states may shift color or move by no more than two pixels, but they never add broad ambient shadows.

**The Flat-by-Default Rule.** No drop shadows, glass layers, or simulated floating cards.

## Components

### Buttons

- **Shape:** Gently squared (`4px` radius).
- **Primary:** Accent background, theme-background text, and `8px 16px` padding.
- **Hover / Focus:** Color inversion on hover and a visible two-pixel dashed focus outline.
- **Secondary:** Transparent background with a one-pixel border.

### Chips

- **Style:** Text-only accent tags with no filled capsule.
- **State:** Underline on hover; topic and count remain readable out of context.

### Cards / Containers

- **Corner Style:** Square or subtly rounded (`4px` maximum).
- **Background:** Theme background or surface token.
- **Shadow Strategy:** None.
- **Border:** Full-width quiet rules only when separation is needed.
- **Internal Padding:** `16px` vertically for list items.

### Navigation

Navigation uses semibold body text, an accent active state, and a short underline indicator. It wraps without hiding links and retains a visible focus outline. About, Projects, Writing, and Resume are the only primary destinations.

### Resume Viewer

The viewer uses a single quiet border and a useful document-height viewport. Open and Download actions precede the embed. Below `768px`, the embedded viewer is hidden and the explicit actions become the primary experience.

## Do's and Don'ts

### Do:

- **Do** use the existing theme tokens and one accent per theme.
- **Do** keep body lines between 65 and 75 characters where possible.
- **Do** give links labels that describe the destination or action.
- **Do** provide intentional empty, missing-file, keyboard, and reduced-motion states.

### Don't:

- **Don't** use trendy developer clichés: terminal cosplay, neon gradients, skill meters, excessive animation, or generic technology icon walls.
- **Don't** introduce glassmorphism, gradient text, broad shadows, or decorative card grids.
- **Don't** use monospace as the main voice or add tiny uppercase labels above every section.
- **Don't** hide Resume access behind the embedded PDF viewer.
- **Don't** place component styles in Astro `<style>` blocks; use `src/styles/global.css`.
