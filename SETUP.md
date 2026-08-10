# Cloudflare Setup Guide — Joey's Bridge Program

## What you need to do (one time only, ~10 minutes)

---

### Step 1 — Create a KV Namespace

KV is Cloudflare's cloud storage. Joey's progress will be saved here.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click **Workers & Pages** in the left sidebar
3. Click **KV** (under Storage & Databases)
4. Click **Create a namespace**
5. Name it: `JOEY_PROGRESS`
6. Click **Add**

---

### Step 2 — Bind KV to your Pages project

1. Go to **Workers & Pages** → click your **joey-year1** project
2. Click **Settings** → **Functions**
3. Scroll to **KV namespace bindings** → click **Add binding**
4. Variable name: `JOEY_PROGRESS`
5. KV namespace: select `JOEY_PROGRESS` from the dropdown
6. Click **Save**

---

### Step 3 — Add Environment Variables

1. Still in **Settings** → scroll to **Environment variables**
2. Click **Add variable** and add these two:

| Variable name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your API key from console.anthropic.com (starts with sk-ant-) |
| `PARENT_TOKEN` | `_pjjJr5CfYUgzh_t` |

3. For both variables, click the **Encrypt** toggle so the values are hidden
4. Click **Save**

---

### Step 4 — Deploy

Push your GitHub repo. Cloudflare will auto-deploy.
Or go to your Pages project → **Deployments** → **Retry deployment**.

---

### Step 5 — Share the parent dashboard

Your parent dashboard URL is:

```
https://YOUR-SITE.pages.dev/parent.html?t=_pjjJr5CfYUgzh_t
```

Replace `YOUR-SITE` with your actual Cloudflare Pages domain.
Share this link with yourself and Joey's dad. Bookmark it.

Anyone with this link can view Joey's progress — quiz scores, writing samples, and completion status update automatically every time Joey saves his work.

---

### Notes

- The `PARENT_TOKEN` value above is your secret. Do not share the token separately — only share the full URL.
- You can change the token anytime in Cloudflare environment variables (remember to update the URL you share).
- Joey's AI writing feedback works automatically once `ANTHROPIC_API_KEY` is set — no setup needed on his end.
- Progress syncs to the cloud within 2 seconds of Joey doing anything in the course.
