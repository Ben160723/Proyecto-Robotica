# Rumbo — un día a la vez

Tu horario, hábitos y aprendizaje en una aplicación en español, adaptable a celular y computadora.

## Novedades de la versión 2

### Ventas → Repartir ganancias

Este apartado añade un **plan editable** para organizar las ganancias. El punto de partida es:

| Destino | Porcentaje inicial |
| --- | ---: |
| Reinversión en el negocio | 50% |
| Ahorro personal | 20% |
| Reserva del negocio | 20% |
| Diversión | 10% |

Puedes cambiar los cuatro porcentajes, con hasta dos decimales. Deben sumar **100%**. Pulsa **Guardar porcentajes** para conservarlos. El botón del plan inicial solo carga un borrador; no reemplaza lo guardado hasta confirmar con Guardar.

Se muestran por separado **la inversión en compras**, **la ganancia neta acumulada** y **la ganancia disponible en caja**. La base del reparto es:

`máximo(0, mínimo(ganancia neta, saldo de caja))`

El saldo de caja ya descuenta las compras pagadas, las comisiones y los gastos generales. Este criterio conservador evita repartir capital recuperado o ganancias que aún no tienen efectivo disponible. Si el resultado es cero o negativo, los importes propuestos son cero y puedes guardar el plan para cuando haya ganancias.

Cada categoría muestra su porcentaje y su importe en soles. El cálculo reparte los céntimos sobrantes de forma determinista para que los cuatro importes sumen exactamente la base, incluso con porcentajes decimales. Si registras compras, ventas, gastos o cobros, se recalculan los importes usando los porcentajes guardados.

**Es una planificación, no una transferencia de dinero.** Guardar porcentajes no crea gastos, retiros, fondos separados ni movimientos en cuentas bancarias. Este apartado no lleva el control de retiros personales ya realizados. El plan se conserva en las copias JSON y se recupera al importar; las copias anteriores reciben los porcentajes iniciales sin perder productos ni ventas.

- **Hábitos más claros:** si eliges una fecha futura, se explica el motivo y aparece **Volver a hoy**. El botón **Marcar como hecho** reemplaza el círculo vacío. Los días de la semana muestran también su número de fecha.
- **Metas:** objetivos por cantidades (ahorro, libros, sesiones…), listas de pasos y metas ligadas a la ganancia neta del negocio. Incluyen fecha objetivo, progreso, archivo y recuperación.
- **Ventas:** productos, precios, compras, inventario, ventas, cobros pendientes y gastos del negocio, inicialmente en **soles peruanos (PEN)**.

### Actualizar sin perder tus datos

Exporta una copia desde **Ajustes** antes de actualizar. Cierra las pestañas de la versión anterior. Si usas el archivo, sustituye `Rumbo.html` **en la misma carpeta** y ábrelo con el mismo navegador. Si usas GitHub Pages, abre la misma dirección y recarga; el aviso **Actualizar** permite cargar la nueva versión. No hace falta borrar los datos del navegador.

La versión 2 convierte automáticamente el formato anterior, conservando horario, hábitos, marcas, notas, perfil y rutas. También acepta copias JSON de la versión 1. Si abres desde otra dirección o dispositivo, utiliza **Importar copia**. Las copias nuevas incluyen además todas las metas y los movimientos del negocio; usa la versión actualizada para restaurarlas.

### Registrar tus ventas de Temu

1. En **Ventas → Productos**, crea el producto, su precio de venta y el aviso de pocas existencias. Puedes indicar la compra inicial: cantidad, costo por unidad y envío/impuestos del lote.
2. Usa **Compras / pedidos** para registrar más lotes. Las compras se consideran pagadas: suman a la inversión. Un pedido **en camino** no añade unidades disponibles hasta pulsar **Recibir**.
3. Al **Registrar venta**, elige producto, cantidad, precio unitario, descuento total y comisiones/entrega que pagaste. El inventario baja automáticamente. Si te pagaron solo una parte, indica lo cobrado y una referencia del cliente.
4. En **Ventas y cobros**, registra los pagos posteriores. Cobrar un saldo no crea otra venta ni vuelve a descontar unidades.
5. Registra los gastos generales —por ejemplo publicidad o empaque— en **Gastos**. No repitas un envío o comisión ya incluido en compras o ventas.

El círculo muestra el **costo del inventario recibido que falta vender**. Baja con cada unidad vendida y llega a cero cuando se agotan esas unidades. La inversión en pedidos todavía en camino aparece por separado; no son existencias recibidas. Comprar otro lote puede hacer subir el inventario y el círculo otra vez.

Las cantidades financieras se guardan en céntimos enteros. El envío de una compra se distribuye entre sus unidades, conservando exactamente el total incluso cuando sobra un céntimo. Para cada venta se toman las unidades disponibles de los lotes recibidos más antiguos; los lotes del mismo día conservan su orden de registro. Cambiar el precio sugerido no altera los costos ni precios de las ventas anteriores.

- **Ventas acumuladas:** cantidades vendidas por sus precios, menos descuentos, estén cobradas o pendientes.
- **Ganancia neta:** ventas menos el costo de las unidades vendidas, comisiones y gastos generales. Puede ser negativa e incluir ventas aún por cobrar.
- **Dinero cobrado:** pagos que ya registraste.
- **Capital por recuperar:** compras y gastos que los cobros todavía no cubren; nunca es menor que cero.
- **Saldo de caja:** cobros menos compras pagadas, comisiones y gastos. Puede ser negativo mientras parte del dinero está en inventario.
- **Pendiente de cobrar:** ventas menos cobros registrados.

El precio de venta lo decides tú: vender todo no garantiza una ganancia si el precio no cubre los costos. Los resultados se calculan con tus importes, no con una rentabilidad supuesta.

Los registros son **manuales**. No se conecta con Temu, no compra productos y no publica anuncios. Las alertas de pocas existencias, los pedidos en camino, los saldos de clientes, las gráficas mensuales y la exportación CSV ayudan a llevar el control.

Para corregir una venta, puedes **Anular y devolver unidades**: el movimiento se conserva como anulado, se restauran sus unidades originales y se retiran sus importes de los resultados. Hazlo solo si recuperaste los productos y devolviste lo cobrado. Si quedaron gastos sin reembolso, regístralos como gastos. Una compra solo se puede anular con reembolso si no tiene unidades asignadas a ventas vigentes. Los gastos también se conservan como anulados.

La moneda se puede corregir desde el botón **PEN** de Ventas. Cambiarla no convierte los números con un tipo de cambio; cambia su unidad. El CSV incluye explícitamente la moneda.

Los formularios financieros esperan la confirmación del guardado. Si falla, conservan los campos y no dejan duplicado el movimiento al reintentar. Una pestaña desactualizada no puede sobrescribir una versión más reciente de los datos: se pide recargar. Esto no añade sincronización entre dispositivos; para eso siguen utilizándose las copias JSON.

## Empezar en la computadora

1. Descarga **Rumbo.html** y guárdalo en una carpeta que vayas a conservar.
2. Ábrelo con Chrome, Edge, Firefox o Safari actualizado. No necesitas instalar Python ni Node.
3. Ajusta la plantilla de **Mi horario** a tu vida real. Puedes crear bloques de una sola vez o semanales, editar una ocurrencia o la serie y quitar solo los bloques futuros.
4. Crea tus hábitos en **Mis hábitos** y marca lo que hayas cumplido desde **Hoy**.

El archivo contiene la interfaz y el programa completos, sin bibliotecas externas ni anuncios. Algunos visores de archivos del celular no ejecutan HTML; para el celular se recomienda la versión web de abajo.

## Abrirlo como web en celular y computadora

Los archivos públicos están preparados para **GitHub Pages**. La rama de esta aplicación es `mi-horario`; las ramas del video de Luno y `main` se mantienen aparte.

El propietario del repositorio debe activar la publicación una sola vez:

1. Abre **Settings → Pages** en `Ben160723/Proyecto-Robotica`.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Elige la rama **mi-horario** y la carpeta **/ (root)**. Pulsa **Save**.
4. Espera a que GitHub termine el despliegue. La dirección prevista es **https://ben160723.github.io/Proyecto-Robotica/**.

Guardar el código en una rama no activa GitHub Pages por sí solo. La publicación y la dirección deben comprobarse después de ese paso.

Una vez publicada, puedes guardar la web en la pantalla de inicio desde el menú del navegador. La versión alojada incluye un caché sin conexión; ábrela con internet la primera vez y deja que termine de cargar. No necesita conexión para registrar datos después de cargada.

## Qué puedes hacer

- **Hoy:** agenda, lista de hábitos, cumplimiento diario y una nota personal.
- **Mi horario:** vistas semanales y mensuales, bloques editables, horarios recurrentes y excepciones por fecha. Si dos bloques coinciden, te lo avisa y te permite decidir.
- **Mis hábitos:** nombre, icono, frase personal, días y fecha de inicio. Los cambios de frecuencia se aplican desde hoy y conservan la programación anterior. Puedes archivar y retomar hábitos.
- **Mi progreso:** gráficas semanales y mensuales, mapa de cumplimiento del mes, desglose por hábito, minutos y bloques completados.
- **Mi ruta:** las rutas de Python, robótica e inglés proporcionadas, con metas editables y pruebas de progreso. Puedes añadir tus siguientes metas.
- **Metas:** objetivos personales independientes, con cantidades, pasos o ganancias del negocio.
- **Ventas:** inventario y cuentas de tu reventa, con pedidos, cobros, gastos y exportación CSV.
- **Ajustes y copias:** personalización, exportación, importación y hasta siete copias locales diarias.

## Cómo se calcula el avance

El porcentaje es **marcas cumplidas / marcas previstas**, según los hábitos programados para cada fecha. Los días futuros y los días anteriores al inicio de un hábito no cuentan. Un día sin hábitos previstos se muestra con un guion; no equivale a un fracaso.

El tiempo cumplido suma los minutos de los bloques que marcaste como terminados. Los horarios futuros no aumentan los resultados. La racha cuenta días con todos los hábitos previstos cumplidos y omite días sin hábitos programados.

El calendario abarca **enero de 2026 a diciembre de 2051: 26 años**, incluidos los años bisiestos. La aplicación no genera 26 años de registros vacíos: solo guarda las marcas que haces y tus reglas de repetición.

## Guardar y pasar tus datos a otro dispositivo

Los datos se guardan **en el navegador y dispositivo donde usas la app**, normalmente en IndexedDB. Si este no está disponible, se intenta el almacenamiento local. Si no se puede guardar, la app lo indica; no debes cerrar sin exportar una copia.

**No hay una cuenta ni sincronización automática entre dispositivos.** Para trasladar tus datos:

1. En el dispositivo que tiene los datos más recientes, pulsa **Ajustes → Exportar mis datos**.
2. Guarda el JSON en tu propia nube, USB o carpeta de respaldo.
3. En el otro dispositivo, pulsa **Importar copia** y selecciona ese JSON.
4. La importación reemplaza los datos de ese navegador; exporta sus datos antes si también los necesitas. No combina automáticamente dos historiales independientes.

Una copia completa incluye horario, excepciones, hábitos, marcas, metas, notas y nombre. GitHub recibe el código de la app, **no tus registros personales**.

Conserva el archivo y usa siempre el mismo navegador. Abrir la app desde otra dirección —por ejemplo, cambiar de archivo local a GitHub Pages— crea otro espacio de almacenamiento: usa exportar/importar para trasladar tus avances.

Exporta regularmente, especialmente antes de cambiar de teléfono o borrar datos del navegador. Un calendario de 26 años no garantiza que el navegador conserve tus datos durante ese tiempo. Las siete copias automáticas también se pierden si borras el almacenamiento del navegador.

## Código y comprobaciones

- `index.html` / `Rumbo.html`: aplicación completa lista para usar; el mismo contenido en dos nombres.
- `app.js`, `extras.js`, `allocation.js`, `style.css`, `extras.css`, `allocation.css`, `index.template.html`: fuentes editables. Los archivos `extras` incorporan metas y ventas; los archivos `allocation` añaden la planificación del reparto de ganancias.
- `build.py`: reconstruye ambos HTML y el caché usando solamente Python estándar: `python build.py`.
- `manifest.webmanifest`, `icon.svg`, `sw.js`: versión web con acceso directo y caché sin conexión.
- `verificacion.json`: resultados de las pruebas ejecutadas en Chromium con tamaños de escritorio y celular.

Se probaron persistencia tras recargar, porcentajes, cambios históricos de frecuencia, excepciones semanales, edición y eliminación, calendario hasta 2051, 29 de febrero de 2040, exportación/importación en dos navegadores independientes, seis vistas a 390 px, recarga sin conexión y recuperación de datos no legibles. No se ejecutaron pruebas en dispositivos físicos iOS o Android; la revisión móvil se realizó con el tamaño de pantalla de un celular en Chromium.
