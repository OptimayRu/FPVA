<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li>
        <a href="/">Главная</a>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index">
        <span class="separator">›</span>
        <a v-if="crumb.link && index < crumbs.length - 1" :href="crumb.link">{{ crumb.text }}</a>
        <span v-else class="current">{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { theme, page } = useData()

function findPathInSidebar(sidebar, path) {
  // Нормализуем путь: убираем индексные файлы
  const normalizedPath = path.replace(/\/index\.md$/, '/').replace(/\.md$/, '')
  // Если путь заканчивается на '/', это корень раздела
  const searchPath = normalizedPath.endsWith('/') ? normalizedPath : normalizedPath

  // Если путь не заканчивается на '/', ищем точное совпадение
  // Иначе ищем с '/' на конце
  const exactPath = searchPath.endsWith('/') ? searchPath : searchPath + '/'

  const result = []

  function walk(items, parents = []) {
    for (const item of items) {
      if (item.link && (item.link === searchPath || item.link === exactPath || item.link === normalizedPath)) {
        // Нашли!
        result.push(...parents, { text: item.text, link: item.link })
        return true
      }
      if (item.link && normalizedPath.startsWith(item.link) && item.link !== '/') {
        // Если путь начинается с этого элемента — добавляем как родителя
        const newParents = [...parents, { text: item.text, link: item.link }]
        if (item.items && walk(item.items, newParents)) return true
      }
      if (item.link === '/' && normalizedPath !== '/') {
        // Пропускаем корневую ссылку
        continue
      }
      if (item.items && walk(item.items, parents)) return true
    }
    return false
  }

  // Пробуем найти точное совпадение
  const found = walk(sidebar)
  if (found) return result

  // Если не нашли — пробуем найти самый длинный совпадающий префикс
  // Это нужно для страниц, которых нет в sidebar напрямую
  let bestMatch = null
  let bestDepth = 0

  function findPrefix(items, parents = []) {
    for (const item of items) {
      if (!item.link) continue
      const link = item.link.endsWith('/') ? item.link : item.link + '/'
      if (normalizedPath.startsWith(item.link) && item.link.length > bestDepth) {
        bestMatch = [...parents, { text: item.text, link: item.link }]
        bestDepth = item.link.length
      }
      if (item.items) {
        findPrefix(item.items, [...parents, { text: item.text, link: item.link }])
      }
    }
  }

  findPrefix(sidebar)

  if (bestMatch) {
    // Ищем имя текущей страницы в sidebar по самому длинному префиксу
    const currentText = findCurrentPageText(sidebar, searchPath)
    if (currentText) {
      result.push(...bestMatch, { text: currentText, link: null })
    } else {
      result.push(...bestMatch, { text: page.value.title || currentText, link: null })
    }
  }

  return result
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

  // Если это главная страница — не показываем хлебные крошки
  if (path === '/' || path === '') return []

  // Строим цепочку из sidebar
  const result = findPathInSidebar(sidebar, path)

  return result
})
</script>

<style scoped>
.breadcrumbs {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  opacity: 0.8;
}

.breadcrumbs ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs .separator {
  margin: 0 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.breadcrumbs a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumbs a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.breadcrumbs .current {
  color: var(--vp-c-text-2);
  font-weight: 500;
}
</style>