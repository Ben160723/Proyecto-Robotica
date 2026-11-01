# Rumbo — un día a la vez

Tu horario, hábitos y aprendizaje en una aplicación en español, adaptable a celular y computadora.

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
- `app.js`, `style.css`, `index.template.html`: fuentes editables.
- `build.py`: reconstruye ambos HTML y el caché usando solamente Python estándar: `python build.py`.
- `manifest.webmanifest`, `icon.svg`, `sw.js`: versión web con acceso directo y caché sin conexión.
- `verificacion.json`: resultados de las pruebas ejecutadas en Chromium con tamaños de escritorio y celular.

Se probaron persistencia tras recargar, porcentajes, cambios históricos de frecuencia, excepciones semanales, edición y eliminación, calendario hasta 2051, 29 de febrero de 2040, exportación/importación en dos navegadores independientes, seis vistas a 390 px, recarga sin conexión y recuperación de datos no legibles. No se ejecutaron pruebas en dispositivos físicos iOS o Android; la revisión móvil se realizó con el tamaño de pantalla de un celular en Chromium.
