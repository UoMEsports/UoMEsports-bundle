import Vue from 'vue';
import Vuetify from 'vuetify';
 
import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
 
import CountdownDialogTo from './components/countdown-dialog-to.vue';
 
new Vue({
    render: h => h(CountdownDialogTo)
}).$mount('#app');