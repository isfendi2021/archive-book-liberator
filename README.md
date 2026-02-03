# 📚 Archive.org Book Liberator

> **A complete tool to extract and convert "Borrow Only" books from Internet Archive into local PDFs, bypassing timeout errors and download limitations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🌟 Why Use This?

Have you ever tried downloading a book from **Internet Archive** and encountered:
- ❌ **Timeout errors** (file too large)
- ❌ **Corrupted or incomplete PDFs**
- ❌ **"Borrow Only"** with no download option
- ❌ **CSP/BLOB protections** blocking traditional tools

**This tool solves ALL these problems** with a two-step approach:

1. **Browser Script**: Captures pages visually directly from the browser (bypassing blob/CSP protections)
2. **PDF Binder**: Combines all downloaded images into a clean, organized PDF file

> ⚠️ **Legal Notice**: This tool is intended for **personal archival and research purposes**. Respect copyright laws and Internet Archive's Terms of Service.

---

## 🚀 Complete Usage Guide

### **Step 1: Extract Images (In Browser)**

1. **Visit [Internet Archive](https://archive.org)** and log in
2. **Find your desired book** and click **"Borrow for 1 hour"** (or 14 days)
3. **Open the book viewer**
4. Switch to **"One-page view"** - single page icon at the top
5. Open **Developer Console**:
   - **Windows/Linux**: `F12` or `Ctrl + Shift + I`
   - **Mac**: `Cmd + Option + I`
   - Then click the **"Console"** tab
6. Copy the script from **`browser-script.js`** file (or [see here](#-browser-script))
7. **Paste into console** and press `Enter`

**What will happen:**
- 🔄 Script will automatically turn pages
- 📥 Each page downloads as `.jpg` to your Downloads folder
- ⏳ Waits for complete loading before proceeding (resilient to slow internet)
- 📊 Shows real-time progress in console

---

### **Step 2: Generate PDF (On Your Computer)**

1. **Clone this repository**:
   ```bash
   git clone https://github.com/YuriTheCoder/archive-book-liberator.git
   cd archive-book-liberator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Organize images**:
   - Move **all downloaded images** to the `images/` folder (already exists)
   - Script automatically sorts them (even if filenames are out of order)

4. **Run the converter**:
   ```bash
   npm start
   ```

5. **Done!** 🎉  
   The **`book.pdf`** file will be generated in the project root.

---

## 🛠️ How It Works (Technical Explanation)

### **The Browser Script** (`browser-script.js`)

Many Archive.org books use **CSP protections** (Content Security Policy) and **BLOBs** that prevent simple downloads via `fetch` or direct download.

**Our solution:**
1. **Renders** the protected image on an invisible `<canvas>` in memory
2. **Exports** pixels to **Base64** using `toDataURL()`
3. **Forces local download**, bypassing network restrictions
4. **Automatically detects** when page finishes loading to avoid:
   - ❌ Blank images
   - ❌ Duplicates
   - ❌ Cropped pages

**Technologies:**
- HTML5 Canvas API
- Async/Await for flow control
- KeyboardEvent API for navigation

---

### **The Converter** (`src/index.js`)

Uses **Node.js** to process images with:

- ✅ **Natural Sort Algorithm** (smart ordering): ensures `page_10.jpg` comes **after** `page_9.jpg` (not after `page_1.jpg`)
- ✅ **Multiple format support**: `.jpg`, `.jpeg`, `.png`
- ✅ **Robust validation**: checks if folder exists and contains valid images
- ✅ **Visual feedback**: shows progress and detailed errors

**Technologies:**
- Node.js `fs` module
- `images-to-pdf` library
- Natural number sorting regex

---

## 📦 Project Structure

```
archive-book-liberator/
├── browser-script.js   ← 📋 Copy this code to browser console
├── src/
│   └── index.js        ← 🔧 Node.js script that generates the PDF
├── images/             ← 📁 Put your images here (ignored by Git)
├── .gitignore          ← 🚫 Prevents upload of images and node_modules
├── package.json        ← 📦 Project dependencies
└── README.md           ← 📖 You are here!
```

---

## 🎯 Browser Script

See the **`browser-script.js`** file for the most up-to-date version. Example snippet:

```javascript
// ⚙️ CONFIGURATION - Change here!
let START_PAGE = 1;      // First page to download
let END_PAGE = 688;      // Last page to download
let BOOK_NAME = "book";  // Base filename

// The rest is automatic! 🚀
```

---

## 💡 Tips and Troubleshooting

### **Problem: "No images found"**
- ✅ Make sure you're in **"One-page view"** mode
- ✅ Wait for page to fully load before running script

### **Problem: Blank pages**
- ✅ Increase timeout in script (`IMAGE_TIMEOUT` variable)
- ✅ Slow internet? Script already waits up to 15s automatically

### **Problem: PDF out of order**
- ✅ Script already sorts automatically! If still having issues, rename images with sequential numbers: `001.jpg`, `002.jpg`, etc.

### **Problem: Too many pages (500+)**
- ✅ Split into batches (e.g., pages 1-300, then 301-600)
- ✅ Browser may limit simultaneous downloads

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit Pull Requests
- ⭐ Star this project if it helped you!

---

## 📄 License

This project is under the **MIT** license - see the [LICENSE](LICENSE) file for details.

**Disclaimer**: This tool is for educational and personal archival use. Users are responsible for complying with copyright laws in their jurisdiction.

---

## ⭐ Credits

**Developed with ❤️ by [YuriTheCoder](https://github.com/YuriTheCoder)**

Built to help researchers, students, and book enthusiasts worldwide.

If this project saved you hours of frustration, consider:
- ⭐ Giving it a **star** on GitHub
- 🔄 **Sharing** with others who need it

---

**Happy reading! 📖✨**
