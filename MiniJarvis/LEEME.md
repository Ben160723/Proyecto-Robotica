# Mini Jarvis local · Windows 10 y 11

Un prototipo de asistente por voz para buscar, mover, renombrar y organizar archivos. Se ejecuta en **tu PC** y abre su interfaz en tu navegador. Esta conversación y el entorno en la nube no tienen acceso a tus archivos. No se integra con Rumbo ni necesita ChatGPT Plus, una API de pago o una suscripción.

## IA local opcional: comprender frases más libres

El modo básico funciona sin modelo, con los comandos de abajo. La versión **1.1** añade un conector opcional para **Ollama**, un programa que ejecuta modelos en tu propio PC:

1. Instala Ollama desde su web oficial, **https://ollama.com/download/windows**.
2. Descarga un modelo **local**, por ejemplo `llama3.2:3b`, desde Ollama. También puedes usar su terminal con `ollama pull llama3.2:3b`. Son varios GB de descarga; el tamaño y RAM necesarios dependen del modelo. Un equipo con 8 GB de RAM puede empezar por un modelo pequeño de 1B o 3B; con 16 GB suele haber más margen. No se promete una velocidad concreta y no se ha medido la inferencia real en este entorno.
3. Mantén Ollama abierto. En Mini Jarvis pulsa **Comprobar modelos instalados**, elige el modelo y pulsa **Activar IA local**. La activación es solo para esa sesión de la aplicación. No necesitas una clave y no hay cobros de API por la inferencia local.
4. Prueba, por ejemplo, `Pon en orden los archivos que descargué`. El modelo intenta traducir las frases no reconocidas a una propuesta de archivos. Debes revisar el resultado y confirmarlo igual que en el modo básico. Si faltan datos, indica los nombres exactos; no se adivina qué archivo quisiste decir.

**El modelo no viene dentro de este ZIP**, se descarga aparte con Ollama. El conector solo llama a `http://127.0.0.1:11434`; no permite elegir servidores remotos y filtra modelos identificados como cloud/remotos. Elige una instalación local de Ollama y un modelo descargado en ese equipo. Solo se envían al modelo tu petición y los alias de las carpetas autorizadas, **no sus rutas privadas, listas de archivos ni contenido de documentos**. Esta es una aplicación propia conectada a un modelo existente: no entrena un modelo nuevo desde cero.

La respuesta del modelo se valida contra acciones concretas y las mismas restricciones de carpetas. No puede ejecutar scripts, autorizar carpetas, confirmar códigos ni borrar definitivamente. Una propuesta de retirar archivos exige que tu petición incluya una intención explícita de borrar y el nombre exacto. Las solicitudes ambiguas deben concretarse. Las confirmaciones las interpreta directamente la aplicación, sin delegarlas al modelo.

## Para empezar

1. Descarga **MiniJarvis-Windows.zip** y usa **Extraer todo**. Necesitas Windows 10 u 11 de **64 bits (x64)** actualizado. El ZIP incluye el runtime oficial de Node; no necesitas instalar Node ni Python.
2. Abre la carpeta extraída `MiniJarvis` y ejecuta **Iniciar Mini Jarvis.bat**, con tu cuenta normal. No necesita permisos de administrador. Se abrirá tu navegador. Mantén abierta la ventana de la aplicación; `Ctrl+C` la cierra y apaga el micrófono. Si el navegador no se abre, la ventana muestra una dirección local que puedes copiar en ese mismo PC.
3. En **Mis carpetas**, escribe un nombre como `Descargas`, pulsa **Elegir…** y selecciona esa carpeta. Pulsa **Autorizar esta carpeta**. Haz lo mismo con `Documentos`, `Escritorio`, etc. Puedes retirar el acceso después. No se autoriza ninguna carpeta personal por defecto.
4. Prueba primero un comando escrito. Revisa los nombres y destinos, marca la revisión y confirma. **Todavía no se cambian archivos al preparar un plan.**
5. Pulsa **Activar voz** y empieza cada frase con **Jarvis**. Para aplicar el plan, di **Jarvis, confirmar** y los cuatro dígitos mostrados, de uno en uno; por ejemplo, `Jarvis, confirmar cinco dos siete uno`. También puedes usar los botones. El código caduca en cinco minutos.

## Voz de Windows

La voz usa `System.Speech`, el micrófono y el motor de reconocimiento **local de Windows**, no una API de internet. Necesitas un reconocedor de **español** instalado. Si falta, la app lo indica. En Configuración de Windows busca **Idioma y región / Idioma → Español → Opciones → Voz**, instala las funciones de voz disponibles y vuelve a abrir la app. Los nombres de esos menús dependen de la edición de Windows; la función de dictado en línea o Acceso por voz por sí sola no garantiza que `System.Speech` tenga un reconocedor instalado. Revisa también **Privacidad → Micrófono → Permitir que las aplicaciones de escritorio accedan al micrófono**.

Si no reconoce bien un nombre de archivo, busca primero por una palabra y escribe su nombre exacto. No se elige un archivo parecido automáticamente. Las frases con baja confianza se descartan. **Leer respuesta** usa la voz de Windows; apaga temporalmente el reconocimiento durante la reproducción para que no se escuche a sí mismo. El micrófono empieza apagado y se puede apagar con su botón o cerrando la aplicación.

El motor de voz puede necesitar descargar inicialmente el componente de idioma de Microsoft; eso se hace desde Windows. Con el componente instalado, el reconocimiento y los comandos no necesitan internet. El código nativo está incluido en `native/` y no cambia la política de ejecución de PowerShell ni la configuración de seguridad de Windows.

## Comandos

Usa los nombres de carpetas que hayas autorizado:

```text
Jarvis, organiza Descargas
Jarvis, organiza Descargas por fecha
Jarvis, busca factura en Documentos
Jarvis, mueve informe.pdf de Descargas a Documentos
Jarvis, mueve los PDF de Descargas a Documentos
Jarvis, renombra informe.pdf como informe final.pdf en Documentos
Jarvis, elimina borrador.pdf de Descargas
Jarvis, abre Documentos
Jarvis, deshaz el último cambio
Jarvis, cancela
Jarvis, ayuda
```

Para escribir, `Jarvis` es opcional. Los nombres con espacios admiten comillas, por ejemplo `mueve "informe final.pdf" de Descargas a Documentos`. También puedes indicar una ruta relativa como `Curso\informe.pdf`. No se permiten rutas absolutas ni `..` en las órdenes de archivos.

**Organizar** clasifica los archivos sueltos por tipo (Documentos, Imágenes, Videos, Audio, Comprimidos, Instaladores u Otros) o por mes de la última modificación en la zona horaria de tu PC. Conserva las subcarpetas. Si un destino ya existe, prepara un nombre como `informe (2).pdf`. **Mover los PDF** solo toma los archivos sueltos con esa extensión. **Buscar** revisa nombres, también en subcarpetas; no lee el contenido de los documentos. No se interpretan todos los atributos oculto/sistema de Windows: revisa siempre los nombres del plan. Se muestran hasta 500 resultados, se revisan hasta 10.000 entradas y ocho niveles de subcarpetas. Los límites y carpetas inaccesibles se indican; no se promete una búsqueda completa si se alcanzan.

Los planes admiten hasta **200 elementos**. Los archivos pueden cruzar unidades: se hace una copia exclusiva, se verifica su contenido y se retira el origen después. Las carpetas completas se pueden mover dentro de la misma unidad; para carpetas completas entre unidades usa el Explorador de Windows. Archivos abiertos o bloqueados pueden impedir una tarea.

## Papelera, historial y recuperación

**Eliminar** mueve el archivo o carpeta a una **papelera propia de Mini Jarvis**, `.mini-jarvis-papelera`, dentro de la carpeta de origen. No es la Papelera de Windows y no hay borrado permanente en este prototipo. **Deshaz el último cambio** prepara una recuperación con revisión y código. No recupera cambios hechos por otros programas.

La aplicación comprueba que los archivos y destinos no hayan cambiado desde el plan. No sobrescribe un archivo existente para deshacer. Si aparece un archivo con el nombre original o el destino se modificó después, se detiene y muestra el motivo. Retirar y volver a autorizar la misma carpeta permite recuperar su historial, siempre que los archivos sigan intactos.

Una tarea con varios archivos **no es una transacción atómica del sistema operativo**. Se registra cada operación y, ante un error, se intenta devolver las ya completadas al origen. Si algo impide devolverlas o la aplicación se cierra en plena tarea, el historial indica la interrupción y conserva las rutas. Revisa esas ubicaciones con el Explorador; no borres la papelera propia ni el historial antes de recuperar tus datos. Algunas carpetas nuevas vacías pueden quedar después de deshacer.

Los permisos de carpetas y el historial se guardan en `%LOCALAPPDATA%\MiniJarvis\datos` (en entornos de desarrollo, `MINIJARVIS_DATA_DIR` permite elegir una carpeta temporal). La papelera permanece en cada carpeta original. Copiar solo el historial a otro PC no traslada los archivos. Las aplicaciones y cambios externos pueden modificar un archivo mientras la tarea está activa; evita editar o sincronizar los mismos archivos durante su traslado.

## Alcance y privacidad

El modo básico es un intérprete de comandos concretos; la IA local es opcional. No ejecuta órdenes de terminal, scripts dictados, instalaciones ni funciones de administrador. Solo abre las carpetas autorizadas en el Explorador. Se protegen carpetas del sistema, nombres que empiezan por punto, archivos de configuración habituales como desktop.ini, enlaces simbólicos/uniones y los archivos de la propia aplicación. El acceso usa los permisos de tu cuenta.

El servicio escucha únicamente en `127.0.0.1`, en un puerto aleatorio, con un token de sesión y comprobaciones de origen y host. El token se entrega al abrir el navegador y se quita de su barra de direcciones. No compartas ese enlace de sesión. No se expone un servicio remoto ni se necesita abrir puertos en el router. No hay sincronización, envío de voz a un proveedor, lectura de documentos por una IA ni acceso de ChatGPT a tu computadora.

## Verificación y límites del prototipo

Las operaciones de archivos, el servidor y la interfaz se prueban en Linux con carpetas y archivos sintéticos, usando un adaptador de voz simulado. Se verifica búsqueda, traslado, clasificación, papelera, recuperación, conflictos, permisos, fallos y comandos de confirmación. El protocolo Ollama y las restricciones del modelo se prueban con respuestas simuladas; **no se ejecutó un modelo real ni se probó un micrófono físico o el puente nativo en Windows en este entorno**. Necesitarás comprobar esas partes en tu equipo y sus paquetes de idioma. El runtime incluido se verifica contra la huella SHA-256 del ZIP oficial de Node.js; se conserva su licencia.

Para desarrollo, con Node 22 o superior:

```sh
node --test tests/core.test.mjs tests/server.test.mjs tests/windows.test.mjs tests/model.test.mjs
node tests/browser.mjs
node server.mjs
```

La prueba del navegador necesita Playwright y Chromium. Admite `PLAYWRIGHT_MODULE` y `PLAYWRIGHT_CHROMIUM_EXECUTABLE` para una instalación existente. El núcleo no tiene dependencias npm. `build-package.py` crea el ZIP con un archivo oficial de runtime descargado por separado y verificado usando `runtime-manifest.json`; no descarga ni instala nada.
