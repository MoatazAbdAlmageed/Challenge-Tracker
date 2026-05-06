# Chrome Web Store Submission Guide: Challenge Tracker

This document contains all the necessary information and assets required to publish the **Challenge Tracker** extension to the Chrome Web Store.

---

## 📋 General Information

| Field | Value |
| :--- | :--- |
| **Product Name** | Challenge Tracker |
| **Short Description** | Track your daily challenges and build habits directly from your New Tab page. |
| **Category** | Productivity |
| **Language** | English (United States) |

---

## 📝 Store Listing Descriptions

### Summary (Short Description - Max 132 characters)
Stay motivated with Challenge Tracker. Create challenges, track daily progress, and crush your goals every time you open a new tab.

### Detailed Description (Long Description)
**Turn Your New Tab into a Powerhouse of Productivity.**

Challenge Tracker is a minimalist yet powerful tool designed for those who want to build lasting habits without the noise of complex apps. By integrating directly into your Chrome "New Tab" page, your goals stay front and center, ensuring you never lose sight of what matters most.

**Key Features:**
- ✨ **Minimalist Dashboard**: A clean, distraction-free interface that replaces your default new tab page.
- 📅 **Customizable Challenges**: Set any goal, define start and end dates, and let the extension generate your daily roadmap.
- 📈 **Visual Progress Tracking**: Real-time progress bars and daily check-ins keep you motivated until the finish line.
- 📋 **Multi-Challenge Support**: Manage multiple goals simultaneously with an easy-to-read overview.
- 📤 **Shareable Summaries**: Copy a beautifully formatted text summary (with emojis) to your clipboard to share your progress with friends or social media.
- 🔒 **Privacy-First Design**: Your data is YOURS. Everything is stored locally in your browser. No accounts, no servers, no tracking.

**How to use:**
1. Click the "Add Challenge" button.
2. Give your challenge a name and set the duration.
3. Every day you complete your task, simply check the box on your new tab page.
4. Watch your progress bar grow and celebrate your consistency!

Whether it's a "30-day coding challenge," "75 Hard," or just drinking more water, Challenge Tracker is your companion on the journey to a better you.

---

## 🖼️ Graphic Assets

| Asset Type | Size | Requirements |
| :--- | :--- | :--- |
| **Extension Icon** | 128x128 px | Provided in `/icons/icon128.png` |
| **Small Tile** | 440x280 px | (Recommendation: Use a zoomed-in version of the hero image) |
| **Large Tile** | 920x680 px | (Recommendation: Use the full hero image) |
| **Marquee** | 1400x560 px | (Recommendation: Hero image with text overlay) |
| **Screenshots** | 1280x800 or 640x400 | At least 2-3 screenshots of the dashboard and challenge creation. |

---

## 🔒 Privacy & Compliance

| Field | Value |
| :--- | :--- |
| **Privacy Policy URL** | (Insert your website URL)/privacy-policy.html |
| **Data Usage** | "I am not collecting or using any user data." |
| **Single Purpose** | The extension's single purpose is to provide a challenge tracking dashboard on the New Tab page. |
| **Permissions Justification** | `storage`: Required to save user challenge data and progress locally in the browser. |

---

## 🛠️ Developer Notes (Reviewer Instructions)
The extension functions as a New Tab override. Upon installation, opening a new tab will display the dashboard. Users can add challenges via the "Add Challenge" button. All data persistence is handled via `chrome.storage.local`.

---

## 🚀 Ready to Publish?
1. **Zip the extension folder**: Select the contents of the `Challenge Tracker` directory (excluding the `website` and `publish.md` files) and compress them into a `.zip` file.
2. **Developer Dashboard**: Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. **Upload**: Click "New Item" and upload your `.zip` file.
4. **Complete Listing**: Fill in the details from this document.
5. **Submit**: Click "Submit for Review".
