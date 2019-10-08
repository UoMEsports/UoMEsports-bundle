import Vue from 'vue';
import Vuetify from 'vuetify';
import NumberInput from '../../node_modules/@chenfengyuan/vue-number-input/src/index.js';

import 'vuetify/dist/vuetify.min.css';
 
Vue.use(Vuetify);
Vue.use(NumberInput);
 
import CountdownDialogFor from './components/countdown-dialog-for.vue';

new Vue({
    render: h => h(CountdownDialogFor)
}).$mount('#app');