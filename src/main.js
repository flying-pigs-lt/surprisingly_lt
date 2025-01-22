import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'
import { setupDirectives } from './directives'
import naive from 'naive-ui';
import TButton from '@/views/blog/components/TButton.vue'  // 引入 TButton

import store from '@/views/blog/utils/store.js'  // 引入 store




async function bootstrap() {
  const app = createApp(App)
  app.use(naive);
  app.use(store);
  // 全局注册 TButton 组件
  app.component('TButton', TButton)
  setupStore(app)
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
  setupNaiveDiscreteApi()
}

bootstrap()
