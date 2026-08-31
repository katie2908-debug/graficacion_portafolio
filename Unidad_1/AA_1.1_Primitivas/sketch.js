function setup() {
  createCanvas(400, 400);
  background(220);

  // Cabeza
  fill(255, 184, 255);
  rect(110, 40, 180, 100, 10);
  // X, Y, ANCHO, ALTO, REDONDEADO

  // Oreja izquierda
  fill(255, 184, 255);
  rect(90, 70, 20, 40, 20);

  // Oreja derecha
  fill(255, 184, 255);
  rect(290, 70, 20, 40, 20);

  // La cosita que va arriba de su cabeza
  fill(255, 184, 255);
  rect(150, 25, 100, 20, 10);

  // Ojos
  fill(255, 68, 98);
  ellipse(170, 90, 35, 30);

  fill(255, 68, 98);
  ellipse(230, 90, 35, 30);

  // Boca
  fill(255, 68, 98);
  ellipse(200, 120, 25, 20);

// Cuello
fill(255, 184, 255);
rect(185, 140, 30, 25, 8);
  // Cuerpo
fill(255, 184, 255);
triangle(150, 165, 250, 165, 200, 270);

// Brazo izquierdo
fill(255, 184, 255);
rect(130, 165, 20, 80, 10);

// Brazo derecho
fill(255, 184, 255);
rect(250, 165, 20, 80, 10);

// Detalles de los brazos
stroke(0);
strokeWeight(3);

line(130, 205, 150, 205);
line(250, 205, 270, 205);
  
}
function draw() {
}
