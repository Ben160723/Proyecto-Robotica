# Proyecto-Robotica
Primer proyecto de LED
## HICE MI PRIMER PROYECTO DE ROBOTICA, NO ALGO TAN AVANZADO, SINO ALGO BASICO, ES ESCENDER UN LED CON UN ARDUINO UNO
### COMPONENTES
- 1 Arduino UNO
- 1 LED ROJO
- 1 RESISTENCIA 220 ohms
- 2 CABLES
### CODIGO
// C++ code
//
void setup(){
  pinMode(13, OUTPUT);}
void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);}
//cuenta en milisegundos
### Mis Errores
-Al principio intente poner el LED sin la resistencia, pero al instante el LED se quemo 
-Tuve problemas con el codigo, ya que no sabia como hacerlo, pero al final pude ajustarlo a lo que quise.
### Reflexion
Quizas para algunos este proyecto es algo basico o algo tonto, pero para mi esto es solo el primer paso de lo que relamente quiero hacer en 5 años, espero 
que el que este leyendo esto, siga todos mi articulos/reportea que hare los fines de semana y ver como progreso poco a poco para cambiar al mundo, este mensaje es tambien para mi yo del futuro, 
para que siga adelante y no se deje influenciar por las criticas mals hacia el.
  


## Rumbo — horario y hábitos

Esta rama contiene **Rumbo**, un horario editable para celular y computadora, con hábitos diarios, gráficas semanales y mensuales y calendario de 2026 a 2051.

- [Descargar la aplicación Rumbo.html](Rumbo.html?raw=true)
- [Instrucciones y activación de la versión web](Horario/LEEME.md)
- [Código fuente y comprobaciones](Horario/)

Los datos personales se guardan en tu navegador; no se suben al repositorio. Para pasar tus avances entre dispositivos usa Exportar e Importar. La web necesita que el propietario active GitHub Pages para la rama `mi-horario`, carpeta `/ (root)`.

### Rumbo 2 · Metas y ventas en soles

Se añadieron metas personales, listas de pasos y objetivos de ganancia. Ventas incorpora productos, existencias, compras de Temu en camino, costos por lote, cobros pendientes, gastos, ganancias, caja, exportación CSV y el círculo del inventario por vender. Los hábitos ahora explican las fechas futuras y muestran un botón visible para volver a hoy y marcar.

La actualización convierte los datos de la versión 1 sin borrar horario, hábitos ni rutas. Antes de sustituir el archivo, exporta una copia y cierra las pestañas antiguas. Mantén la misma ubicación y navegador para conservar el almacenamiento; si cambias de dirección, usa Importar copia. No borres los datos del navegador para actualizar.

[Guía completa de uso y actualización](Horario/LEEME.md) · [65 comprobaciones de funcionamiento](Horario/verificacion.json)

### Repartir ganancias

En **Ventas → Repartir ganancias** puedes ver lo invertido y ajustar el plan inicial de **50% reinversión, 20% ahorro personal, 20% reserva del negocio y 10% diversión**. Los porcentajes deben sumar 100% y los cuatro importes conservan exactamente los céntimos de la ganancia disponible en caja. El plan se guarda y se incluye en las copias JSON. Es una propuesta de organización: no crea transferencias ni retiros.

### Rumbo 3 · Exámenes y pruebas por nivel

**Mi ruta** incluye exámenes de 10 preguntas y dos mini pruebas en cada uno de los 13 niveles de Python, Robótica e Inglés A1–C1. Para abrir el siguiente nivel necesitas **más de 60% en el examen y en la prueba práctica/oral**, por separado; en Inglés también más de 60% en listening en el mismo examen aprobado. Un 60% exacto no aprueba.

El listening lleva diez audios originales incluidos sin conexión. Para speaking puedes grabarte, subir un audio o documentar una revisión externa. Las rúbricas de speaking y proyectos son **manuales**; la app no evalúa la pronunciación ni ejecuta el código. Las prácticas son originales y orientativas, sin afiliación a PUCP o ICPNA. Incluye borradores, historial, explicaciones, repasos en el horario y calificaciones CSV. Los datos pasan a formato 3 sin perder los registros anteriores. Las copias JSON guardan el avance; descarga los archivos de voz por separado.

### Rumbo 4 · Prácticas semanales y correcciones

Cada ruta añade tres prácticas semanales de unos 25 minutos en total, adaptadas a un nivel disponible: Python, Robótica e Inglés con escritura, listening y speaking. Permite notas, marcas corregibles, programación en el horario, gráfico de ocho semanas y exportación CSV. Los registros conservan el nivel y sus consignas originales al avanzar o editar una meta. Hay cuatro bloques rotativos por nivel y se mantiene el requisito de más de 60% en las evaluaciones para avanzar.

Se corrigieron listening `null%` y transcripciones vacías en rutas técnicas, el mensaje de la última etapa, fallos de inicio del grabador y la subida de audio sin MIME desde el celular. Las copias pasan a formato 4 y conservan los datos de versiones anteriores.

### Rumbo 5 · Papelera de productos y edición de costos

En Productos, cada fila incorpora una papelera recuperable para productos sin inventario ni pedidos pendientes. Sus movimientos y cobros siguen en el historial; si una devolución restaura unidades, el producto reaparece. El lápiz del producto permite corregir el costo unitario y envío de cada lote; Compras / pedidos también tiene un lápiz por compra. La vista previa y el historial de correcciones explican cómo cambian inversión, inventario, costo de ventas anteriores, ganancias, caja y reparto, conservando cantidades, precios de venta y cobros.

Se reforzó el guardado del archivado y la recuperación de copias locales ilegibles. Los datos usan formato 5 y conservan las copias anteriores.

### Vaciar papelera

En **Productos → Papelera → Vaciar papelera**, una confirmación muestra el total que se retirará, incluidos los resultados ocultos por la búsqueda. Los productos sin movimientos se borran; los que tienen compras o ventas salen de la papelera conservando sus registros contables y saldos. Una devolución con unidades recupera el producto para mostrar sus existencias. El cambio es atómico y las copias usan formato 6, compatible con los formatos anteriores.
