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

// 17. Ajustar la posición en Z para alejarla del origen y ver el árbol completo
camera.position.z = 7.5;
camera.position.y = 1.6;

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

// --- CONSTRUCCIÓN DE LAS MALLAS (ÁRBOL Y SUELO) ---
const arbol = new THREE.Group();

// 19. Geometrías básicas
// Suelo (isla de pasto y capa de tierra)
const geometriaPasto  = new THREE.CylinderGeometry(2.6, 2.6, 0.25, 24);
const geometriaTierra = new THREE.CylinderGeometry(2.55, 1.9, 0.45, 24);

// Árbol (tronco y 3 niveles de follaje)
const geometriaTronco = new THREE.CylinderGeometry(0.35, 0.45, 2, 16);
const geometriaCopa1  = new THREE.ConeGeometry(1.8, 2.2, 16); // Nivel inferior
const geometriaCopa2  = new THREE.ConeGeometry(1.4, 1.9, 16); // Nivel medio
const geometriaCopa3  = new THREE.ConeGeometry(1.0, 1.6, 16); // Punta

// 20. Materiales básicos con propiedad de color (MeshBasicMaterial)
const materialPasto  = new THREE.MeshBasicMaterial({ color: 0x66bb6a }); // Verde pasto claro
const materialTierra = new THREE.MeshBasicMaterial({ color: 0x4e342e }); // Café tierra oscuro
const materialTronco = new THREE.MeshBasicMaterial({ color: 0x6b4226 }); // Café tronco
const materialHojas1 = new THREE.MeshBasicMaterial({ color: 0x1b5e20 }); // Verde oscuro
const materialHojas2 = new THREE.MeshBasicMaterial({ color: 0x2e7d32 }); // Verde medio
const materialHojas3 = new THREE.MeshBasicMaterial({ color: 0x388e3c }); // Verde claro

// 21. Instanciar las mallas (THREE.Mesh) combinando geometría y material
const pasto  = new THREE.Mesh(geometriaPasto, materialPasto);
const tierra = new THREE.Mesh(geometriaTierra, materialTierra);
const tronco = new THREE.Mesh(geometriaTronco, materialTronco);
const copa1  = new THREE.Mesh(geometriaCopa1, materialHojas1);
const copa2  = new THREE.Mesh(geometriaCopa2, materialHojas2);
const copa3  = new THREE.Mesh(geometriaCopa3, materialHojas3);

// Posicionar cada parte en el eje Y para armar la estructura completa
tierra.position.y = -1.35; // Base de tierra debajo del pasto
pasto.position.y  = -1.0;  // Superficie de pasto justo bajo la base del tronco
tronco.position.y = 0;
copa1.position.y  = 1.8;
copa2.position.y  = 2.8;
copa3.position.y  = 3.7;

// Añadir todas las mallas al grupo
arbol.add(tierra, pasto, tronco, copa1, copa2, copa3);

// 22. Incluir el árbol con su suelo en el escenario 3D
scene.add(arbol);

// --- BUCLE DE ANIMACIÓN ---
// 23. Función recursiva de animación
function animate() {
  // 23a. Sincronizar con la tasa de refresco del monitor
  requestAnimationFrame(animate);

  // 23b. Modificar propiedades de rotación en cada fotograma
  arbol.rotation.y += 0.01;

  // 23c. Renderizar la escena
  renderer.render(scene, camera);
}

// 24. Invocar animate() por primera vez para iniciar el ciclo
animate();