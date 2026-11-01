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
node Horario/tests/rutas.mjs
node Horario/tests/semanales.mjs
node Horario/tests/productos-costos.mjs
node Horario/tests/vaciar-papelera.mjs
```

`RUMBO_TEST_URL` permite cambiar la dirección del servidor. Los archivos temporales se escriben en la carpeta `rumbo-browser-tests` del directorio temporal del sistema. En el ZIP autónomo, sirve la carpeta descomprimida en lugar de `Horario` y usa las rutas de `tests/`.

La lógica de estas suites se ejecutó en el entorno administrado usando su Chromium instalado. Las rutas de importación y salida de esta copia se adaptaron para ejecución local; esa instalación local de Playwright no se ejecutó en Windows ni en un teléfono físico.

`rutas.mjs` acepta `PLAYWRIGHT_MODULE` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE` para usar una instalación existente. Comprueba todos los niveles, el umbral estricto de aprobación, listening real acelerado en el navegador, rúbricas manuales, grabación de una señal de audio sintética, subida y traslado separado de audio, borradores, importación y guardado fallido. No utiliza un micrófono físico ni una voz personal.

`semanales.mjs` admite esas mismas variables y comprueba prácticas por semana y nivel, notas y correcciones, planes futuros, gráfico, calendario y cambio estacional, CSV, migración de versiones, copia en móvil, uso sin conexión y las correcciones del grabador y del listening de rutas técnicas.

`productos-costos.mjs` admite las mismas variables. Prueba la papelera recuperable, protección del inventario, pedidos cancelados, saldos de clientes y devoluciones; correcciones de costo por lote con envíos de céntimos, asignaciones FIFO e historial; errores de guardado, pestañas desactualizadas, copias en móvil y recuperación del almacenamiento local ilegible.

`vaciar-papelera.mjs` usa las mismas variables y comprueba el vaciado completo, productos sin movimientos e históricos, filtros, confirmación y cancelación, conservación de saldos, fallos de guardado, pestañas desactualizadas, devolución posterior, migración, restauración móvil y uso sin conexión.
