# Site revision QA

Reviewed on 7 September 2026 at 1440 × 900, 390 × 844, and 320 × 700.

## Coverage

QA captured 46 current-run viewport screenshots across the homepage, About page, and Estimate page. A final targeted pass added four screenshots for the narrow Estimate layouts. The checks covered layout, visual hierarchy, typography, contrast, image crops, responsive reflow, navigation, keyboard focus, form validation, calculation bounds, prepared-enquiry state, and broken images.

## Final result

1. Homepage at desktop and mobile: healthy. The hero, tractor cutout, vineyard photograph, service cards, ground-management section, equipment section, Why section, contact section, and footer remain visually coherent with no overflow or broken images.
2. About page at desktop and mobile: healthy. The former CSS illustration has been replaced with a real vineyard photograph, and every section stacks cleanly without clipping.
3. Estimate page at desktop: healthy. Quick and detailed modes, the sticky summary, validation, enquiry output, assumptions, and footer are aligned and consistent.
4. Estimate page at 390 pixels: healthy. Controls remain readable and touch-sized, with no horizontal overflow.
5. Estimate page at 320 pixels: healthy. Property size uses a deliberate two-row heading, detailed service cards separate service information from Passes, and the document remains exactly within the viewport.
6. Mobile navigation: healthy. The menu exposes its state, closes with Escape, returns focus to the toggle, and contains keyboard focus while open.
7. Calculator correctness: healthy. Numeric drafts can be edited naturally, supported limits are enforced, prepared content is invalidated after edits, and labour quantities appear in the enquiry.

## Bugs fixed during the revision

- Stale copied-enquiry confirmations after estimate changes.
- Out-of-range acreage, pass, and worker values entering calculations.
- Numeric fields that could not be cleared naturally while editing.
- Prepared enquiries remaining visible after their source data changed.
- Missing labour quantities in detailed enquiries.
- Missing form submission behavior when pressing Enter.
- Blank-field validation bypassing the custom error state.
- Empty service-plan errors leaving focus off-screen.
- Mobile navigation ignoring Escape and allowing focus to escape behind the menu.
- Missing current-page navigation cues.
- Undersized service-card and menu targets.
- Horizontal overflow and cramped card layouts at 320 pixels.
- Placeholder-style CSS artwork on the About page.

## Evidence retained

- [Homepage desktop](final-qa/home-desktop.jpg)
- [Homepage mobile](final-qa/home-mobile.jpg)
- [About Gippsland section](final-qa/about-gippsland-desktop.jpg)
- [Estimate desktop](final-qa/estimate-desktop.jpg)
- [Estimate at 320 pixels, quick mode](final-qa/estimate-320-quick.jpg)
- [Estimate at 320 pixels, detailed mode](final-qa/estimate-320-detailed.jpg)

## Verification limits

The review used browser rendering, keyboard interaction, DOM semantics, console checks, and automated calculation tests. It does not claim full WCAG conformance. Production accessibility testing should still include named screen readers and physical touch devices.
