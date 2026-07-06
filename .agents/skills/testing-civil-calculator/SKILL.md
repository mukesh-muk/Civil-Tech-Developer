---
name: testing-civil-calculator
description: Test the Civil Calculator Pro static HTML app end-to-end. Use when verifying UI, calculator logic, event bindings, CSP, PDF generation, or error-handling changes.
---

# Testing Civil Calculator Pro

Static client-side app: `index.html` + `script.js` + `style.css`. No build step, no package.json, no CI.

## Serving Locally

```bash
cd <repo> && python3 -m http.server 8080 &
# open http://localhost:8080/ in Chrome
```

Needed for proper origin context and CSP enforcement.

## App Structure

- **index.html**: Single-page app with 8 tab sections, 17+ calculators
- **script.js**: All logic — calculator functions, event bindings via `DOMContentLoaded`, validation
- **style.css**: Responsive technical UI, animations, and print media rules
- **jsPDF**: CDN-loaded library for PDF report generation (loaded with SRI integrity hash)
- Tabbed UI: Concrete, Brick, Materials, Structure, Finishing, Cost, Report, AI Prices. Tabs switch via `showTab(name, clickedBtn)`.
- Calculators write into a global `results` object; the Report tab's "Download Full Report" (`generateReport()`) builds a jsPDF document from `results`.
- AI Prices tab: `fetchAIPrices()` disables the button, shows a spinner (`#aiLoading`), and after a 1.5s `setTimeout` fills a hidden `#priceGrid` and `#aiSummary`.
- Event handlers use `data-tab`, `data-calc`, `data-reset` attributes bound via `addEventListener` (no inline `onclick`).

## Test Checklist

### Core Functionality
- [ ] **Tab switching**: Click each tab — verify section switches and tab highlights with orange underline
- [ ] **Calculator buttons**: Enter values and click Calculate on at least one calculator per tab — verify correct numeric results appear
- [ ] **Reset/Clear buttons**: After calculating, click Clear — verify inputs empty and result box hides
- [ ] **Input validation**: Enter a value > 999999 — verify error message "Please enter valid values" with red border
- [ ] **PDF report**: Switch to Report tab, click "Download Full Report" — verify PDF downloads and success message appears
- [ ] **Language selector**: Switch between English/Tamil/Hindi — verify labels update

### Security Checks
- [ ] **CSP enforcement**: Open DevTools Console — no "Refused to execute inline event handler" errors
- [ ] **SRI verification**: Check Network tab — jsPDF script loads successfully with integrity check
- [ ] **No console.log leaks**: Switching languages should not produce console output

## Triggering Error Paths (otherwise hard to reproduce via UI)

Make a temp copy of `index.html` and serve it — do NOT commit these:
- **jsPDF load failure**: `sed 's#\(jspdf.umd.min.js\)#DOES-NOT-EXIST.js#' index.html > index-nojspdf.html`. Clicking Download Full Report should show an error in `#pdfStatus` (a hardened `generateReport` checks `window.jspdf`).
- **Thrown async callback in fetchAIPrices**: rename a price element id so `getElementById` returns null, e.g. `sed 's/id="pCement"/id="pCement_BROKEN"/' index.html > index-aithrow.html`. After clicking, a hardened `fetchAIPrices` (try/catch/finally) should re-enable the button and hide the spinner instead of leaving them stuck.

## Verifying State

- Use the browser console to read exact state without UI actions, e.g. `document.getElementById('aiFetchBtn').disabled`, `#aiLoading` class list, `#aiSummary` textContent.
- Note: `#aiSummary` lives inside `#priceGrid` which is `display:none` until a successful fetch — so an error message set there during an early throw is in the DOM but not visible on screen.

## Known Gotchas

- `frame-ancestors` and `X-Frame-Options` as `<meta>` tags produce browser warnings (they only work as HTTP headers). This is expected and not a bug.
- The app uses `python3 -m http.server` which does not set security HTTP headers — CSP is delivered via `<meta>` tag instead.
- The favicon.ico 404 error in console is expected (no favicon file exists).
- When testing calculators, use concrete values like Length=10, Width=8, Height=0.5 to get verifiable results (40 CFT, ~1.13 m3).
- PDF generation depends on jsPDF loading from CDN — if the network is down, the PDF button might silently fail or error.

## Concrete Test Values

| Calculator | Inputs | Expected Output |
|---|---|---|
| Concrete Volume | L=10, W=8, H=0.5 | 40 CFT, ~1.13 m3 |
| Slab | L=20, W=15, T=0.5 | 150 CFT |
| Brick | L=20, H=10 | ~1481 bricks |

## Lint/Checks

- `node --check script.js` for JS syntax; `npx --yes htmlhint index.html` for HTML.

## Devin Secrets Needed

None — this is a fully client-side app with no API keys or auth.
