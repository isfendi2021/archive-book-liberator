# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-03

### Added
- Initial release
- Browser console script for downloading book pages from Archive.org
- Canvas-based image extraction to bypass CSP/BLOB protections
- Resilient downloading with automatic retries and timeout handling
- PDF generator with natural sort algorithm
- Support for .jpg, .jpeg, and .png formats
- Detailed progress logging and error reporting
- Comprehensive README with step-by-step instructions
- MIT License

### Features
- Automatic page turning and loading detection
- Configurable start/end pages
- Quality control (70% JPEG compression by default)
- Smart image validation (minimum width check)
- Cross-platform compatibility

---

## Future Plans

- [ ] GUI application (Electron)
- [ ] Batch processing multiple books
- [ ] OCR integration for searchable PDFs
- [ ] Direct Archive.org API integration
- [ ] Resume interrupted downloads
- [ ] Automatic metadata extraction (title, author, etc.)

---

**Want to suggest a feature?** Open an issue!
