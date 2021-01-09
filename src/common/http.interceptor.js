import store from '@/store/index.js'

const baseUrl = 'http://127.0.0.1:8360/api/'
// const baseUrl = 'http://localhost:3000/'

export function https(url, params, method) {
	return new Promise((resolve, reject) => {
		{
			uni.request({
				url: baseUrl + url, //仅为示例，并非真实接口地址。
				data: params,
				method: method,
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'token': store.state.user.token ? 'user ' + store.state.user.token : '',
				},
				success: (res) => {
					if (res.statusCode == 200) {
						if (res.data.code == 200 || res.data.status == 1) {
							console.log("服务端返回200");
							// res为服务端返回值，可能有code，result等字段
							// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
							// 如果配置了originalData为true，请留意这里的返回值
							resolve(res.data.data ? res.data.data : res.data)
						} else if (res.data.code == 401) {
							console.log("服务端返回401");
							// 假设401为token失效，这里跳转登录 
							uni.showToast({
								title: res.data.message || res.message,
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/auth/auth'
								})
							}, 1500);
						} else {
							// 如果返回false，则会调用Promise的reject回调，
							uni.showToast({
								title: '系统未知错误,请联系管理员',
								icon: 'none'
							})
						}
					}

				},
				fail(err) {
					reject(err)
					uni.showToast({
						title: '访问失败，请联系系统管理员',
						icon: 'none'
					})
				}
			});
		}
	})
}