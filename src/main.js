import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

// Allows Pinia to make use of router
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
