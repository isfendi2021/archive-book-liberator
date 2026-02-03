# Examples & Screenshots

## Browser Console in Action

```
============================================================
  ARCHIVE.ORG BOOK DOWNLOADER
============================================================
  Downloading pages 1 to 688
  Keep this tab open until finished!
------------------------------------------------------------

[1/688] Searching for image...
[DOWNLOADED] Page 1 (2048x2849px)
[2/688] Searching for image...
[DOWNLOADED] Page 2 (2048x2849px)
[3/688] Searching for image...
[DOWNLOADED] Page 3 (2048x2849px)
...

============================================================
  DOWNLOAD COMPLETE!
============================================================
  Success: 688 pages
  Failed: 0 pages
  Total: 688 pages processed
============================================================
```

## PDF Generator Output

```
============================================================
  ARCHIVE BOOK LIBERATOR - PDF Generator
============================================================

[*] Searching for images in: C:\Users\...\images

[i] Found 688 images:
    First: book_page_001.jpg
    ...
    Last: book_page_688.jpg

[*] Generating PDF... (this may take a few seconds)

============================================================
  SUCCESS! PDF created successfully!
============================================================

[i] File: book.pdf
[i] Location: C:\Users\yuri\Downloads\archiveorgbooks\book.pdf
[i] Size: 142.58 MB
[i] Pages: 688

[*] Happy reading!
```

## Folder Structure

```
archive-book-liberator/
|
+-- browser-script.js      <- Copy this to browser console
+-- package.json           <- Dependencies & scripts
+-- README.md              <- Documentation
+-- LICENSE                <- MIT License
+-- CHANGELOG.md           <- Version history
+-- CONTRIBUTING.md        <- How to contribute
|
+-- src/
|   +-- index.js           <- PDF generator script
|
+-- images/                <- Put downloaded images here
|   +-- book_page_001.jpg
|   +-- book_page_002.jpg
|   +-- ...
|
+-- book.pdf               <- Generated output (after npm start)
```

## Supported File Formats

| Format | Extension | Supported | Notes |
|--------|-----------|-----------|-------|
| JPEG   | `.jpg`    | Yes       | Recommended (smaller size) |
| JPEG   | `.jpeg`   | Yes       | Same as .jpg |
| PNG    | `.png`    | Yes       | Larger files, lossless |
| GIF    | `.gif`    | No        | Not implemented yet |
| WebP   | `.webp`   | No        | Not implemented yet |

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Node.js   | v14.0.0 | v18.0.0+ |
| RAM       | 2GB     | 4GB+ |
| Disk Space | 1GB    | 5GB+ (for large books) |
| Browser   | Chrome 80+ | Chrome/Edge latest |

## Performance Tips

- **Large Books (500+ pages)**: Consider splitting into batches
- **Slow Internet**: Increase `IMAGE_TIMEOUT` in browser script
- **Low RAM**: Process images in smaller batches
- **Quality vs Size**: Adjust `IMAGE_QUALITY` (0.5-0.9)
