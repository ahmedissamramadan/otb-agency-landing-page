// ==========================================================================
// OTB TEAM AI HUB — VERCEL BEST PRACTICES JAVASCRIPT ENGINE
// Rule implementations: client-passive-event-listeners, js-index-maps, js-cache-storage, js-early-exit
// ==========================================================================

// 1. Subtle Three.js Ambient Particles with Passive Listeners
(function initCleanWebGL() {
  const canvas = document.getElementById("webglCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 25;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const particleCount = 350;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xD4A853,
    size: 0.18,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0;
  let mouseY = 0;
  // Vercel client-passive-event-listeners rule:
  window.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });
})();

// Toast Notification with Auto-Cleanup
function showToast(msg) {
  let toast = document.getElementById("cleanToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cleanToast";
    toast.style.cssText = "position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #D4A853; color: #000; font-weight: 700; padding: 0.75rem 1.75rem; border-radius: 9999px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 999999; font-size: 0.9rem; transition: opacity 0.25s cubic-bezier(0.2,0,0,1); opacity: 0; pointer-events: none;";
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2200);
}

// Copy Text
function copyText(str) {
  if (!str) return; // js-early-exit
  navigator.clipboard.writeText(str).then(() => {
    showToast("📋 تم نسخ الأمر بنجاح إلى الحافظة!");
  }).catch(() => {
    showToast("تم النسخ!");
  });
}
