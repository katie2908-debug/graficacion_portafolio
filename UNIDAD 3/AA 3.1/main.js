import * as THREE from 'three';

// Escena principal
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Fondo azul cielo

// --- CONFIGURACIÓN DE LA CÁMARA ---
// 16. Instanciar cámara de perspectiva (FOV, aspecto, near, far)
const camera = new THREE.PerspectiveCamera(
  75,                                     // a. Ángulo de visión
  window.innerWidth / window.innerHeight, // b. Relación de aspecto
  0.1,                                    // c. Distancia mínima
  1000                                    // d. Distancia máxima
);

// 17. Posicionar la cámara elevada y alejada para ver toda la cancha rectangular
camera.position.set(0, 6.5, 13);
camera.lookAt(0, 0.5, 0);

// --- CONFIGURACIÓN DEL RENDERIZADOR ---
// 18a. Vincular el elemento <canvas> mediante su ID
const canvasElement = document.querySelector('#mi-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });

// 18b. Definir el tamaño de renderizado y manejar el evento resize
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- TEXTURA DE CANCHA DE PASTO (FRANJAS VERDES) ---
const canvasCancha = document.createElement('canvas');
canvasCancha.width = 512;
canvasCancha.height = 256;
const ctx = canvasCancha.getContext('2d');

// Dibujar franjas verticales alternadas como pasto podado de cancha
const numFranjas = 10;
const anchoFranja = canvasCancha.width / numFranjas;
for (let i = 0; i < numFranjas; i++) {
  ctx.fillStyle = i % 2 === 0 ? '#5cb85c' : '#4cae4c';
  ctx.fillRect(i * anchoFranja, 0, anchoFranja, canvasCancha.height);
}

// Borde blanco suave alrededor de la cancha
ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
ctx.lineWidth = 6;
ctx.strokeRect(10, 10, canvasCancha.width - 20, canvasCancha.height - 20);

const texturaCancha = new THREE.CanvasTexture(canvasCancha);

// --- SUELO RECTANGULAR TIPO CANCHA ---
// 19, 20, 21. Caja rectangular ancha (ancho: 18, alto: 0.35, profundidad: 11)
const geometriaSuelo = new THREE.BoxGeometry(18, 0.35, 11);
const materialSuelo  = new THREE.MeshBasicMaterial({ map: texturaCancha });
const suelo          = new THREE.Mesh(geometriaSuelo, materialSuelo);

// Posicionar justo debajo de la base del tronco (y = -1.0)
suelo.position.y = -1.175;

// 22. Agregar el suelo rectangular al escenario 3D
scene.add(suelo);

// --- CONSTRUCCIÓN DEL ÁRBOL EN EL CENTRO ---
const arbol = new THREE.Group();

// 19. Geometrías básicas del árbol
const geometriaTronco = new THREE.CylinderGeometry(0.35, 0.45, 2, 16);
const geometriaCopa1  = new THREE.ConeGeometry(1.8, 2.2, 16); // Nivel inferior
const geometriaCopa2  = new THREE.ConeGeometry(1.4, 1.9, 16); // Nivel medio
const geometriaCopa3  = new THREE.ConeGeometry(1.0, 1.6, 16); // Punta

// 20. Materiales básicos con propiedad de color (MeshBasicMaterial)
const materialTronco = new THREE.MeshBasicMaterial({ color: 0x6b4226 }); // Café
const materialHojas1 = new THREE.MeshBasicMaterial({ color: 0x1b5e20 }); // Verde oscuro
const materialHojas2 = new THREE.MeshBasicMaterial({ color: 0x2e7d32 }); // Verde medio
const materialHojas3 = new THREE.MeshBasicMaterial({ color: 0x388e3c }); // Verde claro

// 21. Instanciar las mallas (THREE.Mesh)
const tronco = new THREE.Mesh(geometriaTronco, materialTronco);
const copa1  = new THREE.Mesh(geometriaCopa1, materialHojas1);
const copa2  = new THREE.Mesh(geometriaCopa2, materialHojas2);
const copa3  = new THREE.Mesh(geometriaCopa3, materialHojas3);

tronco.position.y = 0;
copa1.position.y  = 1.8;
copa2.position.y  = 2.8;
copa3.position.y  = 3.7;

arbol.add(tronco, copa1, copa2, copa3);

// 22. Incluir el árbol en el centro del escenario 3D
scene.add(arbol);

// --- BUCLE DE ANIMACIÓN ---
// 23. Función recursiva de animación
function animate() {
  // 23a. Sincronizar con la tasa de refresco del monitor
  requestAnimationFrame(animate);

  // 23b. Rotar el árbol sobre su eje en el centro de la cancha
  arbol.rotation.y += 0.01;

  // 23c. Renderizar la escena
  renderer.render(scene, camera);
}

// 24. Invocar animate() por primera vez para iniciar el ciclo
animate();