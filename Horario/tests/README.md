# Pruebas de navegador

Los datos usados por estas pruebas son ficticios. Nunca uses una sesión con tus registros reales: las pruebas crean contextos de navegador separados y modifican sus bases locales.

Requisitos opcionales de desarrollo: Node.js, Python y Playwright.

```sh
npm install --no-save playwright
npx playwright install chromium
python Horario/build.py
python -m http.server 9012 --directory Horario
```

En otra terminal, desde la raíz del repositorio:

```sh
node Horario/tests/horario-habitos.mjs
node Horario/tests/ventas-metas.mjs
node Horario/tests/guardado.mjs
node Horario/tests/reparto.mjs
```

`RUMBO_TEST_URL` permite cambiar la dirección del servidor. Los archivos temporales se escriben en la carpeta `rumbo-browser-tests` del directorio temporal del sistema. En el ZIP autónomo, sirve la carpeta descomprimida en lugar de `Horario` y usa las rutas de `tests/`.

La lógica de estas suites se ejecutó en el entorno administrado usando su Chromium instalado. Las rutas de importación y salida de esta copia se adaptaron para ejecución local; esa instalación local de Playwright no se ejecutó en Windows ni en un teléfono físico.
