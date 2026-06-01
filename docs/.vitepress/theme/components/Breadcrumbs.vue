<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol ref="olRef">
      <li class="home-item">
        <a href="/" class="home-link" aria-label="Главная">
          <svg class="home-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>
      </li>
      <template v-for="(crumb, index) in visibleCrumbs" :key="index">
        <li v-if="crumb.type === 'ellipsis'" class="ellipsis-item">
          <span class="separator">›</span>
          <span class="ellipsis" title="Показать все">…</span>
        </li>
        <li v-else>
          <span class="separator">›</span>
          <a v-if="crumb.link && index < visibleCrumbs.length - 1" :href="crumb.link" :title="crumb.text">{{ crumb.display }}</a>
          <span v-else class="current" :title="crumb.text">{{ crumb.display }}</span>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useData } from 'vitepress'

const { theme, page } = useData()
const olRef = ref(null)

function findPathInSidebar(sidebar, path) {
  // Нормализуем path: убираем .md и .html, сохраняем как есть
  const normalizedPath = path
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
    .replace(/\.html$/, '')
  
  const result = []

  // Рекурсивно ищем элемент, у которого item.link === normalizedPath
  function walk(items, parents = []) {
    for (const item of items) {
      if (item.link) {
        // Пропускаем корневую ссылку для не-главных страниц
        if (item.link === '/' && normalizedPath !== '/') continue
        
        // Нормализуем link для сравнения
        const itemLink = item.link.replace(/\/$/, '')
        const currentPath = normalizedPath.replace(/\/$/, '')
        
        if (itemLink === currentPath) {
          result.push(...parents, { text: item.text, link: item.link })
          return true
        }
      }
      if (item.items && walk(item.items, [...parents])) return true
    }
    return false
  }

  // Сначала ищем точное совпадение среди всех элементов
  const found = walk(sidebar)
  if (found) return result

  // Если точного совпадения нет — ищем родительскую группу
  // У нас структура: группа {text, items} -> элементы {text, link}
  // Показываем только последний элемент (текущую страницу)
  for (const group of sidebar) {
    if (!group.items) continue
    for (const item of group.items) {
      if (!item.link) continue
      const itemLink = item.link.replace(/\/$/, '')
      const currentPath = normalizedPath.replace(/\/$/, '')
      if (itemLink === currentPath) {
        return [{ text: item.text, link: null }]
      }
    }
  }

  return []
}

function findCurrentPageText(sidebar, path) {
  for (const item of sidebar) {
    if (item.link === path) return item.text
    if (item.items) {
      const found = findCurrentPageText(item.items, path)
      if (found) return found
    }
  }
  return null
}

const crumbs = computed(() => {
  const sidebar = theme.value.sidebar
  if (!sidebar || !Array.isArray(sidebar)) return []

  const relativePath = page.value.relativePath
  const path = '/' + relativePath.replace(/\/index\.md$/, '/').replace(/\.md$/, '')

  if (path === '/' || path === '') return []

  return findPathInSidebar(sidebar, path)
})

function truncate(text, maxLen) {
  if (!text) return ''
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen - 1) + '…'
}

const visibleCrumbs = ref([])

function recalcVisibility() {
  const all = crumbs.value
  if (!all.length) {
    visibleCrumbs.value = []
    return
  }

  nextTick(() => {
    const ol = olRef.value
    if (!ol) {
      visibleCrumbs.value = all.map(c => ({ ...c, display: c.text, type: 'crumb' }))
      return
    }

    const containerWidth = ol.parentElement?.clientWidth || window.innerWidth - 40
    const charWidth = 8
    const homeWidth = 28
    const separatorWidth = 20
    const ellipsisWidth = 24
    const minItemWidth = 40

    const totalItems = all.length
    if (totalItems <= 2) {
      visibleCrumbs.value = all.map(c => ({ ...c, display: c.text, type: 'crumb' }))
      return
    }

    let totalWidth = homeWidth + separatorWidth
    totalWidth += all[0].text.length * charWidth + separatorWidth

    const lastText = all[totalItems - 1].text
    const lastWidth = lastText.length * charWidth + separatorWidth
    const availableForMiddle = containerWidth - totalWidth - lastWidth - ellipsisWidth - separatorWidth

    if (availableForMiddle < minItemWidth) {
      visibleCrumbs.value = [
        { ...all[0], display: all[0].text, type: 'crumb' },
        { type: 'ellipsis' },
        {
          ...all[totalItems - 1],
          display: truncate(all[totalItems - 1].text, Math.max(3, Math.floor((containerWidth - homeWidth - separatorWidth * 3 - ellipsisWidth) / charWidth))),
          type: 'crumb'
        }
      ]
    } else {
      let remaining = availableForMiddle
      const middleItems = []
      for (let i = 1; i < totalItems - 1; i++) {
        const itemWidth = all[i].text.length * charWidth + separatorWidth
        if (itemWidth <= remaining) {
          middleItems.push({ ...all[i], display: all[i].text, type: 'crumb' })
          remaining -= itemWidth
        } else if (remaining > minItemWidth) {
          const maxChars = Math.floor((remaining - separatorWidth) / charWidth)
          middleItems.push({ ...all[i], display: truncate(all[i].text, maxChars), type: 'crumb' })
          remaining = 0
        } else {
          break
        }
      }

      if (middleItems.length < totalItems - 2) {
        visibleCrumbs.value = [
          { ...all[0], display: all[0].text, type: 'crumb' },
          { type: 'ellipsis' },
          ...middleItems.slice(-1),
          { ...all[totalItems - 1], display: all[totalItems - 1].text, type: 'crumb' }
        ]
      } else {
        visibleCrumbs.value = [
          { ...all[0], display: all[0].text, type: 'crumb' },
          ...middleItems,
          { ...all[totalItems - 1], display: all[totalItems - 1].text, type: 'crumb' }
        ]
      }
    }
  })
}

watch(() => page.value.relativePath, () => {
  recalcVisibility()
})

onMounted(() => {
  recalcVisibility()
  window.addEventListener('resize', recalcVisibility)
})

onUnmounted(() => {
  window.removeEventListener('resize', recalcVisibility)
})
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  opacity: 0.8;
  overflow: hidden;
}

.breadcrumbs ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.breadcrumbs .home-item {
  flex-shrink: 0;
}

.breadcrumbs .home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
  width: 20px;
  height: 20px;
  margin-right: -1px;
}

.breadcrumbs .home-link:hover {
  color: var(--vp-c-brand-2);
}

.breadcrumbs .home-icon {
  width: 16px;
  height: 16px;
  transform: translateY(-1px);
}

.breadcrumbs .separator {
  margin: 0 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
  flex-shrink: 0;
}

.breadcrumbs a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumbs a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.breadcrumbs .current {
  color: var(--vp-c-text-2);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}

.breadcrumbs .ellipsis-item {
  display: flex;
  align-items: center;
}

.breadcrumbs .ellipsis {
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 1.1em;
  letter-spacing: 1px;
  padding: 0 2px;
  user-select: none;
}

.breadcrumbs .ellipsis:hover {
  color: var(--vp-c-brand-1);
}
</style>
