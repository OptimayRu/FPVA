<!-- docs/.vitepress/theme/components/Contacts.vue -->
<template>
  <div class="contacts-page">
    <div class="contacts-header">
      <h1>Контакты</h1>
      <p>Свяжитесь с нами любым удобным способом</p>
    </div>

    <div class="contacts-grid">
      <div class="contact-card">
        <div class="contact-icon">🗞</div>
        <h3>Электронная почта</h3>
        <p>Для вопросов и предложений</p>
        <a href="mailto:almazworks@yandex.ru" class="contact-link">almazworks@yandex.ru</a>
      </div>

      <div class="contact-card">
        <div class="contact-icon">📱</div>
        <h3>Telegram-канал</h3>
        <p>Новости, анонсы и общение</p>
        <a href="https://t.me/fpvaru" target="_blank" rel="noopener noreferrer" class="contact-link">@FPVaRu</a>
      </div>
    </div>

    <div class="contacts-note">
      <p>📌 Cтараемся отвечать в течение 10–12 рабочих дней.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style>
.contacts-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.contacts-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contacts-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.contacts-header p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.contacts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.contact-card {
  flex: 1;
  min-width: 250px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.contact-card p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.contact-link {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 40px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}

.contact-link:hover {
  background: var(--vp-c-brand-dark);
  text-decoration: none;
  color: white;
}

.contacts-note {
  text-align: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .contacts-header h1 { font-size: 2rem; }
  .contact-card { min-width: 100%; }
}
</style>
