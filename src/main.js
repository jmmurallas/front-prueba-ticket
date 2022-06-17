import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import router from './routes/router'
import store from './routes/store'

Vue.use(VueAxios, Axios)

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);

/**
 * Sweet Alert 2
 */
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

//
import Fun from "./funciones.js";
Vue.prototype.$Fun = Fun;


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {

    if(!store.getters.loggedIn) {

      next({name:'login'})

    } else {
        next()
    }

  } else {
    next()
  }

})

new Vue({
  BootstrapVue,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
