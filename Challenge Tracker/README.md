# Challenge Tracker Extension

I have implemented the **Challenge Tracker** extension based on your PRD. It features a modern design, persistent storage, and multi-challenge support.

## How to Install

1. Open your Google Chrome browser.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click on **Load unpacked**.
5. Select the folder: `c:\xampp\htdocs\Challenge Tracker`.
6. The extension should now appear in your toolbar!

## Key Functionalities

- **New Tab Dashboard**: The extension automatically becomes your default New Tab page, keeping your challenges front and center every time you open a browser tab.
- **Create Challenges**: Set a name, start date, and end date. The extension automatically generates a day-by-day checklist.
- **Track Progress**: Check off days as you complete them. The progress bar will update in real-time.
- **Manage Multiple**: View all your ongoing challenges from the main list view.
- **Copy Summary**: Click "Copy Progress" to copy a beautifully formatted text summary (with emojis) to your clipboard for sharing.
- **Reset/Delete**: Clear your progress or remove challenges entirely when done.
- **Completion Gift**: A special toast message will appear when you check the final box.

## Project Structure

- `manifest.json`: Configuration for Chrome.
- `popup.html`: The UI layout.
- `popup.css`: Premium aesthetics and responsive design.
- `popup.js`: Core logic, date calculations, and storage handling.
- `icons/`: Extension assets.
