import * as THREE from 'three';

// 1. Escena, Cámara y Renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- SEMÁFORO ---
// Caja del semáforo
const cajaGeometria = new THREE.BoxGeometry(1.2, 3.8, 1);
const cajaMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
const cajaSemaforo = new THREE.Mesh(cajaGeometria, cajaMaterial);
cajaSemaforo.position.x = 0; // Centrado en la escena
scene.add(cajaSemaforo);

// Esferas (luces del semáforo)
const esferaGeometria = new THREE.SphereGeometry(0.4, 32, 32);

// Esfera Roja
const materialRojo = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const esferaRoja = new THREE.Mesh(esferaGeometria, materialRojo);
esferaRoja.position.set(0, 1.2, 0.2);
scene.add(esferaRoja);

// Esfera Amarilla
const materialAmarillo = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const esferaAmarilla = new THREE.Mesh(esferaGeometria, materialAmarillo);
esferaAmarilla.position.set(0, 0, 0.2);
scene.add(esferaAmarilla);

// Esfera Verde
const materialVerde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const esferaVerde = new THREE.Mesh(esferaGeometria, materialVerde);
esferaVerde.position.set(0, -1.2, 0.2);
scene.add(esferaVerde);

// Ajuste de la cámara
camera.position.z = 6;

// Ajuste automático al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Bucle de renderizado
function animate() {

  cajaSemaforo.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
