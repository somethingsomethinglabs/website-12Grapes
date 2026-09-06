# 12Grapes landing page design QA

## Comparison target

- Source visual truth: `design/reference-hero.png`
- Final desktop implementation: `design/implementation-final-desktop.jpg`
- Final mobile implementation: `design/implementation-mobile-top.jpg`
- Desktop comparison: `design/comparison-final.png`
- Focused logo and typography comparison: `design/comparison-final-focus.png`
- Route and state: landing page at the top of `/`, navigation closed

## Viewport and normalization

- Source image: 1536 × 1024 px
- Desktop CSS viewport: 1536 × 1024 at device pixel ratio 1
- Browser capture: 1521 × 1014 px because the in-app browser excludes its scrollbar and frame inset
- Desktop normalization: the source was resized to 1521 × 1014 before the side-by-side comparison
- Mobile CSS viewport: 390 × 844 at device pixel ratio 1
- Mobile browser capture: 375 × 811 px after the same browser frame inset

## Final findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the Bodoni display face matches the source's high-contrast editorial serif. The supporting sans-serif copy, button weights, line heights, and wrapping preserve the source hierarchy without copying image text into the HTML.
- Spacing and layout rhythm: the header height, hero depth, left margin, CTA spacing, and beginning of the cream services section align with the source proportions. The right image panel is intentionally inset to accommodate the requested transparent tractor overlap.
- Colors and visual tokens: dark green-black, warm cream, vineyard gold, restrained machinery green, and wine-red actions match the source balance.
- Image quality and asset fidelity: the supplied 12G identity is used as a transparent image. The vineyard background and tractor are separate high-resolution assets. The tractor has a clean alpha edge, believable contact shadow, and visibly breaks the photo's top and bottom boundaries.
- Copy and content: the headline uses the approved year-round Gippsland positioning. Supporting copy names specialist machinery and herbicide-free care without making unsupported claims.
- Responsive behavior: the mobile layout keeps the same hierarchy, shows the full equipment silhouette, avoids horizontal overflow, and uses an accessible expandable menu.

## Focused comparison evidence

`design/comparison-final-focus.png` checks the header identity, eyebrow, display type, line wrapping, and dark/cream contrast at readable scale. The source uses a text-only wordmark; the implementation intentionally uses the requested real 12G logo. The display type retains the source's refined agricultural-editorial tone.

## Comparison history

### Iteration 0

- P1: the header used a code-built approximation rather than the real 12G logo.
- P1: the tractor was embedded inside a rectangular photograph and could not overlap the image boundary.
- P1: the heavy all-caps sans-serif headline drifted from the source's editorial serif hierarchy.
- P2: the right-side photo crop clipped the machinery and made the hero feel like two equal panels.

Fixes made:

- Extracted the supplied 12G logo to a tightly cropped transparent PNG and placed it in the header and footer.
- Created a separate transparent tractor asset with visible dual-sided undervine equipment.
- Created a separate Gippsland vineyard background and rebuilt the hero as layered assets.
- Added a Bodoni display face, restored the source's cream-on-dark hierarchy, and used the source's restrained wine-red action treatment.
- Rebalanced the hero to the source's 912 px desktop depth and tightened the handoff into the cream services section.

Post-fix evidence: `design/comparison-pass1.png` and `design/comparison-focus-logo-type.png`.

### Iteration 1

- P2: the first cream section began too low, leaving an empty strip at the bottom of the desktop viewport.

Fix made:

- Reduced the desktop services-section top padding so its label enters at the same point as the next-section heading in the reference.

Post-fix evidence: `design/comparison-final.png` and `design/implementation-final-desktop.jpg`.

## Interactions and runtime checks

- Desktop navigation scrolled to Services and Ground management.
- The mobile menu opened, exposed all five links, reported its expanded state, and closed again.
- The primary estimate path navigated to `/estimate` and returned successfully.
- The page produced no console errors after the final reload.

## Follow-up polish

No P3 item blocks handoff. Real photography of the purchased tractor and Fischer setup should replace the generated machinery assets once it exists.

final result: passed
