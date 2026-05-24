<template>
  <div class="checklist">
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
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  items: Array,
  storageKey: {
    type: String,
    default: 'my-checklist-state'
  }
})

const checklistItems = ref([])

onMounted(() => {
  const savedState = localStorage.getItem(props.storageKey)
  if (savedState) {
    checklistItems.value = JSON.parse(savedState)
  } else {
    checklistItems.value = props.items.map(item => ({ ...item, done: false }))
  }
})

const saveState = () => {
  localStorage.setItem(props.storageKey, JSON.stringify(checklistItems.value))
}

const resetChecklist = () => {
  checklistItems.value.forEach(item => { item.done = false })
  localStorage.removeItem(props.storageKey) // очищаем сохранения
}
</script>

<style scoped>
.checklist-wrapper {
  margin-top: 1rem;
}
.checklist-item {
  margin-bottom: 0.5rem;
}
input[type="checkbox"] {
  margin-right: 0.5rem;
}
.reset-button {
  margin-top: 1rem;
  padding: 0.4em 1em;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-1);
}
.reset-button:hover {
  background: var(--vp-c-bg-mute);
}
</style>
