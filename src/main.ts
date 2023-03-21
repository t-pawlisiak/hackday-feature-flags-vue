import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { LDPlugin } from 'launchdarkly-vue-client-sdk'
// import { registerOptimizely } from '@optimizely/vue-utils'

import App from './App.vue'

import './assets/main.scss'

const app = createApp(App)

// Launch Darkly initialization
// app.use(LDPlugin, {
//   clientSideID: import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID
// })

// Optimizely initialization
// registerOptimizely(
//   app,
//   {
//     id: 'client_1234',
//     attributes: {
//       environment: import.meta.env.VITE_ENVIRONMENT
//     }
//   },
//   { sdkKey: import.meta.env.VITE_OPTIMIZELY_SDK_KEY }
// )

app.use(createPinia())

app.mount('#app')
