---
name: testing-civil-calculator
description: Test the Civil Calculator Pro static web app (index.html/script.js) end-to-end, including its calculators, PDF report generation, and AI price estimator. Use when verifying UI or error-handling changes.
---

# Testing Civil Calculator Pro

Static client-side app: `index.html` + `script.js` + `style.css`. No build step, no package.json, no CI.

## Serving locally
```bash
cd <repo> && python3 -m http.server 8099
# open http://localhost:8099/index.html in Chrome
```

## App structure
- Tabbed UI: Concrete, Brick, Materials, Structure, Finishing, Cost, Report, AI Prices. Tabs switch via `showTab(name, event)`.
- Calculators write into a global `results` object; the Report tab's "Download Full Report" (`generateReport()`) builds a jsPDF document from `results` and shows status in `#pdfStatus`.
- AI Prices tab: `fetchAIPrices()` disables the button, shows a spinner (`#aiLoading`), and after a 1.5s `setTimeout` fills a hidden `#priceGrid` and `#aiSummary`.

## Triggering error paths (otherwise hard to reproduce via UI)
Make a temp copy of `index.html` and serve it — do NOT commit these:
- **jsPDF load failure**: `sed 's#\(jspdf.umd.min.js\)#DOES-NOT-EXIST.js#' index.html > index-nojspdf.html`. Clicking Download Full Report should show "⚠ PDF library failed to load..." in `#pdfStatus` (a hardened `generateReport` checks `window.jspdf`).
- **Thrown async callback in fetchAIPrices**: rename a price element id so `getElementById` returns null, e.g. `sed 's/id="pCement"/id="pCement_BROKEN"/' index.html > index-aithrow.html`. After clicking, a hardened `fetchAIPrices` (try/catch/finally) should re-enable the button and hide the spinner instead of leaving them stuck.

## Verifying state
- Use the browser console to read exact state without UI actions, e.g. `document.getElementById('aiFetchBtn').disabled`, `#aiLoading` class list, `#aiSummary` textContent.
- Note: `#aiSummary` lives inside `#priceGrid` which is `display:none` until a successful fetch — so an error message set there during an early throw is in the DOM but not visible on screen.

## Lint/checks
- `node --check script.js` for JS syntax; `npx --yes htmlhint index.html` for HTML.

## Devin Secrets Needed
- None. Fully client-side, no auth or external APIs (AI prices are mocked/hardcoded).
