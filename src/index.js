// ARCHIVE BOOK LIBERATOR - PDF Generator
// Converts a sequence of images into a single PDF file.
// @author YuriTheCoder
// @repository https://github.com/YuriTheCoder/archive-book-liberator

const imagesToPdf = require("images-to-pdf");
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../images");
const outputPdf = path.join(__dirname, "../book.pdf");

async function createPdf() {
    console.log("============================================================");
    console.log("  ARCHIVE BOOK LIBERATOR - PDF Generator");
    console.log("============================================================");
    console.log("");
    console.log("[*] Searching for images in:", imagesDir);

    if (!fs.existsSync(imagesDir)) {
        console.error("[X] ERROR: images folder not found!");
        return;
    }

    const files = fs.readdirSync(imagesDir)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
        })
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)) || 0;
            const numB = parseInt(b.match(/\d+/)) || 0;
            return numA - numB;
        })
        .map(file => path.join(imagesDir, file));

    if (files.length === 0) {
        console.error("[X] ERROR: No images found!");
        return;
    }

    console.log("[i] Found " + files.length + " images");
    console.log("[*] Generating PDF...");

    try {
        await imagesToPdf(files, outputPdf);
        const stats = fs.statSync(outputPdf);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log("============================================================");
        console.log("  SUCCESS! PDF created!");
        console.log("============================================================");
        console.log("[i] File:", path.basename(outputPdf));
        console.log("[i] Size:", fileSizeMB + " MB");
        console.log("[i] Pages:", files.length);
        console.log("[*] Happy reading!");
    } catch (error) {
        console.error("[X] ERROR creating PDF:", error);
    }
}

createPdf();
