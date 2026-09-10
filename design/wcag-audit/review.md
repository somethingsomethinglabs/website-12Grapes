# WCAG 2.2 AA review

Date: 11 September 2026

Scope: single-page landing experience, service-details dialog, estimator dialog, and mobile navigation

Method: visual review, semantic/source review, runtime interaction checks, responsive checks at 390 CSS px, and axe-core 4.10.3 against WCAG 2.0/2.1/2.2 A and AA rules.

This is a best-effort review, not a WCAG conformance certification. Automated testing cannot cover every success criterion.

## Journey review

1. **Homepage — healthy after fixes.** The content hierarchy and link purpose were already clear. The page now has a skip link, an explicit banner landmark, a dependable main-content target, named/list semantics for grouped content, hidden decorative icons, stronger text and control contrast, visible focus styling, and larger key link targets.
2. **Service selection — healthy after fixes.** Each service card has a descriptive accessible name and opens a native modal dialog with a current title and description. Closing the dialog restores focus to the originating card. Selecting different cards was checked at runtime, including Harvest support.
3. **Estimator — healthy after fixes.** The native dialog has a programmatic name and description, labelled controls, pressed-state service options, an announced estimate result, and explicit cleanup on button, backdrop, and cancel paths. Moving from a service dialog into the estimator and closing it returns focus to the originating service card.
4. **Mobile navigation — improved; no trap found.** The previous custom Tab loop was removed because the navigation is not a modal. At 390 CSS px there was no horizontal overflow, all five open-menu links measured about 50–52 CSS px high, and opening/closing the estimator returned focus to the still-visible estimate link.
5. **About content — integrated.** The useful story and local-focus copy now lives in the landing page's named About section. Navigation reaches it with an in-page link, so there is no duplicate route to maintain.

## Fixed findings

| Area | Change | Relevant WCAG 2.2 criteria |
| --- | --- | --- |
| Page language | Set the document language to `en-AU`. | 3.1.1 Language of Page |
| Bypass and landmarks | Added a visible-on-focus skip link; corrected banner, main, navigation, and contentinfo structure. | 1.3.1 Info and Relationships; 2.4.1 Bypass Blocks |
| Non-text content | Hid decorative arrow SVGs, removed an ineffective label from a generic visual wrapper, and retained meaningful tractor/image descriptions. | 1.1.1 Non-text Content; 4.1.2 Name, Role, Value |
| Grouped content | Exposed capability and equipment groups as named lists. | 1.3.1 Info and Relationships |
| Contrast | Darkened low-contrast kickers, service numbers, range labels, control borders, and dark-surface accents; added a dark backing behind the photo annotation. | 1.4.3 Contrast (Minimum); 1.4.11 Non-text Contrast |
| Keyboard focus | Added a two-tone focus indicator that remains visible on light and dark surfaces. | 2.4.7 Focus Visible; supports 2.4.11 Focus Not Obscured (Minimum) |
| Target size | Increased key navigation, footer, phone, and inline-link targets to at least 44 CSS px high. | 2.5.8 Target Size (Minimum) |
| Dialogs | Added descriptions, ensured current content is flushed before opening, removed a mobile navigation Tab trap, and restored focus to the correct opener across service-to-estimator transitions. | 2.1.1 Keyboard; 2.1.2 No Keyboard Trap; 2.4.3 Focus Order; 4.1.2 Name, Role, Value |
| Motion | Expanded the reduced-motion treatment to suppress transitions, repeated animation, and hover movement. | Accessibility best practice supporting motion-sensitive users |

## Automated results

- Before fixes on the homepage: 2 axe violation groups — colour contrast and unnamed decorative SVG images.
- After fixes on the homepage: 27 rule groups passed and 0 violations were reported.
- Axe marked contrast checks as **incomplete** for 25 homepage nodes because their backgrounds use transparency or imagery. These need human confirmation whenever imagery or theme colours change.

## Evidence and limits

- Saved pre-fix desktop capture: `01-home-desktop-before.png`.
- A post-fix desktop snapshot was inspected in the collaborative preview, but subsequent screenshot export attempts failed.
- Runtime checks covered dialog selection, naming, opening, close-button cleanup, focus return, the 390 px mobile menu, target heights, and horizontal overflow.
- The preview's synthetic Tab/Escape injection did not move focus, and its 320 px resize timed out. Native keyboard Escape, 320 px reflow, 200% zoom, Windows High Contrast Mode, screen-reader announcements, and voice-control operation still need device-level testing.

## Recommended follow-up

Run a short manual pass with NVDA/Firefox or VoiceOver/Safari, keyboard-only navigation, 200% browser zoom, and a 320 CSS px viewport. Recheck text placed over photographs whenever those assets or crops change.

Standards references: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [How to Meet WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/).
