# Исправление пагинации (prev/next) в VitePress

## Проблема

Ссылки на предыдущую и следующую страницы внизу документации VitePress располагаются в две колонки (на одной строке) **только на широких экранах**. На узких экранах они отображаются одна под другой.

**Причина:** в `VPDocFooter.vue` стоит медиа-запрос, ограничивающий двухколоночный режим:

```css
@media (min-width: 960px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Решение

Добавьте в `docs/.vitepress/theme/index.js` в блок `onMounted` следующий код:

```javascript
const applyPagerStyles = () => {
  const prevNext = document.querySelector('nav.prev-next');
  if (!prevNext) return;
  prevNext.style.setProperty('display', 'flex', 'important');
  prevNext.style.setProperty('flex-direction', 'row', 'important');
  prevNext.style.setProperty('gap', '1rem', 'important');
  prevNext.style.setProperty('grid-template-columns', 'none', 'important');
  prevNext.querySelectorAll('div.pager').forEach(p => {
    p.style.setProperty('flex', '1', 'important');
  });
};

setTimeout(applyPagerStyles, 100);
setTimeout(applyPagerStyles, 500);
window.addEventListener('resize', applyPagerStyles);
```

Этот способ работает, потому что инлайн-стили (`element.style.setProperty(..., 'important')`) имеют наивысший приоритет и переопределяют scoped-стили Vue, которые используются в VitePress.

## Как проверить

1. Откройте любую страницу документации с пагинацией
2. Установите ширину браузера **639px или менее** — ссылки должны оставаться на одной строке (вопреки поведению VitePress по умолчанию)
3. Ссылки «Предыдущая страница» и «Следующая страница» должны быть на одной строке
4. В консоли проверьте:
   ```js
   document.querySelector('nav.prev-next').style.display
   ```
   Должно вернуть `"flex"`

## Issue на GitHub

Создайте feature request на https://github.com/vuejs/vitepress/issues/new

**Title:** `Keep prev/next links side by side on all screen widths`

**Description:**
```
In VPDocFooter.vue, the .prev-next links stack vertically on narrower screens,
which looks unnecessarily bulky.

Suggestion: remove the media query so the two-column layout applies at all widths:

.prev-next {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
}
```