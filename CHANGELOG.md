# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [3.0.0] - 2025-11-01

### 🎉 Major Release - Complete Documentation Overhaul

This release represents the third major refactor of the nui_ut library, with a focus on comprehensive documentation, improved organization, and better developer experience.

### Added
- **helpers.md**: Complete documentation for helper functions (addHeadImport, awaitMs, awaitEvent, drawImageDummy)
- **Table of Contents**: Added TOC to all 10 module documentation files for easier navigation
- **Build System**: Added npm build script with Terser minification
- **GitHub Actions**: Automated release workflow for building and publishing minified versions
- **Missing Functions**: Documented previously undocumented functions (indexByProp, allIdxByProp, parseJSON)

### Changed
- **Deep Functions Documentation**: Completely rewrote deep_get, deep_set, deep_includes, and keyByDeepValue docs to emphasize dynamic path strings as the primary use case
- **data.md Structure**: Reorganized all "deep" functions into a logical succession under "Deep Property Access" section
- **Examples**: Updated all examples to show before/after comparisons demonstrating the actual problems being solved
- **README**: Removed hardcoded function counts in favor of descriptive capabilities

### Fixed
- **Duplicate Sections**: Removed duplicate documentation in data.md, dom.md, and format.md
- **Accuracy**: Verified all code examples against actual implementation
- **Beginner-Friendly**: Improved explanations throughout for better accessibility

### Technical Details
- 91 total functions across 10 modules
- ~24 KB minified (56% reduction from source)
- Zero dependencies
- ES module compatible

### Documentation
- All functions include: Problem/Solution format, parameters, return values, real-world examples
- Validated against test suite implementation
- Cross-referenced API structure with actual exports

---

## Previous Versions

**v2.x** - Second major refactor (internal)
**v1.x** - Initial consolidated version (internal)

---

[3.0.0]: https://github.com/herrbasan/UT/releases/tag/v3.0.0
