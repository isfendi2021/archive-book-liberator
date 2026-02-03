/**
 * ========================================================================
 *  📚 ARCHIVE.ORG BOOK DOWNLOADER - Browser Console Script
 * ========================================================================
 * 
 * HOW TO USE:
 * 1. Open the book on Archive.org in "One-page view" mode
 * 2. Open Browser Console (F12 → Console)
 * 3. Paste this entire script and press Enter
 * 4. Wait! The script will download each page automatically
 * 
 * FEATURES:
 * ✅ Resilient to slow internet (waits up to 15s per page)
 * ✅ Detects when page has changed before continuing
 * ✅ Uses Canvas to bypass CSP/BLOB protections
 * ✅ Saves with optimized quality (70% JPEG)
 * ✅ Shows real-time progress
 * 
 * @author YuriTheCoder
 * @repository https://github.com/YuriTheCoder/archive-book-liberator
 * ========================================================================
 */

(async function archiveBookDownloader() {
    
    // ========================================================================
    // ⚙️ CONFIGURATION - CHANGE HERE!
    // ========================================================================
    
    const CONFIG = {
        START_PAGE: 1,              // 📖 First page to download
        END_PAGE: 688,              // 📖 Last page to download (change according to your book)
        BOOK_NAME: "book",          // 📝 Base filename (e.g., "book_page_001.jpg")
        
        // Advanced settings (usually no need to change)
        IMAGE_QUALITY: 0.7,         // JPEG quality (0.0 to 1.0, recommended 0.7)
        IMAGE_TIMEOUT: 15000,       // Max wait time for image (in ms)
        PAGE_CHANGE_TIMEOUT: 6000,  // Max wait time for page turn (in ms)
        MIN_IMAGE_WIDTH: 300,       // Minimum width to consider image valid
        CHECK_INTERVAL: 200,        // Interval between checks (in ms)
    };
    
    // ========================================================================
    // 🚀 SCRIPT START - DO NOT MODIFY BELOW THIS LINE
    // ========================================================================
    
    console.log("%c 🛡️ ARCHIVE.ORG BOOK DOWNLOADER 🛡️", "color: orange; font-size: 20px; font-weight: bold;");
    console.log(`%c 📚 Downloading pages ${CONFIG.START_PAGE} to ${CONFIG.END_PAGE}`, "color: cyan; font-size: 14px;");
    console.log("%c ⚠️ Keep this tab open until finished!", "color: yellow; font-size: 12px;");
    console.log("─".repeat(60));
    
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    let successCount = 0;
    let failCount = 0;
    
    // Main loop
    for (let pageNum = CONFIG.START_PAGE; pageNum <= CONFIG.END_PAGE; pageNum++) {
        let img = null;
        const startTime = Date.now();
        
        console.log(`🔍 [${pageNum}/${CONFIG.END_PAGE}] Searching for image...`);
        
        // Wait for image to load (up to IMAGE_TIMEOUT)
        while (Date.now() - startTime < CONFIG.IMAGE_TIMEOUT) {
            const images = Array.from(document.querySelectorAll('.BRpageimage'));
            img = images.find(el => el.naturalWidth > CONFIG.MIN_IMAGE_WIDTH);
            
            if (img) break; // Image found!
            await sleep(CONFIG.CHECK_INTERVAL);
        }
        
        // Process image if found
        if (img) {
            try {
                // Create invisible canvas
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                // Convert to JPEG and download
                const dataUrl = canvas.toDataURL('image/jpeg', CONFIG.IMAGE_QUALITY);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${CONFIG.BOOK_NAME}_page_${String(pageNum).padStart(3, '0')}.jpg`;
                link.click();
                
                successCount++;
                console.log(`%c ✅ [DOWNLOADED] Page ${pageNum} (${img.naturalWidth}x${img.naturalHeight}px)`, 
                           'color: green; font-weight: bold;');
                
            } catch (error) {
                failCount++;
                console.error(`❌ [ERROR] Failed to save page ${pageNum}:`, error);
            }
        } else {
            failCount++;
            console.warn(`⏱️ [TIMEOUT] Page ${pageNum} did not load in time (skipped)`);
        }
        
        // Turn the page (if not the last one)
        if (pageNum < CONFIG.END_PAGE) {
            const currentSrc = img ? img.src : null;
            
            // Try clicking the "next" button
            const nextButton = document.querySelector('button[title="Flip right"]');
            if (nextButton) nextButton.click();
            
            // Send arrow key (fallback)
            document.body.dispatchEvent(new KeyboardEvent('keydown', { 
                bubbles: true, 
                key: 'ArrowRight' 
            }));
            
            // Wait for page to change
            let changeStartTime = Date.now();
            let pageChanged = false;
            
            while (Date.now() - changeStartTime < CONFIG.PAGE_CHANGE_TIMEOUT) {
                await sleep(CONFIG.CHECK_INTERVAL);
                
                const checkImages = Array.from(document.querySelectorAll('.BRpageimage'));
                const checkImg = checkImages.find(el => el.naturalWidth > CONFIG.MIN_IMAGE_WIDTH);
                
                // Check if image changed or entered loading state
                if (!checkImg || (currentSrc && checkImg.src !== currentSrc)) {
                    pageChanged = true;
                    break;
                }
            }
            
            if (!pageChanged) {
                console.warn(`⚠️ Page may not have changed correctly after ${pageNum}`);
            }
        }
    }
    
    // Final report
    console.log("═".repeat(60));
    console.log("%c 🎉 DOWNLOAD COMPLETE! 🎉", "color: lime; font-size: 24px; font-weight: bold;");
    console.log(`%c ✅ Success: ${successCount} pages`, "color: green; font-size: 14px;");
    console.log(`%c ❌ Failed: ${failCount} pages`, "color: red; font-size: 14px;");
    console.log(`%c 📊 Total: ${CONFIG.END_PAGE - CONFIG.START_PAGE + 1} pages processed`, "color: cyan; font-size: 14px;");
    console.log("═".repeat(60));
    console.log("%c 📁 Next step: Move images to the 'images/' folder and run 'npm start'", 
               "color: yellow; font-size: 12px;");
    
})();
