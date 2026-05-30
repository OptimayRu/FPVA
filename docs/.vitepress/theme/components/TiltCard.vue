<template>
  <div
    ref="cardRef"
    class="tilt-card"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @mouseenter="onMouseEnter"
  >
    <div class="tilt-card-inner" ref="innerRef">
      <div class="tilt-card-glare" ref="glareRef" />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cardRef = ref(null)
const innerRef = ref(null)
const glareRef = ref(null)

const CONFIG = {
  maxTilt: 8,
  perspective: 1000,
  scale: 1.01,
  speed: 400,
  glare: true,
  'max-glare': 0.3,
}

let isHovering = false
let isAnimating = false
let timeoutId = null

function onMouseEnter() {
  isHovering = true
}

function onMouseMove(e) {
  if (!isHovering || !cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  const percentX = mouseX / width
  const percentY = mouseY / height

  const tiltX = CONFIG.maxTilt * (percentY - 0.5) * -1
  const tiltY = CONFIG.maxTilt * (percentX - 0.5)

  // Применяем трансформацию
  const transform = `
    perspective(${CONFIG.perspective}px)
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg)
    scale3d(${CONFIG.scale}, ${CONFIG.scale}, ${CONFIG.scale})
  `

  cardRef.value.style.transform = transform

  // Ореол (glare) — двигается за курсором
  if (glareRef.value && CONFIG.glare) {
    const glareSize = Math.max(width, height) * 2
    const glareX = (percentX * 100).toFixed(2)
    const glareY = (percentY * 100).toFixed(2)

    glareRef.value.style.background = `
      radial-gradient(
        circle at ${glareX}% ${glareY}%,
        rgba(255, 255, 255, ${CONFIG['max-glare']}) 0%,
        transparent 60%
      )
    `
    glareRef.value.style.opacity = '1'
  }
}

function onMouseLeave() {
  isHovering = false

  // Возвращаем в исходное положение
  if (cardRef.value) {
    cardRef.value.style.transform = `
      perspective(${CONFIG.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
    cardRef.value.style.transition = `transform ${CONFIG.speed}ms ease`

    setTimeout(() => {
      if (cardRef.value) {
        cardRef.value.style.transition = ''
      }
    }, CONFIG.speed)
  }

  // Убираем ореол
  if (glareRef.value) {
    glareRef.value.style.opacity = '0'
  }
}
</script>

<style scoped>
.tilt-card {
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.2s ease;
}

.tilt-card-inner {
  position: relative;
  transform-style: preserve-3d;
}

.tilt-card-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  mix-blend-mode: overlay;
}

.tilt-card:hover .tilt-card-glare {
  opacity: 1;
}
</style>