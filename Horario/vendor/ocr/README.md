# Local OCR dependencies

Pinned vendored packages; no runtime model or CDN downloads:

- Tesseract.js 6.0.1: https://www.npmjs.com/package/tesseract.js/v/6.0.1 — Apache-2.0. Browser worker (`worker.min.js.gz`), upstream license and bundled notices. The main browser distribution is retained for provenance but is not needed by Rumbo's worker adapter.
- tesseract.js-core 6.0.0: https://www.npmjs.com/package/tesseract.js-core/v/6.0.0 — Apache-2.0. `tesseract-core-lstm.wasm.js.gz` contains both the JavaScript factory and embedded WASM binary. Does not require SIMD.
- Spanish language: https://github.com/tesseract-ocr/tessdata_fast/tree/4.1.0 — Apache-2.0. `spa.traineddata.gz`.
- fflate 0.8.2: https://www.npmjs.com/package/fflate/v/0.8.2 — MIT. Used to unpack worker and core in browsers.

`manifest.json` records the exact byte counts and SHA-256 checksums. Files ending in `.gz` use standard gzip compression (mtime 0) of upstream files. `prepare_ocr.py` verifies files and writes base64-compressed assets into `ocr-assets.js`; the application build inlines them. No package installation is necessary to rebuild.

`images.js` creates a temporary Blob worker with the unmodified core factory followed by the unmodified upstream worker script. It supplies language bytes directly and uses the pinned worker's load/loadLanguage/initialize/setParameters/recognize protocol. A small adapter manages job IDs, progress, errors, timeout and termination, and calls initialize with the language code string. Network fetch and importScripts inside this worker are disabled after the self-contained core has been defined. OCR receives a normalized PNG. No image-derived text is executed as a command.

Only the original selected image is fingerprinted. Repeated images with different bytes, a changed crop or a different import destination need manual checking. Thumbnails are JPEG data URLs capped at 100,000 characters; source images and extracted text are never persisted automatically. Product photographs are optional.
