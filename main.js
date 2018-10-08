import Vue from 'vue'
import App from './App'
import topBar from './components/topbar/topbar.vue'
import customList from './components/list/list.vue'

Vue.config.productionTip = false

Vue.component('top-bar',topBar)
Vue.component('custom-list',customList)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
