<template>
  <canvas
    ref="canvasRef"
    class="particles-canvas"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const canvasRef = ref(null)
const route = useRoute()

let animationId = null
let particles = []
let mouse = { x: null, y: null, radius: 600 }
let scrollY = 0

const CONFIG = {
  count: 200,
  speed: 0.4,
  color: '35, 35, 99', // будет переопределён в init()
  colorLight: '135, 211, 255',
}

function init() {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  resize()

  // Выбираем цвет в зависимости от темы
  updateColor()

  particles = []
  for (let i = 0; i < CONFIG.count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * CONFIG.speed,
      vy: (Math.random() - 0.5) * CONFIG.speed,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    })
  }

  animate()
}

watch(() => route.path, () => {
  if (animationId) cancelAnimationFrame(animationId)
  particles = []
  init()
})

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Параллакс от скролла
    const parallaxOffset = scrollY * CONFIG.parallaxFactor * (p.size / 2)

    // Движение
    p.x += p.vx
    p.y += p.vy

    // Границы
    if (p.x < 0 || p.x > w) p.vx *= -1
    if (p.y < 0 || p.y > h) p.vy *= -1

    // Реакция на мышь (отталкивание)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius
        p.x -= dx * force * 0.02
        p.y -= dy * force * 0.02
      }
    }

    // Точка
    ctx.beginPath()
    ctx.arc(p.x + scrollY * 0.02, p.y + scrollY * 0.01, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${CONFIG.color}, ${p.opacity})`
    ctx.fill()
  }

  animationId = requestAnimationFrame(animate)
}

function updateColor() {
  const isDark = document.documentElement.classList.contains('dark')
  CONFIG.color = isDark ? '35, 35, 99' : CONFIG.colorLight
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseLeave() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('scroll', () => { scrollY = window.scrollY })
  document.addEventListener('mouseleave', onMouseLeave)

  // Наблюдаем за сменой темы
  const observer = new MutationObserver(() => updateColor())
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
