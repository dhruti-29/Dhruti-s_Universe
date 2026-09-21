# Phase 6 Setup Guide: Visitor Counter & Contact Form Backend
## “DHRUTI — The Living Intelligence Universe”

This guide details the exact steps to connect your real Firebase visitor counter and contact form backend.

---

### Part 1: Visitor Counter (Firebase Realtime Database)

The visitor counter is pre-wired to communicate via Firebase's secure REST API. It uses `sessionStorage` so each active browser session counts as exactly one visit, preventing duplicate increments from page refreshes, tab navigation, or component re-renders.

#### Step-by-Step Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click **Create a project** (name it e.g. `dhruti-portfolio`).
3. In the left navigation sidebar, go to **Build** → **Realtime Database**.
4. Click **Create Database**, select a region close to your audience (e.g. `Singapore` or `United States`), and click **Next**.
5. When prompted for security rules, select **Start in test mode** (or set read/write rules for the `/telemetry` path as shown below).
6. Copy your **Database URL** (it looks like `https://dhruti-portfolio-default-rtdb.firebaseio.com/`).
7. Create a file named `.env.local` in your project root (copied from `.env.example`):
   ```bash
   VITE_FIREBASE_DATABASE_URL=https://dhruti-portfolio-default-rtdb.firebaseio.com
   ```

#### Recommended Database Security Rules:
In your Firebase Realtime Database **Rules** tab, you can set:
```json
{
  "rules": {
    "telemetry": {
      "visits": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

*Note: In accordance with authenticity standards, until you provide `VITE_FIREBASE_DATABASE_URL`, the counter displays `Telemetry: Offline (Setup Required)` and will NEVER display fabricated or fake numbers.*

---

### Part 2: Secure Contact Form Backend

The contact form is built with full client-side validation, a hidden bot honeypot field (`botField`), client-side rate limiting (25-second cooldown), and live character counters.

To route submissions directly to `dhrutiviradiya333@gmail.com` without exposing private email passwords or SMTP secrets:

#### Option A (Recommended): Formspree (Free — 50 emails/month)
1. Go to [Formspree.io](https://formspree.io/) and create a free account.
2. Click **New Form**, name it `Portfolio Contact`, and set the target email to `dhrutiviradiya333@gmail.com`.
3. Copy your Form Endpoint URL (e.g. `https://formspree.io/f/mnqepqyz`).
4. Add it to `.env.local`:
   ```bash
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```

#### Option B: Web3Forms (Free — 250 emails/month, No Signup Required)
1. Go to [Web3Forms.com](https://web3forms.com/).
2. Enter your email: `dhrutiviradiya333@gmail.com` and click **Create Access Key**.
3. Check your inbox for the generated access key.
4. Add it to `.env.local`:
   ```bash
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
   ```

---

### Part 3: Environment Variables Summary

Your `.env.local` file should look like this:

```env
# Visitor Counter
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com

# Contact Form Backend
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

*Remember: `.env.local` is listed in `.gitignore` and must NEVER be committed to GitHub.*
