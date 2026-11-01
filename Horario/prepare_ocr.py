"""Build the offline OCR asset module using only locally vendored files.

No downloads are performed. Versions and checksums are in vendor/ocr/manifest.json.
"""
from pathlib import Path
import base64, json, hashlib

def build_ocr_assets(root=Path(__file__).parent):
    vendor = root / 'vendor' / 'ocr'
    manifest = json.loads((vendor / 'manifest.json').read_text(encoding='utf-8'))
    for name, info in manifest['files'].items():
        data = (vendor / name).read_bytes()
        if len(data) != info['bytes'] or hashlib.sha256(data).hexdigest() != info['sha256']:
            raise ValueError(f'OCR asset checksum mismatch: {name}')
    assets = {key: base64.b64encode((vendor / file).read_bytes()).decode('ascii') for key, file in {
        'worker': 'worker.min.js.gz',
        'core': 'tesseract-core-lstm.wasm.js.gz',
        'spa': 'spa.traineddata.gz',
    }.items()}
    (root / 'ocr-assets.js').write_text('// Compressed local OCR assets; licenses in vendor/ocr.\nconst RUMBO_OCR_ASSETS=' + json.dumps(assets) + ';\n', encoding='utf-8')
    print('Built offline OCR assets:', sum(len(v) for v in assets.values()), 'base64 characters')


if __name__ == '__main__':
    build_ocr_assets()
