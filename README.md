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
  
