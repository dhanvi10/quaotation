# સુખનાથ ઈલેક્ટ્રીકલ — ક્વોટેશન જનરેટર

Gujarati quotation generator matching Sukhnath Electrical letterhead (with English technical terms like RR Cable, HEX, BBC).

## How to run

No install needed. Open `index.html` in Chrome or Edge:

1. Double-click `index.html`, or
2. Right-click → Open with → browser

For a local server (optional):

```bash
npx serve .
```

Then open the URL shown (e.g. `http://localhost:3000`).

## Features

- Fixed header: company name, Madhu J. Bhadiyadra, phones, DGVCL seal
- **Two office addresses** (dropdown + editable text)
- **Site location** presets + custom text
- **Quotation points**: pick from dropdown, edit freely; add/remove rows
- **3 layouts**: blue border, yellow location bar, bordered bullets
- **Numbered or dash** list style
- **Ready templates**: Shivay Glory, Parmeshwar Park, Amar Business Hub, Underground
- **Print / Save as PDF**: use browser Print → “Save as PDF”

## Edit presets

- Addresses & clauses: `js/data.js`
- Colors & print layout: `css/styles.css`

## Tech

Plain HTML, CSS, and JavaScript — works offline after first font load (Google Fonts).
