const user = {
	state: {
		user: '' || uni.getStorageSync('USER'),
		token: '' || uni.getStorageSync('TOKEN'),
	},
	mutations: {
		SET_USER: (state, user) => {
			state.user = user || uni.getStorageSync('USER')
		},
		SET_TOKEN: (state, token) => {
			state.token = token || uni.getStorageSync('TOKEN')
		}
	},
	actions: {
		saveToken({
			commit
		}, token) {
			commit('SET_TOKEN', token)
			uni.setStorageSync('TOKEN', token)
		},
		saveUser({
			commit
		}, user) {
			commit('SET_USER', user)
			uni.setStorageSync('USER', user)
		},
	}
}
export default user