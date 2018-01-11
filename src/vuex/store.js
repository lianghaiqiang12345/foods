import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogin: localStorage.getItem('user') ? true : false,
  user: JSON.parse(localStorage.getItem('user')),
  searchText:'',
  city:'广州市',
  isDing:false
}
const mutations = {
	search (state,text){
		state.searchText = text
	},
	setcity (state,text){
		state.city = text
	},
	setDing (state){
		state.isDing = true
	}
}
export default new Vuex.Store({
  state, mutations
})
