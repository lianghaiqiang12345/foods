import Vue from 'vue'
import Vuex from 'vuex'
import utils from '~/utils/index.js'

Vue.use(Vuex)
+(function islogin(){
	const time = utils.getlocalStorage('user').time
	const loginTime = utils.getlocalStorage('user').loginTime
	let date = new Date()
	switch(loginTime){
		case 7:
			date.setDay(date.getDay()-7)
			if((date.getTime() - time.getTime())>=0){
				localStore.removeItem('user')
			}
		case 0.5:
			date.setMinutes(date.getMinutes()-7)
			if((date.getTime() - time.getTime())>=0){
				localStore.removeItem('user')
			}
	}

})
const state = {
  isLogin: utils.getlocalStorage('user') ? true : false,
  user: utils.getlocalStorage('user'),
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
	},
	refashuser (state){
		state.user = utils.getlocalStorage('user')
	}
}
export default new Vuex.Store({
  state, mutations
})
