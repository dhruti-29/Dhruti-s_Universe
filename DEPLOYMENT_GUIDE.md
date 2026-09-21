# Production Deployment Guide
**“DHRUTI — The Living Intelligence Universe”**

This guide covers all steps needed to build, configure, test, and deploy this Vite + React portfolio to any modern static hosting platform (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or Firebase Hosting).

---

## 1. Prerequisites & Installation

Ensure Node.js (v18+ recommended) and npm are installed on your system.

```bash
# Clone or navigate into the project directory
cd /path/to/LATEST_Portfolio

# Install verified dependencies
npm install
```

---

## 2. Environment Variables Configuration

The project operates safely without environment variables (falling back to honest unconfigured/offline states), but connecting Firebase Realtime Database and a form backend enables real visitor counting and direct email transmissions.

Create your local or production environment file:

```bash
# Duplicate the safe template
cp .env.example .env.local
```

### Supported Environment Variables:

| Variable | Description | Example / Format |
| :--- | :--- | :--- |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project identifier | `your-firebase-project-id` |
| `VITE_FIREBASE_DATABASE_URL` | Firebase Realtime Database URL | `https://your-project-id-default-rtdb.firebaseio.com` |
| `VITE_CONTACT_FORM_ENDPOINT` | Secure form submission endpoint | `https://formspree.io/f/your-form-id` |
| `VITE_WEB3FORMS_ACCESS_KEY` | Optional access key (if using Web3Forms) | `your-web3forms-access-key` |

> [!IMPORTANT]
> Never commit `.env.local` or `.env` to Git. Only `.env.example` should exist in your repository.

---

## 3. Firebase Visitor Counter Setup

The portfolio features a genuine persistent visit counter that increments once per active browser session without fabricating numbers.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project (e.g., `dhruti-portfolio`).
2. Navigate to **Build** > **Realtime Database** > Click **Create Database**.
3. Select your preferred server location (e.g., United States or Singapore).
4. Start in **Test Mode** or configure Rules to allow write/read access to the `/telemetry` path:
   ```json
   {
     "rules": {
       "telemetry": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```
5. Copy your Database URL (format: `https://[PROJECT-ID]-default-rtdb.firebaseio.com`) and paste it into `VITE_FIREBASE_DATABASE_URL` in your hosting dashboard or `.env.local`.
6. **Integrity Rule:** If this variable is omitted, the counter gracefully displays:
   `Telemetry: Offline (Setup Required)`
   It will never display fake, random, or estimated numbers.

---

## 4. Contact Form Backend Setup

The contact form delivers messages directly to **`dhrutiviradiya333@gmail.com`** without exposing SMTP credentials or passwords in browser JavaScript.

### Recommended Free Providers:
- **Option A: Formspree (Recommended)**
  1. Create a free account at [Formspree](https://formspree.io/).
  2. Create a new form and set the recipient to `dhrutiviradiya333@gmail.com`.
  3. Copy your Form ID endpoint (e.g. `https://formspree.io/f/xvznpqba`).
  4. Set `VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/xvznpqba`.

- **Option B: Web3Forms**
  1. Request a free access key at [Web3Forms](https://web3forms.com/) targeting `dhrutiviradiya333@gmail.com`.
  2. Set `VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit`.
  3. Set `VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key`.

> [!NOTE]
> If `VITE_CONTACT_FORM_ENDPOINT` is omitted, the form informs visitors of the setup requirement and provides your direct email link (`dhrutiviradiya333@gmail.com`). It will never display a false "Message sent successfully" alert.

---

## 5. Local Development

```bash
# Start the local development server with Hot Module Replacement (HMR)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 6. Production Build & Preview

```bash
# 1. Run the linter
npm run lint

# 2. Build the optimized production bundle
npm run build

# 3. Preview the production build locally
npm run preview
```

The compiled assets will be placed into the `dist/` directory:
- Main bundle: ~51 kB (gzip: ~14.6 kB)
- Lazy-loaded R3F 3D Universe chunk: ~1.1 MB (gzip: ~303 kB)
- CSS styles: ~45 kB (gzip: ~8.1 kB)

---

## 7. Deployment Considerations by Platform

### Vercel
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** Add `VITE_FIREBASE_DATABASE_URL` and `VITE_CONTACT_FORM_ENDPOINT` under Project Settings > Environment Variables.

### Netlify
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- Create a `public/_redirects` file with `/*  /index.html  200` if adding client-side subroutes in the future.

### GitHub Pages
- If deploying to `https://username.github.io/repository-name/`:
  Update `vite.config.js` to include the base path:
  ```javascript
  export default defineConfig({
    base: '/repository-name/',
    // ...
  })
  ```
- If deploying to a custom root domain (e.g., `dhruti.dev`), leave `base: '/'` (default).

---

## 8. How to Verify the Deployed Site

After deploying to your live URL:
1. **Welcome Screen:** Verify that the title is `DHRUTI — The Living Intelligence Universe` and tagline is `ALWAYS IN PROGRESS`.
2. **3D Universe:** Click `Explore My Universe`. Rotate the central glass sphere and hover over the nodes.
3. **Telemetry Indicator:** If Firebase is configured, verify that the counter increments by 1 on your first visit and stays consistent upon refresh.
4. **Contact Form:** Submit a test message and verify it arrives in `dhrutiviradiya333@gmail.com`.
5. **Projects Lock:** Click `Projects`. Verify that it opens the private development card with zero leaked repositories or code details.
6. **Beacon Discovery:** Press `'B'` on the keyboard or click the header `✦` spark to confirm the easter egg transmission opens.
7. **Mobile Check:** Open on your smartphone to ensure the interface adapts seamlessly without horizontal scrolling.

---

## 9. Common Configuration Problems & Solutions

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| Telemetry shows "Offline (Setup Required)" | `VITE_FIREBASE_DATABASE_URL` is missing | Add the variable in your hosting platform dashboard and trigger a redeployment. |
| Contact form shows "Configuration Notice" | `VITE_CONTACT_FORM_ENDPOINT` is missing | Create a Formspree or Web3Forms endpoint and add the URL to your environment variables. |
| 3D Universe shows "WebGL Unavailable" fallback | Browser or GPU has hardware acceleration disabled | Normal behavior! The portfolio includes an automatic 2D fallback so the site remains 100% usable. |
| Sound does not play automatically | Intentional browser autoplay protection | Normal and intended. Sound and voice cues are strictly opt-in and require visitor interaction. |
