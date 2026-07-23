Self-hosted fonts for the portfolio.

In use (referenced by @font-face in src/index.css):

  didot.woff2    -> Didot Regular (titles / headings)
                    extracted from the Didot.ttc collection (Regular face).
  acumin.woff2   -> Acumin Variable Concept (body). Variable font, weight
                    axis 100–900; the CSS requests light/regular weights.

Courier is used for nav/labels/captions and is a system font — no file needed.

To swap or update a font later: drop a .woff2 in here and update the matching
@font-face src in src/index.css. If you only have .otf/.ttf/.ttc, convert with
fonttools:
  python3 -c "from fontTools.ttLib import TTFont; f=TTFont('in.otf'); f.flavor='woff2'; f.save('out.woff2')"
(.ttc collections: load with TTCollection and pick the face you want.)
