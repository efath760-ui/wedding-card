# Wedding Invitation Website: Build Guide for Google Antigravity (v2)

Build a responsive, animated wedding invitation (ivory + gold baroque theme) that matches the reference screenshots in `reference/`. It has a floral cover that opens with an animation, background music, a live countdown, a calendar, a map, a schedule timeline and a guestbook.

Every step below has: the **screenshot to attach**, **what to see**, a **copy-paste prompt**, and a **done when** check.

---

## 0. Start here

### 0.1 Folder contents

```
README.md                      (this file)
reference/
  screens/                     (8 full-page screenshots, your reference)
    01-cover-initial.jpg
    02-tap-animation.jpg
    03-hero-after-open.jpg
    04-ceremony-announce-reception.jpg
    05-reception-countdown.jpg
    06-calendar-venue.jpg
    07-map-schedule.jpg
    08-schedule-guestbook-footer.jpg
  animation/                   (7 frames of the open transition, from the screen recording)
    a1-heart-pulse.jpg ... a7-frame-drawn.jpg
```

Open this folder as your Antigravity workspace. Keep `reference/` in the workspace but **never ship it** with the website.

### 0.2 Paste this first in the Antigravity agent chat

```
You are building a wedding invitation website. Read README.md in this workspace fully before writing code.
Rules for the whole project:
1. The screenshots in /reference are the visual target. Match layout, spacing, colors, fonts, text and animation.
2. All visible text comes from src/config/invitation.ts. No hard-coded text in components.
3. Do not use or copy any image files from the original website. Use my own artwork from public/assets (placeholders until I replace them).
4. Mobile-first and responsive: phone, tablet, desktop, with no horizontal scrolling.
5. Work one README step at a time. After each step run the app, check it against the screenshot named in that step, and tell me the differences you still see.
6. Never put /reference in the production build.
Confirm you understand, then wait for me to say "Step 1".
```

### 0.3 What you need

| Need | Notes |
|---|---|
| Google Antigravity | Open this folder as the workspace |
| Node.js 20+ and npm | Check with `node -v` |
| Your own song (`.mp3`) | One you have the right to use |
| Your own artwork | See Step 2 |
| Netlify or Vercel account | Free tier is enough |

### 0.4 Assets: please read

The floral frame, flowers, scroll ornaments, columns and damask pattern in the screenshots are the original designer's artwork. Use them **only as a visual guide**. Create your own look-alikes or buy/license similar art, and save them in `public/assets/`. This guide reproduces the layout, behavior, animation and text structure.

### 0.5 Screenshot map

| Screenshot | Contains |
|---|---|
| `01-cover-initial.jpg` | Cover card with the heart badge, floating sparkles |
| `02-tap-animation.jpg` | Moment right after tapping Open |
| `03-hero-after-open.jpg` | "Welcome to our wedding" and the framed names |
| `04-ceremony-announce-reception.jpg` | Ceremony info, announcement, reception start |
| `05-reception-countdown.jpg` | Reception info and the countdown |
| `06-calendar-venue.jpg` | Calendar, flourish divider, venue and map start |
| `07-map-schedule.jpg` | Map, "Get directions", schedule start |
| `08-schedule-guestbook-footer.jpg` | Schedule, guestbook, closing line |

> The screenshots were taken in a browser window about **950px wide**, so they show the tablet/desktop view. The phone view was not captured. Scale the same layout down for phones (Step 19) and check the live reference link at 390px and 1440px.

---

## 1. Design tokens (approximate; verify by eyedropper on the screenshots)

| Token | Value | Used for |
|---|---|---|
| `--cream` | `#f9f4ee` | Page background |
| `--card` | `#faf5eb` | Cover card |
| `--tan-dark` / `--tan-light` | `#996a3c` / `#cb9b6a` | Cover gradient (darker top-left, lighter bottom-right) |
| `--gold` | `#b97d3e` | Buttons, heart badge, heading accents |
| `--gold-text` | `#b5834b` | Section headings and hero names |
| `--olive` | `#8b8d5b` | Large names, times, body text |
| `--line` | `#d9c3a3` | Thin dividers, card borders |

**Fonts (starting guesses, check them in Step 4):**

| Where | Looks like | Google Font to try |
|---|---|---|
| Cover and hero names (thin, high-contrast) | Didone/Bodoni style | Bodoni Moda, Gilda Display, Italiana, Playfair Display |
| Large names on the announcement | Old-style serif | EB Garamond (italic for the "&") |
| "Welcome to our wedding" | Spaced small caps | Cormorant Garamond (semi-bold) |
| Section headings, small text, times | Bold Times-like | Tinos (a Times-compatible font) |
| Date and "Cordially Invites" | Soft serif | Lora |
| Calendar numbers and weekdays | Light geometric sans | Jost (light) |

---

## Step 1. Scaffold the project

**Prompt:**

```
Create a Vite + React + TypeScript project in this workspace root. Install tailwindcss, framer-motion and lucide-react.
Folders:
  src/config/invitation.ts   (all text, dates, links, music)
  src/components/            (one component per section)
  src/hooks/                 (useCountdown, useMusic)
  public/assets/             (my artwork)
  public/music/              (my song)
Set body background to #f9f4ee and add CSS variables for the tokens in README section 1.
Layout: one centered column, mobile-first. Exclude /reference from the build.
Run npm run dev and confirm it starts.
```

**Done when:** a blank cream page runs with no console errors.

---

## Step 2. Artwork placeholders

Create these transparent WebP/PNG files in `public/assets/` (your own art; placeholders first):

| File | What it is |
|---|---|
| `damask-tile.webp` | Seamless damask pattern. Cover: tone-on-tan, large scale. Pages: very faint green-cream, large scale |
| `frame-floral.webp` | Gold baroque frame with flowers, empty centre (~1200px) |
| `flowers-tr.webp` | Large flower cluster, cropped, top-right (hero) |
| `flowers-bl.webp` | Flower cluster, left edge (hero and guestbook) |
| `flowers-br.webp` | Flower cluster, right edge (schedule) |
| `flower-bloom-faint.webp` | Large faint flower, bottom-left of the guestbook |
| `scroll-left.webp`, `scroll-right.webp` | Baroque scroll ornaments for the edges |
| `column-left.webp`, `column-right.webp` | Stone Corinthian columns |
| `divider.webp` | Gold flourish divider |
| `calendar-frame.webp` | Ornate frame with scrolled corners |
| `cover-flowers-tl.webp`, `cover-flowers-br.webp` | Flowers on the cover card corners |
| `schedule-ornament.webp` | Two small vertical scroll ornaments |
| `petal.svg`, `sparkle.svg` | Tiny six-petal flower (cover sparkles and burst) |

**Prompt:**

```
Create simple placeholder images (soft gold outline, transparent background) for every file listed in README Step 2, in public/assets/, using the same names, so I can replace them with real artwork later without changing code.
```

---

## Step 3. Central config

```ts
// src/config/invitation.ts
export const invitation = {
  couple: { first: "Aminul Islam", second: "Ayesha Humayra" },
  eventDateISO: "2026-10-23T19:00:00+06:00",   // Asia/Dhaka
  displayDate: "October 23, 2026",
  cover: { line: "Cordially Invites", button: "Open" },
  welcome: "Welcome to our wedding",
  ceremony: {
    heading: "Ceremony Info",
    left:  { father: "Md. Hassan",       mother: "Jasmin Begum",   address: "272/27,R-6, Baten Nagar, Mazar Road, Mirpur-1" },
    right: { father: "Yousuf Chowdhury", mother: "Jasmin Sultana", address: "H-9,R-9,Block-D,Mirpur-1" },
  },
  announce: ["We joyfully announce", "the wedding of our children"],
  reception: { heading: "Reception Info", sub: "The reception will take place at:", time: "7:00 PM", weekday: "Friday", day: "23", month: "October", year: "2026" },
  countdownLabel: "Countdown",
  venue: { name: "Mirpur Convention Center", address: "7th Floor, Mirpur Shopping Center Complex, Dhaka 1216", mapQuery: "Mirpur Shopping Center Complex, Dhaka 1216" },
  schedule: [
    { time: "6:30 PM", label: "Welcome" },
    { time: "7:00 PM", label: "Reception" },
    { time: "9:00 PM", label: "Main Course" },
    { time: "11:00 PM", label: "Farewell" },
  ],
  guestbook: { heading: "Guestbook", namePlaceholder: "Enter your name*", wishPlaceholder: "Enter your wishes*", send: "Send Wishes", empty: "No wishes yet. Be the first!" },
  footer: "Your presence would be the greatest gift we could receive!",
  music: { src: "/music/wedding-song.mp3", title: "Wedding Song", loop: true, volume: 0.7 },
};
```

**Prompt:** "Create `src/config/invitation.ts` with exactly this content. All components must read from it."

> Replace every value with your real details before publishing.

---

## Step 4. Fonts check (do this before building sections)

**Attach:** `03-hero-after-open.jpg`, `04-ceremony-announce-reception.jpg`, `01-cover-initial.jpg`

**Prompt:**

```
Create a temporary route /fonts that renders the cover names, the hero names, the large announcement names, a section heading, and a calendar row in several candidate Google Fonts (see README section 1 table), each labeled. I will compare with the screenshots and tell you which to use. Then wire the chosen fonts as Tailwind font families.
```

**Done when:** you have picked one font per row of the table and removed the `/fonts` route.

---

## Step 5. Cover (initial state)

**Attach:** `reference/screens/01-cover-initial.jpg`

![cover](reference/screens/01-cover-initial.jpg)

**What you see**
- Full-screen **tan gradient** with a large damask pattern in a slightly darker tan, vignetted (darker toward the top-left, lighter toward the bottom-right).
- A few **tiny six-petal sparkles** drifting on the background ("floral animation").
- A **cream card** (slightly rounded, soft deep shadow) centered, about 55% of the width, with flower clusters at the **top-left** and **bottom-right** corners.
- Inside the card, top to bottom: a **round gold heart badge** (soft glow), the first name, a tiny italic "&", the second name (thin elegant serif, gold), a **thin line with a small ornament** in the middle, the date, "Cordially Invites" (olive, soft serif), and a **gold pill "Open" button** with a soft glow.

**Prompt:**

```
Build <Cover /> to match 01-cover-initial.jpg.
- Fixed full-screen gradient from #996a3c (top-left) to #cb9b6a (bottom-right) with damask-tile.webp overlaid at low opacity.
- 8-12 sparkles (sparkle.svg, 10-18px, opacity 0.3-0.6) drifting slowly with random delay/size, looping.
- Card: #faf5eb, radius 4px, soft shadow (0 20px 50px rgba(60,35,10,.35)), width about 55% of the viewport on desktop and 88% on phones, cover-flowers-tl at top-left and cover-flowers-br at bottom-right.
- Content: heart badge (44px circle, #b97d3e, white heart icon, soft glow), names from config, tiny italic "&", a 1px gold line with a small ornament in the middle, date, "Cordially Invites", gold pill Open button with glow.
- Cover stays until Open is tapped; lock body scroll while visible.
```

**Done when:** it matches the screenshot on desktop and looks good on a 390px phone.

---

## Step 6. Tap-on-Open animation

**Attach:** `02-tap-animation.jpg` plus the 7 frames in `reference/animation/`

![tap](reference/screens/02-tap-animation.jpg)

**What you see right after the tap (`02-tap-animation.jpg`)**
- The heart badge is gone; the card has a soft radial highlight.
- **Blurred, enlarged flower blooms** appear just outside the card's top-left and bottom-right corners.
- The ornament in the divider has turned into a **small white flower sparkle**.

**Frame sequence from the recording (about 1.9 seconds in total):**

| Frame | Timing | What happens |
|---|---|---|
| ![](reference/animation/a1-heart-pulse.jpg) `a1` | 0.0-0.3s | Heart badge pulses |
| ![](reference/animation/a2-ripple.jpg) `a2` | 0.2-0.6s | A ring ripples outward from the badge; the heart fades |
| ![](reference/animation/a3-card-blur.jpg) `a3` | 0.6-1.0s | Card softens/blurs, flower blooms swell outward |
| ![](reference/animation/a4-petal-burst.jpg) `a4` | 0.9-1.3s | Small flowers burst out from the card's lower area |
| ![](reference/animation/a5-petals-only.jpg) `a5` | 1.1-1.4s | Card is gone; petals scatter and fade |
| ![](reference/animation/a6-page-fade-in.jpg) `a6` | 1.3-1.6s | Ivory main page fades in; music button appears |
| ![](reference/animation/a7-frame-drawn.jpg) `a7` | 1.6-1.9s | Gold floral frame appears around the names |

**Prompt (attach all 8 images):**

```
Implement the Open sequence on <Cover /> as a single timeline (Framer Motion useAnimate or variants), about 1.9s:
1. 0.0-0.3s: heart badge pulses (scale 1 to 1.15).
2. 0.2-0.6s: a ring ripples outward from the badge (scale 1 to 3, opacity .6 to 0); heart fades out; the divider ornament crossfades to the small white flower sparkle.
3. 0.2-0.9s: the two corner flower clusters scale up (1 to 1.4), blur (0 to 10px) and fade outward; the card gets a soft radial highlight.
4. 0.6-1.0s: the whole card blurs (to 6px) and fades while drifting up about 8px.
5. 0.9-1.3s: spawn 20-30 petal.svg particles from the button area, radial burst, rotating, fading.
6. 1.3-1.6s: cover unmounts; the cream page fades in and the music button appears.
7. 1.6-1.9s: the hero frame fades and scales in (0.96 to 1).
Respect prefers-reduced-motion (a plain 300ms crossfade).
The click handler must also start the music (Step 7): call play() synchronously inside the handler.
```

**Done when:** the sequence feels like the frames; adjust durations in 0.1s steps if not.

---

## Step 7. Background music (all devices)

Phones block autoplay, so the music must start **inside the Open tap**.

**Attach:** `03-hero-after-open.jpg` (round music button, bottom-right)

**Prompt:**

```
Create useMusic and <MusicButton />.
- One HTMLAudioElement (not the Web Audio API), created once. src, loop and volume come from invitation.music.
- play() is called synchronously inside the Open button's click handler (no await or setTimeout before it), so it works on iOS Safari and Android Chrome.
- If play() is rejected, show the button in "paused" state so the guest can tap it.
- Pause on visibilitychange (tab hidden) and resume only if it was playing before.
- Fixed round gold button (44-48px, #b97d3e, soft shadow), bottom-right, with env(safe-area-inset-*) padding. Icon: three animated equalizer bars while playing, a music note when paused. Tap toggles play/pause.
- Changing the song = replace the file in public/music/ and edit invitation.music.src. Add a comment explaining this.
```

**Done when:** on a real iPhone **and** an Android phone, tapping Open starts the song and the button toggles it.

---

## Step 8. Hero

**Attach:** `reference/screens/03-hero-after-open.jpg`

![hero](reference/screens/03-hero-after-open.jpg)

**What you see:** "WELCOME TO OUR WEDDING" (wide-spaced caps, gold), the **gold floral frame** centered, the two names in **uppercase thin serif** inside the frame with a tiny italic "&" between them. A large flower is cropped at the **top-right**, another at the **bottom-left**. "CEREMONY INFO" peeks in at the bottom.

**Prompt:**

```
Build <Hero /> to match 03-hero-after-open.jpg: welcome line from config (Cormorant Garamond, letter-spacing .25em, gold), frame-floral centered, names uppercase in the chosen thin serif (#b5834b) with a tiny italic "&", flowers-tr cropped at the top-right and flowers-bl cropped at the left, a damask background. Subtle idle float on the frame (translateY +/-3px, 8s loop).
```

---

## Step 9. Ceremony info

**Attach:** `reference/screens/04-ceremony-announce-reception.jpg` (top part)

![ceremony](reference/screens/04-ceremony-announce-reception.jpg)

**What you see:** "CEREMONY INFO" in bold gold Times-style caps. Below, **two columns** with a thin vertical divider: each has the father's name and mother's name in bold gold, and a tiny olive address underneath.

**Prompt:**

```
Build <CeremonyInfo />: heading (Tinos bold uppercase, letter-spacing .04em, gold), then a 2-column grid with a 1px vertical divider (#d9c3a3). Names bold gold; address in small olive text (about 11px on desktop). Fade-up when in view. On narrow screens keep two columns and let addresses wrap.
```

---

## Step 10. Announcement

**Attach:** `04-ceremony-announce-reception.jpg` and `05-reception-countdown.jpg`

![announcement](reference/screens/05-reception-countdown.jpg)

**What you see:** two small gold uppercase lines ("WE JOYFULLY ANNOUNCE / THE WEDDING OF OUR CHILDREN"), then **large olive names** in an old-style serif with a gold italic "&" between them. **Baroque scrolls** climb the left and right edges.

**Prompt:**

```
Build <Announcement />: two small gold uppercase lines, then first name, a gold italic "&", and second name, in EB Garamond, large (clamp 40px to 64px), olive #8b8d5b. Add scroll-left and scroll-right pinned to the edges, partly cropped. Names fade up with a 150ms stagger.
```

---

## Step 11. Reception info with columns

**Attach:** `05-reception-countdown.jpg`

**What you see:** "RECEPTION INFO" (bold gold), a bold smaller spaced line, "7:00 PM" in olive, then a row **FRIDAY | 23 | OCTOBER** with olive vertical lines (23 is the largest), then "2026". **Stone columns** stand at the bottom-left and bottom-right, partly cropped.

**Prompt:**

```
Build <ReceptionInfo />: heading, sub-line (bold, letter-spaced), time (olive, about 28px), then a flex row: weekday | day (largest) | month with 1.5px olive vertical separators, and the year below. Add column-left and column-right pinned bottom-left/right and cropped by the edges. Text fades up; columns slide in 40px from their side (0.8s ease-out).
```

---

## Step 12. Countdown (live)

**Attach:** `05-reception-countdown.jpg` and `06-calendar-venue.jpg`

**What you see:** "COUNTDOWN" (bold gold) and one olive line, e.g. `15 days 4 hours 22 min 1 sec`, ticking every second.

**Prompt:**

```
Create useCountdown(targetISO), recomputed from Date.now() each second (clear the interval on unmount). Build <Countdown /> showing "{d} days {h} hours {m} min {s} sec" in olive Tinos. After the date has passed, show a short friendly message from config instead.
```

---

## Step 13. Calendar

**Attach:** `reference/screens/06-calendar-venue.jpg`

![calendar](reference/screens/06-calendar-venue.jpg)

**What you see:** a month grid, **"October 2026"** in olive, weekdays Mo-Su in light gray, a **gold line under the weekday row**, light numbers, and the **23rd inside a gold heart**. The grid sits inside an **ornate gold frame** with scrolled corners. Under it, an underlined **"Add to Calendar"** link, then a **flourish divider**.

**Prompt:**

```
Build <CalendarCard />: compute the month from eventDateISO (Monday first). Weekday labels and numbers in Jost light, small and gray-olive; a 1.5px gold line under the weekday row; the event day drawn as a gold heart (#b97d3e) with white bold text and a slow pulse (scale 1 to 1.08). Wrap in calendar-frame. "Add to Calendar" builds an .ics file client-side (UTC time computed from eventDateISO, 3h duration, venue as LOCATION) and downloads it. Put divider.webp underneath.
```

---

## Step 14. Venue and map

**Attach:** `06-calendar-venue.jpg` and `07-map-schedule.jpg`

![venue](reference/screens/07-map-schedule.jpg)

**What you see:** venue name in bold gold caps, the address in olive, a very faint line, an **embedded Google map** with a red pin, and a **"Get directions"** link with a small arrow icon.

**Prompt:**

```
Build <Venue />: name and address from config, a faint 1px line, then an iframe `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed` (no API key), loading="lazy", width about 62% of the column on desktop and 100% on phones, aspect ratio about 3:2, slightly rounded. Below: "Get directions" (arrow icon + bold olive text) linking to `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}` in a new tab with rel="noopener".
```

---

## Step 15. Wedding-day schedule

**Attach:** `07-map-schedule.jpg` and `08-schedule-guestbook-footer.jpg`

![schedule](reference/screens/08-schedule-guestbook-footer.jpg)

**What you see:** "WEDDING DAY SCHEDULE", then rows: time in gold on the left, a **gold dot on a thin vertical line**, label in olive on the right. Two small vertical scroll ornaments sit to the left of the times. A flower cluster and scroll fill the right edge.

**Prompt:**

```
Build <Schedule /> from invitation.schedule: 3-column grid (time right-aligned gold | dot + line | label left-aligned olive). 1px gold line between the dots; it draws downward (scaleY 0 to 1, origin top) when in view, with rows fading in 120ms apart. Add schedule-ornament on the left, flowers-br and scroll-right on the right edge.
```

---

## Step 16. Guestbook

**Attach:** `08-schedule-guestbook-footer.jpg`

**What you see:** "GUESTBOOK" (bold gold). A **rounded translucent card** with a faint gold border: a name input, a taller wishes textarea (both rounded, faint border, small placeholder text), a small **wand button** at the bottom-left, and a **gold "SEND WISHES" pill** at the bottom-right. Below: "No wishes yet. Be the first!". A big faint flower bleeds in at the bottom-left, a flower cluster at the left edge.

**Prompt:**

```
Build <Guestbook /> to match the screenshot. Both fields required (name max 60, wish max 300). The small wand button fills the textarea with a random pre-written wish from a list in config. "Send wishes" disables while sending.
Storage: create a GuestbookStore interface (list, add). Provide LocalStore (localStorage) as the default, and SupabaseStore (table wishes: id, name, message, created_at) when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set. Render wishes as plain text, never as HTML. Show the list under the form, or the empty message from config.
```

> LocalStore shows wishes only on that guest's own device. Use Supabase (or Firebase) for a shared guestbook.

---

## Step 17. Closing line and footer

**Attach:** `08-schedule-guestbook-footer.jpg` (bottom)

**What you see:** the gold line "Your presence would be the greatest gift we could receive!", with the large faint flower behind the bottom-left.

**Prompt:**

```
Build <Footer />: centered gold line from config, generous top margin, bottom padding that includes env(safe-area-inset-bottom) plus the height of the music button so it never covers the text.
```

---

## Step 18. Global ornaments and scroll animations

From the screenshots and recording:
- Text blocks **fade up** as they enter the view.
- Edge ornaments (scrolls, columns, flowers) **slide in** from their side and stay hugging the edges.
- The damask is static. The countdown ticks; the calendar heart and music bars loop.

**Prompt:**

```
Create a <Reveal> wrapper (Framer Motion whileInView, once: true, margin "-10% 0px") with variants fadeUp (y 24 to 0, 0.7s), slideFromLeft and slideFromRight (x +/-40 to 0, 0.8s). Use them consistently on every section. Respect prefers-reduced-motion (opacity only). Prevent horizontal scroll (overflow-x: clip on the root).
```

---

## Step 19. Responsive pass

**Prompt:**

```
Test the page at 360, 390, 768, 1024 and 1440px. Fix: horizontal scroll, text overlapping ornaments, the music button covering content, the cover card taller than the viewport (use dvh), tap targets under 44px. Keep one centered column; scale edge ornaments rather than stretching the layout (screenshots were taken at about 950px wide). Report each fix.
```

**Checklist**
- [ ] No horizontal scrollbar at any width
- [ ] Cover fits in portrait and landscape
- [ ] Music starts after Open on iPhone and Android
- [ ] Music button never hides text
- [ ] Countdown ticks and matches the real date
- [ ] Map loads; directions open correctly
- [ ] `.ics` imports into Google and Apple Calendar
- [ ] Guestbook validates, escapes text, and works after reload

---

## Step 20. Side-by-side comparison with the screenshots

**Attach:** all 8 screenshots.

```
Run the site at a ~950px-wide window, scroll through it, and compare each section against the attached screenshots. List every visible difference (spacing, font size, color, ornament position, animation timing) and fix them one by one. Do not change any text; it must come from invitation.ts.
```

---

## Step 21. Deploy

```
npm run build
```

- **Netlify:** drag the `dist/` folder into app.netlify.com/drop, or connect your repo (build `npm run build`, publish `dist`).
- **Vercel:** `npx vercel` and accept the Vite defaults.

Also add an Open Graph title and image in `index.html` for WhatsApp/Facebook previews, then test the live link on a real phone.

---

## Known gaps (not visible in the screenshots)

The song, exact easing curves, what the wand button really does, hover effects, and the phone-size layout. Check these on the live reference link and adjust the prompts if they differ.
