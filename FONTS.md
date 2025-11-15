# Font Setup Documentation

## Overview

This project uses two custom fonts provided in the challenge assets:
- **DM Sans** - Used for body text and general content
- **Bricolage Grotesque** - Used for headings (h1, h2, h3, etc.)

## Font Files Location

```
public/assets/fonts/
├── DM_Sans/
│   ├── DMSans-VariableFont_opsz,wght.ttf
│   ├── DMSans-Italic-VariableFont_opsz,wght.ttf
│   └── README.txt
└── Bricolage_Grotesque/
    ├── BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf
    └── README.txt
```

## Implementation

### 1. Font Face Declarations (`app/globals.css`)

The fonts are loaded using `@font-face` declarations at the top of the global CSS file:

```css
@font-face {
    font-family: "DM Sans";
    src: url("/assets/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf") format("truetype");
    font-weight: 100 1000;
    font-display: swap;
    font-style: normal;
}

@font-face {
    font-family: "DM Sans";
    src: url("/assets/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf") format("truetype");
    font-weight: 100 1000;
    font-display: swap;
    font-style: italic;
}

@font-face {
    font-family: "Bricolage Grotesque";
    src: url("/assets/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf") format("truetype");
    font-weight: 100 1000;
    font-display: swap;
    font-style: normal;
}
```

### 2. CSS Variables

Font families are defined as CSS custom properties for easy reuse:

```css
:root {
    --font-body: "DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-heading: "Bricolage Grotesque", var(--font-body);
    --base-font-size: 18px;
}
```

### 3. Base Styles

The fonts are applied globally:

```css
body {
    font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
}
```

## Variable Font Features

Both fonts are **variable fonts** which means:
- ✅ Single file supports multiple weights (100-1000)
- ✅ Smoother weight transitions
- ✅ Smaller file size compared to multiple static files
- ✅ Better performance

### Weight Scale

The fonts support all weights from 100 to 1000. Common weights used in the project:

- `font-normal` (400) - Regular text
- `font-medium` (500) - Emphasized text
- `font-semibold` (600) - Sub-headings
- `font-bold` (700) - Headings and important text

## Usage in Components

Since the fonts are applied globally via CSS, you can use standard Tailwind font utilities:

```tsx
// Headings automatically use Bricolage Grotesque
<h1 className="text-4xl font-bold">Weather App</h1>

// Body text uses DM Sans
<p className="text-base font-medium">Temperature: 72°F</p>

// Font weights
<span className="font-normal">Regular</span>
<span className="font-medium">Medium</span>
<span className="font-semibold">Semi-bold</span>
<span className="font-bold">Bold</span>
```

## Browser Compatibility

The fonts use TrueType format (`.ttf`) which is supported by:
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### font-display: swap
We use `font-display: swap` which means:
1. Browser shows fallback font immediately
2. Custom font loads in background
3. Text swaps to custom font once loaded
4. Prevents invisible text (FOIT)

### Fallback Fonts
Comprehensive fallback stack ensures good typography even if custom fonts fail to load:
```
DM Sans → system-ui → -apple-system → Segoe UI → Roboto → Helvetica Neue → Arial → sans-serif
```

## Verification

To verify fonts are loading correctly:

1. **Browser DevTools**
   - Open DevTools → Network tab
   - Filter by "Font"
   - Search for weather and look for `.ttf` files
   - Should see `DMSans-VariableFont_opsz,wght.ttf` and `BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf`

2. **Computed Styles**
   - Inspect any text element
   - Check Computed → font-family
   - Should show "DM Sans" or "Bricolage Grotesque"

3. **Visual Check**
   - DM Sans has geometric, clean letterforms
   - Bricolage Grotesque has distinctive, slightly quirky character

## License

Both fonts are licensed under the SIL Open Font License (OFL).
See `OFL.txt` files in respective font directories for details.

## Troubleshooting

### Fonts not loading?

1. **Check file paths** - Ensure font files are in `public/assets/fonts/`
2. **Clear cache** - Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
3. **Check console** - Look for 404 errors for font files
4. **Verify format** - Ensure `format("truetype")` is correct

### Fonts look different than expected?

1. **Check font-weight** - Variable fonts need explicit weight values
2. **Verify CSS variables** - Ensure `:root` variables are defined
3. **Browser cache** - Clear browser cache and reload

### Performance issues?

1. **Preload fonts** - Add to `<head>` in `layout.tsx`:
   ```html
   <link rel="preload" href="/assets/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf" as="font" type="font/ttf" crossorigin />
   ```
2. **Monitor Network** - Check font file sizes (should be < 500KB each)
3. **Use font-display: swap** - Already implemented

---

**Last Updated:** January 2025