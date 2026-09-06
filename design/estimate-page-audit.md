# Estimate page review

Reviewed on 6 September 2026 at 1440 × 900 and 390 × 844.

## Scope

The review covered the page entry, responsive header and navigation, quick estimate, detailed estimate, empty and incomplete states, prepared enquiry, assumptions section, and footer.

## Results

1. Page entry and navigation: healthy. The logo remains readable on the cream header, the desktop navigation is balanced, and the mobile menu opens with an announced expanded state.
2. Estimate selection: healthy. Quick and detailed modes expose their pressed state, and both labels stay on one line at mobile width.
3. Calculator controls: healthy. Quick service selection and detailed multi-service selection update the estimate. The detailed flow now stops an empty service plan and shows the correction beside the service controls.
4. Contact details: healthy. Name and vineyard location are required before an enquiry is prepared. Missing fields receive visible, linked error text and focus moves to the first field that needs attention.
5. Enquiry handoff: healthy. A valid submission scrolls to the prepared enquiry, moves focus to the result, and the copy action returns a visible confirmation.
6. Supporting content and footer: healthy. Assumptions reflow into a readable single column on mobile and the footer retains its hierarchy and contact links.

## Applied fixes

- Added announced pressed states to mode and service buttons.
- Added consistent keyboard focus indicators to calculator controls.
- Kept the mobile estimate selector and summary action on one line.
- Reduced excess mobile hero spacing so the calculator appears sooner.
- Increased contrast and size for the estimate disclaimer.
- Added service-plan and contact-detail validation with focus management.
- Scrolled and focused the prepared enquiry after a successful action.

## Evidence

- [Desktop overview](audit-estimate-final-desktop.jpg)
- [Mobile overview](audit-estimate-mobile-fixed-top.jpg)
- [Mobile navigation](audit-estimate-mobile-menu.jpg)
- [Missing contact details](audit-estimate-mobile-validation.jpg)
- [Empty detailed plan](audit-estimate-mobile-service-validation.jpg)
- [Prepared enquiry](audit-estimate-mobile-prepared.jpg)

## Limits

This review checked rendered layouts, browser semantics, keyboard focus styling, and the main interactive states. It does not claim full WCAG compliance. A production accessibility pass should still include screen-reader testing, browser zoom testing, and checks on physical touch devices.
