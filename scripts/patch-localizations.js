const fs = require('fs')
const path = require('path')

const files = [
  'node_modules/@nolebase/vitepress-plugin-enhanced-readabilities/dist/client/components/Spotlight.vue',
  'node_modules/@nolebase/vitepress-plugin-enhanced-readabilities/dist/client/components/ScreenSpotlight.vue',
]

const replacements = [
  { from: /text: ?'ON'/g, to: "text: 'Вкл'" },
  { from: /text: ?'OFF'/g, to: "text: 'Откл'" },
  { from: /<span mr-1 font-bold>ON<\/span>/g, to: '<span mr-1 font-bold>Вкл</span>' },
  { from: /<span mr-1 font-bold>OFF<\/span>/g, to: '<span mr-1 font-bold>Откл</span>' },
]

let patched = 0

for (const filePath of files) {
  const fullPath = path.resolve(filePath)
  try {
    let content = fs.readFileSync(fullPath, 'utf-8')
    const original = content
    for (const { from, to } of replacements) {
      content = content.replace(from, to)
    }
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf-8')
      console.log(`[patch-localizations] Fixed: ${filePath}`)
      patched++
    } else {
      console.log(`[patch-localizations] No changes needed: ${filePath}`)
    }
  } catch (err) {
    console.error(`[patch-localizations] Error patching ${filePath}:`, err.message)
  }
}

if (patched === files.length) {
  console.log('[patch-localizations] All files patched successfully!')
} else {
  console.log(`[patch-localizations] Patched ${patched}/${files.length} files`)
}
