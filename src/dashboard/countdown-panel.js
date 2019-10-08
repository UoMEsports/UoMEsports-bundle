import Vue from 'vue';
import Vuetify from 'vuetify';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
 
import CountdownPanel from './components/countdown-panel.vue';
 
new Vue({
    render: h => h(CountdownPanel)
}).$mount('#app');