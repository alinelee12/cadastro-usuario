import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router'

library.add(faEye, faEyeSlash);
const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
