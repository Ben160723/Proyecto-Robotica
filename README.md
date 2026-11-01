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
