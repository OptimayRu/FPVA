import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const sitemapPath = resolve(__dirname, '../docs/.vitepress/dist/sitemap.xml')

try {
  let sitemap = readFileSync(sitemapPath, 'utf-8')
  let changed = false

  // Приоритеты и частота обновления для каждой страницы
  const priorities = {
    '/': { priority: '1.0', changefreq: 'weekly' },
    '/fpv-checklist': { priority: '0.9', changefreq: 'monthly' },
    '/fpv-starting': { priority: '0.8', changefreq: 'monthly' },
    '/fpv-equipment': { priority: '0.8', changefreq: 'monthly' },
    '/fpv-directions': { priority: '0.8', changefreq: 'monthly' },
    '/fpv-glossary': { priority: '0.8', changefreq: 'weekly' },
    '/fpv-history': { priority: '0.7', changefreq: 'monthly' },
    '/fpv-simulators': { priority: '0.7', changefreq: 'monthly' },
    '/fpv-real': { priority: '0.7', changefreq: 'monthly' },
    '/drone-anatomy': { priority: '0.7', changefreq: 'monthly' },
    '/drone-config': { priority: '0.7', changefreq: 'monthly' },
    '/fpv-law': { priority: '0.6', changefreq: 'monthly' },
    '/fpv-community': { priority: '0.6', changefreq: 'monthly' },
    '/fpv-costs': { priority: '0.6', changefreq: 'monthly' },
    '/fpv-important': { priority: '0.6', changefreq: 'monthly' },
    '/about': { priority: '0.5', changefreq: 'monthly' },
    '/contact': { priority: '0.4', changefreq: 'yearly' },
  }

  function getPageConfig(url) {
    // Убираем домен, .html в конце и слэш в конце (кроме корня)
    const pathname = new URL(url).pathname
      .replace(/\.html$/, '')  // убираем .html
      .replace(/\/$/, '') || '/'  // убираем замыкающий слэш, кроме корня
    return priorities[pathname]
  }

  // Обновляем каждый <url> элемент
  sitemap = sitemap.replace(/<url>([\s\S]*?)<\/url>/g, (match, inner) => {
    const locMatch = inner.match(/<loc>(.*?)<\/loc>/)
    if (!locMatch) return match

    const url = locMatch[1]
    const config = getPageConfig(url)
    if (!config) return match

    // Если уже есть changefreq — пропускаем
    if (inner.includes('<changefreq>')) return match

    // Вставляем changefreq и priority после lastmod
    const updated = inner.replace(
      '</lastmod>',
      `</lastmod>\n    <changefreq>${config.changefreq}</changefreq>\n    <priority>${config.priority}</priority>`
    )
    changed = true
    return `<url>\n${updated}\n  </url>`
  })

  if (changed) {
    // Форматируем XML: делаем отступы
    const formatted = sitemap
      .replace(/(<\/?urlset[^>]*>)/g, '$1\n')
      .replace(/>\s*</g, '>\n<')
      .replace(/\n\s*\n/g, '\n')

    writeFileSync(sitemapPath, formatted, 'utf-8')
    console.log('[enhance-sitemap] ✅ Sitemap обновлён: добавлены changefreq и priority')
  } else {
    console.log('[enhance-sitemap] ⚠️ Sitemap уже содержит changefreq — изменений не требуется')
  }

} catch (err) {
  console.error('[enhance-sitemap] ❌ Ошибка:', err.message)
  process.exit(1)
}