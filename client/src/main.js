import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import App from './App.vue'
import { router } from './router'
import './services/AuthService'
import './services/TicketsService'
import './services/CommentsService'
import './services/EventsService'
import './services/AccountService'
import { socketService } from './services/SocketService'


const root = createApp(App)
await registerGlobalComponents(root)
  
root
  .use(router)
  .mount('#app')
