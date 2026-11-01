# Rumbo — un día a la vez

Tu horario, hábitos y aprendizaje en una aplicación en español, adaptable a celular y computadora.

## Combos y packs

En **Ventas → Combos y packs** puedes preparar ofertas con productos de tu catálogo:

1. Pulsa **Nuevo combo o pack** y escribe el nombre y el precio conjunto.
2. Elige **Combo** para dos o más productos diferentes, o **Pack** para uno o varios productos con las cantidades que prefieras; por ejemplo, tres unidades del mismo producto.
3. Selecciona cada producto e indica cuántas unidades lleva **una oferta**. Usa **Añadir producto** para más componentes, hasta veinte. Cada producto se incluye una sola vez; para repetir unidades cambia su cantidad.
4. Revisa la disponibilidad, el precio por separado y el costo y resultado estimados. Pulsa **Guardar oferta**.

Crear una oferta no crea inventario, no lo reserva y no registra una compra ni una venta. Puedes preparar la receta aunque todavía falten existencias. Las ventas individuales, combos y packs **comparten las mismas unidades**. La disponibilidad muestra cuántas ofertas completas puedes armar, limitada por el producto del que tengas menos unidades en relación con su cantidad requerida. Los productos archivados o retirados y los pedidos todavía en camino no habilitan una venta.

Pulsa **Vender combo** o **Vender pack** en su tarjeta. También hay un acceso **Vender combo o pack** en Ventas y cobros y en el formulario de venta individual. Indica cantidad de ofertas, precio por oferta, descuento total, comisiones o entrega de toda la venta, fecha y lo cobrado. Si queda un saldo, indica el cliente o una referencia. La vista previa muestra las unidades físicas que saldrán de cada producto, el total, costo, resultado y saldo.

Se guarda **una sola venta** con todos sus componentes. El precio de venta no se duplica por cada producto. El costo se calcula a partir de las unidades de los lotes recibidos más antiguos disponibles de cada componente, incluido el envío de compra y sus céntimos. Una venta puede usar varios lotes del mismo producto. Si falta alguna unidad para la fecha seleccionada, se rechaza toda la venta; no se descuenta solo una parte.

La composición, las cantidades por oferta, el nombre y el precio de cada venta quedan registrados. **Editar la receta o el precio de una oferta afecta a ventas nuevas**. Cambiar el nombre del producto no reescribe el nombre registrado de los componentes en ventas anteriores. Corregir un costo de compra sí recalcula los costos de las ventas que usaron ese lote, como sucede con las ventas individuales, y conserva el historial de correcciones.

Los combos y packs participan en el resumen de ventas, ganancias, cobros, caja, inventario, reparto y metas ligadas a ganancias. El círculo del inventario cuenta las **unidades físicas** vendidas, no solo el número de ofertas. Puedes cobrar un saldo en Ventas y cobros sin volver a descontar existencias. El CSV lleva una fila por venta, con tipo de oferta, composición registrada y cantidad de unidades físicas.

**Anular y devolver unidades** revierte la venta completa y devuelve cada componente a sus lotes originales, incluso si la receta se editó después. Hazlo únicamente cuando hayas recibido todos los productos y devuelto los cobros. Este flujo no registra devoluciones parciales de una oferta. Si un producto estaba retirado, reaparece para mostrar las unidades devueltas.

Puedes **Archivar** y **Retomar** ofertas; sus ventas anteriores se conservan. Cuando un producto de una receta se retira del catálogo, la oferta aparece sin disponibilidad y permite editar su composición. Vaciar la papelera conserva los registros de producto usados por recetas para evitar referencias rotas, aunque todavía no tengan compras ni ventas.

Las copias JSON incluyen recetas, ventas, composición e importes. El formato actual es **7** y acepta los formatos anteriores del 1 al 6. Exporta una copia desde Ajustes antes de actualizar y usa el archivo actualizado para restaurar una copia nueva.

## Novedad · Vaciar papelera

En **Ventas → Productos → Papelera** aparece el botón **Vaciar papelera**, desactivado cuando no hay productos. Antes de guardar muestra el total de toda la papelera, incluso si la búsqueda solo está mostrando parte de la lista.

- Los productos **sin compras, ventas ni referencias en ofertas** se borran definitivamente.
- Los productos **con movimientos o usados por recetas de ofertas**, aunque estén anulados o archivados, salen de la papelera conservando sus registros y referencias. Ya no se recuperan desde la papelera.

Puedes cancelar la confirmación antes de aplicar el cambio. Si necesitas poder volver al estado anterior después de vaciarla, exporta primero una copia JSON desde Ajustes. Una devolución que reintegre unidades recupera automáticamente el producto con historial para mostrar su inventario.

El vaciado se guarda como una sola operación: si falla el almacenamiento o hay cambios más recientes en otra pestaña, no se conserva un vaciado parcial. Las copias actuales usan **formato 6**, conservan este estado y aceptan los formatos anteriores del 1 al 5.

## Novedades de la versión 5 · Productos y costos de compra

En **Ventas → Productos**, cada fila tiene una **papelera** junto al lápiz. Puedes retirar productos sin unidades disponibles ni pedidos vigentes pendientes y recuperarlos con **Papelera → Recuperar producto**. Las compras anuladas, ventas, saldos pendientes e historial de costos se conservan. Retirar un producto del catálogo no anula sus movimientos ni modifica las cuentas.

Si todavía tiene inventario o pedidos en camino, la app muestra qué queda por resolver. Si solo quieres ocultarlo, usa **Archivar**. Si cancelaste una compra, recuperaste su importe y no hay unidades de ese lote asignadas a ventas vigentes, anula la compra desde **Compras / pedidos** antes de enviar el producto a la papelera. No registres un reembolso que no recibiste; los gastos no recuperados se registran en Gastos. Al anular con devolución una venta de un producto retirado, el producto se recupera automáticamente para que sus unidades vuelvan a ser visibles.

Para corregir cuánto pagaste por cada unidad:

1. Pulsa el **lápiz del producto**. El editor separa **Precio de venta por unidad** y **Lo que pagaste al comprar**.
2. En cada lote puedes corregir **Costo de compra por unidad** y **Envío / impuestos del lote**. Si las unidades se compraron a distintos precios, regístralas como lotes separados. El editor de costos no cambia cantidades.
3. Revisa la vista previa de **inversión, ganancia neta, saldo de caja y ganancia disponible para repartir**. Puedes indicar el motivo de la corrección.
4. Pulsa **Guardar producto**. También puedes abrir el **lápiz de una compra** en Compras / pedidos para corregir únicamente ese lote.

**Corregir el costo actualiza también el costo de ventas anteriores que tomaron unidades de ese lote.** Es una corrección del dato original, no una compra nueva, un gasto adicional ni un reembolso. El sistema recalcula las asignaciones por lote y sus céntimos de envío, el inventario, la inversión, las ganancias, la caja y las metas ligadas a la ganancia. Las cantidades vendidas, los precios históricos de venta y los cobros conservan sus valores. El precio sugerido del producto solo se usa para nuevas ventas.

El **Historial de correcciones** guarda fecha, importe anterior y nuevo y motivo por lote. Se incluye en las copias JSON. Si falla el guardado o existe una versión más reciente en otra pestaña, los costos vuelven a su estado anterior y los campos quedan disponibles para reintentar; no se duplica la corrección. El archivado también espera el guardado y revierte el cambio si falla.

Se corrigió además la recuperación de almacenamiento local ilegible cuando IndexedDB no está disponible: la app conserva y exporta el objeto o texto original en lugar de sustituirlo por un planificador vacío. En ese caso usa **Exportar copia de recuperación** o la exportación que muestra Ajustes antes de restaurar otra copia.

La versión actual usa **formato 5** y acepta copias de las versiones 1 a 4. Conserva tus datos anteriores; usa siempre el archivo actualizado para restaurar una copia nueva. Exporta una copia desde Ajustes antes de actualizar.

## Novedades de la versión 4 · Prácticas semanales

Al entrar en **Mi ruta**, cada ruta muestra **tres prácticas cortas para la semana**, con unos **25 minutos orientativos en total**. Puedes repartirlas entre varios días y elegir uno de tus niveles disponibles antes de guardar el primer resultado.

- **Python:** una predicción o diseño, un ejercicio para ejecutar en tu propio Python y una explicación de resultados y mejoras.
- **Robótica:** diseño y comprobación en equipo o simulador, con observaciones y una reflexión. Las consignas distinguen las pruebas simuladas del trabajo físico.
- **Inglés:** escritura, un listening con audio y transcripción incluidos y una intervención oral breve adecuada al nivel. La práctica oral semanal no exige subir un archivo ni recibir una nota.

Hay cuatro bloques que se repiten por nivel; al regresar a un bloque, usa otros datos o mejora tu solución anterior. Son actividades para aprender y mantener constancia, no cuatro exámenes distintos. Las instrucciones, el nivel y el nombre de la meta quedan conservados al guardar el primer resultado de esa semana. Avanzar de nivel o editar una meta no cambia lo que ya registraste.

Pulsa **Abrir práctica**, escribe tus resultados o dudas y, cuando la hayas realizado, marca **Hice la práctica y comprobé el resultado**. Puedes guardar notas sin completarla, corregir las notas o retirar una marca. Este registro es **manual** y no cambia las calificaciones ni abre el siguiente nivel: para eso se mantienen las evaluaciones con más de 60%.

Las flechas y el selector de fecha permiten revisar semanas desde enero de 2026 hasta diciembre de 2051. Las semanas van de lunes a domingo; las de los extremos pueden contener solo una parte de días dentro del calendario. Puedes guardar planes de semanas futuras, pero no marcarlas todavía. **Esta semana** vuelve al período actual.

El gráfico muestra hasta ocho semanas anteriores a la seleccionada, incluida esta. Cada barra indica prácticas realizadas de tres posibles. **Sin registro** distingue una semana que todavía no guardaste. Pulsa una barra para consultar esa semana. **Exportar prácticas CSV** incluye el nivel, las consignas por título, los minutos orientativos, las marcas manuales y las notas. Los minutos no son una medición de tiempo realmente trabajado.

**Al horario** prepara un bloque editable con la duración e instrucciones de la práctica; debes guardar ese formulario para añadirlo a tu agenda. Completar el bloque del horario y completar la práctica son registros independientes.

También se corrigieron porcentajes de listening que aparecían como `null%` en las rutas técnicas, enlaces a transcripciones vacías y el mensaje al terminar la última etapa. El grabador libera el micrófono si falla el inicio o se cierra el formulario mientras llega el permiso. La revisión espera al procesamiento del audio. Las subidas aceptan audios válidos de celular sin un tipo MIME informado, comprueban que se puedan abrir y conservan el audio anterior si el nuevo archivo no se puede reproducir.

Las prácticas, notas y marcas están incluidas en la copia JSON. La versión actual usa **formato 4** y conserva automáticamente los datos de las versiones 1, 2 y 3, incluidas tus evaluaciones y ventas. Antes de actualizar, exporta una copia desde Ajustes, cierra la versión anterior y usa el mismo navegador y ubicación, o importa esa copia en la nueva ubicación.

## Novedades de la versión 3 · Evaluaciones por nivel

En **Mi ruta** tienes los cuatro niveles de Python, los cuatro de Robótica y los cinco de Inglés (A1–C1). Cada nivel incluye un examen original de **10 preguntas**, dos mini pruebas de tres preguntas y una prueba práctica con rúbrica. Las mini pruebas reutilizan conceptos y preguntas del banco para practicar; no son exámenes adicionales de certificación.

Para desbloquear el siguiente nivel necesitas **más de 60% en el examen y más de 60% en la práctica**, por separado. Un **60% exacto no aprueba**: necesitas al menos 7/10 en el examen y 13/20 en la rúbrica. Debes aprobar todos los niveles anteriores de esa ruta. Puedes repetir sin límite; conservas todos tus intentos y cuenta un intento aprobado, aunque después tengas uno peor. En Inglés, el mismo examen aprobado debe superar también 60% en sus tres preguntas de listening (al menos 2/3). Una buena nota global con listening insuficiente no abre el siguiente nivel.

- **Inglés:** gramática, vocabulario, lectura y dos audios originales por nivel. Escucha los audios completos antes de entregar; puedes repetirlos. Las transcripciones y explicaciones aparecen tras entregar. Los diez audios sintéticos están incluidos en el HTML y funcionan sin conexión. La velocidad inicial es más lenta en A1/A2. Son prácticas orientativas por nivel, **no exámenes oficiales de PUCP o ICPNA**, ni pruebas validadas para certificar un nivel MCER.
- **Speaking:** cada nivel tiene una consigna oral y una duración mínima orientativa, desde 45 segundos en A1 hasta 8 minutos en C1. Puedes grabarte con el micrófono, subir un audio o documentar una revisión oral externa. La grabación requiere permiso, un navegador compatible y un contexto seguro admitido por el navegador; si falla, usa la grabadora del celular y sube el archivo. La duración declarada debe corresponder a la intervención real.
- **Python:** proyectos con código y evidencias de ejecución, casos de prueba y resultados. Ejecuta tu código en tu propio Python; Rumbo guarda el texto y la revisión, pero no lo ejecuta.
- **Robótica:** proyectos que puedes documentar con un circuito físico o simulador, incluyendo mediciones, calibración y respuesta ante fallos según el nivel.
- **Prueba práctica u oral:** la nota es **manual**, mediante autoevaluación o una revisión de docente/compañero. Cuatro criterios de 0–5 puntos, evidencias escritas y confirmación de que hiciste la prueba. La aplicación calcula el porcentaje de la rúbrica; **no evalúa automáticamente pronunciación, fluidez, código ni circuitos**. Una revisión externa también pide el nombre de quien revisó.

Las preguntas y sus opciones se mezclan al empezar. Las respuestas se guardan al elegirlas; puedes usar **Guardar y salir** y **Continuar examen** después. Al entregar recibes la nota, tus errores, la respuesta correcta y una explicación. **Historial y repaso** conserva las notas y los temas que fallaste. **Programar repaso** abre un bloque editable del horario y **Exportar calificaciones CSV** descarga las notas con su tipo de evaluación.

Los audios de tus intervenciones se guardan localmente en IndexedDB, con un límite de 12 MB por archivo y solo el último audio por nivel/plantilla. Puedes escucharlos, descargarlos o eliminarlos sin borrar las calificaciones. Las grabaciones se detienen al cerrar el formulario y tienen un límite de 20 minutos. Si no hay IndexedDB o falla el guardado, se ofrece la descarga de la grabación; conserva ese archivo aparte. Si llega el aviso de error de guardado, no des por conservado el cambio.

**Las copias JSON incluyen respuestas, borradores, rúbricas, notas y referencias de audio; no incluyen los archivos de voz.** Descárgalos aparte para moverlos a otro dispositivo. Si importas una copia donde no existe el audio local, la app lo explica y permite volver a subirlo. Las calificaciones manuales históricas siguen conservadas. El audio de listening del curso ya viene dentro de la aplicación y no necesita traslado separado.

Puedes editar tus metas o añadir otro nivel. El formulario permite elegir una plantilla de evaluación de la misma ruta o **Proyecto personalizado**, que usa un examen general de planificación y una prueba de evidencias; esta plantilla general no añade listening ni una consigna oral. Cambiar de plantilla conserva el historial, pero los intentos de otra plantilla no aprueban la nueva. Los niveles marcados en versiones antiguas se mantienen como historial y quedan con evaluación pendiente; esa marca manual no abre niveles.

La versión 3 convierte automáticamente las copias de las versiones 1 y 2 y conserva horario, hábitos, notas, metas, inventario, ventas y reparto de ganancias. Usa siempre la versión actual: los datos nuevos tienen **formato 3** para que los archivos antiguos de Rumbo no sobrescriban inadvertidamente tus evaluaciones.

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

La versión actual convierte automáticamente los formatos anteriores, conservando horario, hábitos, marcas, notas, perfil y rutas. Acepta copias JSON de las versiones 1 a 6. Si abres desde otra dirección o dispositivo, utiliza **Importar copia**. Las copias nuevas incluyen además todas las metas, los movimientos del negocio, combos y packs, papelera y su vaciado, correcciones de costo, tus evaluaciones y las prácticas semanales; usa la versión actualizada para restaurarlas.

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
- **Mi ruta:** Python, robótica e inglés, con prácticas semanales, notas y gráfico, exámenes, mini pruebas, proyectos y speaking, historial y desbloqueo al superar 60%. Puedes editar las metas y añadir niveles.
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

Una copia JSON incluye horario, excepciones, hábitos, marcas, metas, notas, nombre, ventas, reparto de ganancias y evaluaciones. Los archivos de voz se descargan por separado. GitHub recibe el código de la app, **no tus registros personales**.

Conserva el archivo y usa siempre el mismo navegador. Abrir la app desde otra dirección —por ejemplo, cambiar de archivo local a GitHub Pages— crea otro espacio de almacenamiento: usa exportar/importar para trasladar tus avances.

Exporta regularmente, especialmente antes de cambiar de teléfono o borrar datos del navegador. Un calendario de 26 años no garantiza que el navegador conserve tus datos durante ese tiempo. Las siete copias automáticas también se pierden si borras el almacenamiento del navegador.

## Código y comprobaciones

- `index.html` / `Rumbo.html`: aplicación completa lista para usar; el mismo contenido en dos nombres.
- `app.js`, `extras.js`, `allocation.js`, `learning.js`, `weekly.js`, `inventory.js`, `combos.js` y sus CSS, `index.template.html`: fuentes editables. Los archivos `learning` incorporan las evaluaciones, `weekly` las prácticas y su historial, `inventory` la papelera y la corrección de costos por lote, y `combos` las ofertas y sus ventas con varios productos.
- `exam-bank.json` / `exam-bank.js`: 140 preguntas originales, 13 plantillas por nivel y una plantilla general. El JavaScript incluye el audio codificado para el HTML autónomo.
- `audio/`: diez MP3 de listening, sus textos y licencia de Flite. Para regenerar el banco y los audios, ejecuta opcionalmente `python create_exam_bank.py` con FFmpeg y su filtro Flite instalados; el uso normal de la app y `build.py` no requieren FFmpeg.
- `build.py`: reconstruye ambos HTML y el caché usando solamente Python estándar: `python build.py`.
- `manifest.webmanifest`, `icon.svg`, `sw.js`: versión web con acceso directo y caché sin conexión.
- `verificacion.json`: resultados de las pruebas ejecutadas en Chromium con tamaños de escritorio y celular.

Se probaron persistencia tras recargar, porcentajes, cambios históricos de frecuencia, excepciones semanales, edición y eliminación, calendario hasta 2051, 29 de febrero de 2040, exportación/importación en dos navegadores independientes, seis vistas a 390 px, recarga sin conexión y recuperación de datos no legibles. No se ejecutaron pruebas en dispositivos físicos iOS o Android; la revisión móvil se realizó con el tamaño de pantalla de un celular en Chromium.

También se probaron las evaluaciones de los 13 niveles, el rechazo de 60% exacto, las rúbricas, la condición separada de listening, borradores, reproducción de los MP3 incluidos, grabación MediaRecorder con una señal sintética, subida/descarga/eliminación de audio, migración de copias, uso sin conexión y fallos de guardado. No se evaluó una voz humana ni se validó pedagógicamente una certificación MCER. El ZIP extraído se reconstruyó y se probó mediante localhost y caché sin conexión; la política del Chromium administrado impidió comprobar la apertura directa con una dirección file://.

Las prácticas semanales se comprobaron con recarga, edición de marcas, independencia de rutas, cambio de nivel, conservación de consignas anteriores, extremos del calendario, cambio de horario estacional, CSV, migración de formato 3, errores de almacenamiento y restauración en un contexto móvil independiente. Se verificaron también fallos de inicio del grabador, cancelación de un permiso pendiente y subida de archivos sin MIME o que no contienen audio válido.

Se comprobaron también correcciones de costo con ventas parciales de varios lotes, céntimos de envío, ventas anuladas, cantidades devueltas, recálculo de ganancias y caja, historial de cambios, fallos de guardado y pestañas desactualizadas. Se probaron productos vacíos, pedidos cancelados y productos agotados con cobros pendientes en la papelera, recuperación automática al devolver una venta, copias en otro contexto móvil y recuperación del texto local original cuando una copia es ilegible.

El vaciado de papelera se probó con productos sin movimientos y con historial, búsquedas activas, cancelación, fallo de guardado, pestañas desactualizadas, recarga, importación de copia en móvil y uso sin conexión. Se comprobó la conservación de importes y saldos y la recuperación del producto al devolver unidades después del vaciado.

Los combos y packs se verificaron con productos repetidos, varios lotes y céntimos de envío, stock compartido, ventas de fechas anteriores, pedidos en camino, pagos parciales y cobros posteriores, edición de receta, anulación, devolución de productos retirados, correcciones de costos, archivo, papelera, CSV, copias, carga inicial y restauración móvil sin conexión. Se comprobaron también fallos de guardado y pestañas desactualizadas.
