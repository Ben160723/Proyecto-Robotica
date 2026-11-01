"""Package reviewed source with a verified, separately downloaded Node runtime."""
from pathlib import Path
import argparse, hashlib, json, zipfile

root = Path(__file__).parent
parser = argparse.ArgumentParser()
parser.add_argument('--runtime-zip', required=True)
parser.add_argument('--output', default=str(root.parent / 'MiniJarvis-Windows.zip'))
args = parser.parse_args()
manifest = json.loads((root / 'runtime-manifest.json').read_text())
runtime = Path(args.runtime_zip)
if hashlib.sha256(runtime.read_bytes()).hexdigest() != manifest['sha256']:
    raise ValueError('The runtime ZIP does not match the pinned official SHA-256.')
files = ['server.mjs', 'package.json', 'Iniciar Mini Jarvis.bat', 'LEEME.md', 'runtime-manifest.json', 'build-package.py', 'verificacion.json']
for directory in ['lib', 'public', 'native', 'tests']:
    files.extend(str(p.relative_to(root)) for p in sorted((root / directory).rglob('*')) if p.is_file())
with zipfile.ZipFile(args.output, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as result:
    for name in files:
        result.write(root / name, 'MiniJarvis/' + name)
    with zipfile.ZipFile(runtime) as source:
        folder = 'node-v' + manifest['version'] + '-win-x64/'
        result.writestr('MiniJarvis/runtime/node.exe', source.read(folder + 'node.exe'))
        result.writestr('MiniJarvis/runtime/NODE-LICENSE.txt', source.read(folder + 'LICENSE'))
with zipfile.ZipFile(args.output) as result:
    if result.testzip() is not None:
        raise ValueError('Package integrity check failed.')
print('Built:', args.output, Path(args.output).stat().st_size, 'bytes')
