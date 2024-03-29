import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/index.js';
import store from './store/index.js';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
// Vue.use(Vuelidate)
Vue.use(axios);
Vue.use(VueSweetAlert2);

// axios를 root 전역으로 사용하기 위하여 추가
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  Vuelidate,
  store,
  render: h => h(App),
}).$mount('#app');
