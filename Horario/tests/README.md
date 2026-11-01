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
node Horario/tests/combos.mjs
node Horario/tests/asistente.mjs
node Horario/tests/imagenes.mjs
node Horario/tests/moneda.mjs
```

`RUMBO_TEST_URL` permite cambiar la dirección del servidor. Los archivos temporales se escriben en la carpeta `rumbo-browser-tests` del directorio temporal del sistema. En el ZIP autónomo, sirve la carpeta descomprimida en lugar de `Horario` y usa las rutas de `tests/`.

La lógica de estas suites se ejecutó en el entorno administrado usando su Chromium instalado. Las rutas de importación y salida de esta copia se adaptaron para ejecución local; esa instalación local de Playwright no se ejecutó en Windows ni en un teléfono físico.

`rutas.mjs` acepta `PLAYWRIGHT_MODULE` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE` para usar una instalación existente. Comprueba todos los niveles, el umbral estricto de aprobación, listening real acelerado en el navegador, rúbricas manuales, grabación de una señal de audio sintética, subida y traslado separado de audio, borradores, importación y guardado fallido. No utiliza un micrófono físico ni una voz personal.

`semanales.mjs` admite esas mismas variables y comprueba prácticas por semana y nivel, notas y correcciones, planes futuros, gráfico, calendario y cambio estacional, CSV, migración de versiones, copia en móvil, uso sin conexión y las correcciones del grabador y del listening de rutas técnicas.

`productos-costos.mjs` admite las mismas variables. Prueba la papelera recuperable, protección del inventario, pedidos cancelados, saldos de clientes y devoluciones; correcciones de costo por lote con envíos de céntimos, asignaciones FIFO e historial; errores de guardado, pestañas desactualizadas, copias en móvil y recuperación del almacenamiento local ilegible.

`vaciar-papelera.mjs` usa las mismas variables y comprueba el vaciado completo, productos sin movimientos e históricos, filtros, confirmación y cancelación, conservación de saldos, fallos de guardado, pestañas desactualizadas, devolución posterior, migración, restauración móvil y uso sin conexión.

`combos.mjs` prueba recetas con varios productos y packs de un mismo producto; cantidades, lotes, envíos y stock compartido; fechas, cobros, edición de recetas, devoluciones, correcciones de costo, archivo, papelera, CSV, carga inicial, copias en móvil, uso sin conexión y fallos de guardado.

`asistente.mjs` prueba comandos locales, propuestas y guardado, deshacer, conflictos y duplicados, planificación y disponibilidad, fechas, hábitos ambiguos y futuros, metas, resúmenes financieros y formularios, fallos de guardado y propuestas desactualizadas, historial limitado, contenido escapado, migración, móvil y uso sin conexión. Comprueba que el asistente no haga peticiones a servicios externos. No usa un modelo de lenguaje ni una API de IA.

`imagenes.mjs` genera capturas sintéticas y ejecuta el motor OCR WASM real sin conexión. Comprueba revisión obligatoria, fotos opcionales, duplicados y listas manuales, precios ambiguos, compras y envío exacto en céntimos, existencias compartidas con combos, descuentos y cobros parciales, conflictos de horario y repetición semanal, cancelación y límites, fotos sin texto, contenido no ejecutable, migración, copias móviles y OCR después de recargar sin conexión. Verifica fallos de guardado y pestañas desactualizadas. Todas las suites admiten `PLAYWRIGHT_MODULE` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. No se usan imágenes personales. Las dependencias OCR locales y licencias están en `vendor/ocr`; `build.py` verifica sus huellas y regenera `ocr-assets.js` con `prepare_ocr.py` sin conexión.

`moneda.mjs` comprueba el ejemplo S/10 → USD2.63, tasas obligatorias y su dirección, coma decimal, redondeo con enteros, alternancia sin pérdida de céntimos, costos FIFO e historial inalterados, cobros y deudas, nuevos registros y edición con la moneda original, imágenes y CSV, contexto del asistente, fallos de guardado, pestañas desactualizadas, corrección explícita de etiquetas antiguas, migración, copias y uso sin conexión en pantalla móvil. Las tasas son sintéticas; no se consulta una cotización externa ni se usan datos personales.
