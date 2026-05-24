<template>
  <div class="interactive-checklist">
    <h3 v-if="title">{{ title }}</h3>
    <div class="checklist-wrapper">
      <div v-for="(item, index) in checklistItems" :key="item.id || index" class="checklist-item">
        <input 
          type="checkbox" 
          :id="'check-' + (item.id || index)" 
          v-model="item.done"
          @change="saveState"
        >
        <label :for="'check-' + (item.id || index)" v-html="item.text"></label>
      </div>
    </div>
    <button @click="resetChecklist" class="reset-button">Сбросить всё</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  title: String,
  items: Array,
  storageKey: {
    type: String,
    required: true   // теперь обязательно передавать уникальный ключ
  }
})

const checklistItems = ref([])

// Загрузка состояния из localStorage
const loadState = () => {
  const saved = localStorage.getItem(props.storageKey)
  if (saved) {
    checklistItems.value = JSON.parse(saved)
  } else {
    checklistItems.value = props.items.map(item => ({ ...item, done: false }))
  }
}

// Сохранение состояния
const saveState = () => {
  localStorage.setItem(props.storageKey, JSON.stringify(checklistItems.value))
}

// Сброс всех галочек
const resetChecklist = () => {
  checklistItems.value.forEach(item => { item.done = false })
  localStorage.removeItem(props.storageKey)
}

// При монтировании загружаем
onMounted(() => {
  loadState()
})

// Если items изменились (например, при переходе между страницами), перезагружаем
watch(() => props.items, () => {
  loadState()
}, { deep: true })
</script>
