# The Matrix: Libations website

This is a free static invitation website. No coding knowledge is required for normal edits.

## 1. Edit your details

Open `config.js` and replace:

- `eventDateDisplay`
- `eventTimeDisplay`
- `eventLocation`
- `eventDateISO`
- `rsvpUrl`
- the calendar start, end and location fields

The calendar times use UTC. Sydney is usually UTC+10 in winter and UTC+11 in summer.

## 2. Add your outfit images

Put five JPG images into `assets/outfits/` with these exact filenames:

- `neo.jpg`
- `trinity.jpg`
- `morpheus.jpg`
- `agents.jpg`
- `rebels.jpg`

Portrait or vertical images work best. Aim for under 500 KB each so the site loads quickly on phones.

Until you replace them, the included placeholder images will appear.

## 3. Personalised guest links

Add `?name=GuestName` to the end of the website URL.

Examples:

- `https://YOURUSERNAME.github.io/matrix-libations/?name=James`
- `https://YOURUSERNAME.github.io/matrix-libations/?name=Sarah`

Use `%20` for a space, such as `?name=Mary%20Jane`.

## 4. Publish free with GitHub Pages

1. Create a free GitHub account.
2. Create a new **public** repository named `matrix-libations`.
3. Upload every file and folder from this package.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch `main`, folder `/ (root)`, then save.
7. GitHub will show your live link after deployment.

## 5. RSVP options

The RSVP button accepts any URL. Examples:

- Google Form
- WhatsApp click-to-chat URL
- `mailto:` email link

Paste the complete URL into `rsvpUrl` in `config.js`.

## Important copyright note

Use outfit images you own, are licensed to use, or are comfortable sharing privately. Avoid publishing a large collection of copyrighted film stills on a public website.
