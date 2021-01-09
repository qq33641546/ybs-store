<template>
	<view class="">
		<u-navbar :is-back='false' back-text="返回" title=购物车></u-navbar>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import {
		getUserCart
	} from '@/common/http.api.js'
	export default {
		data() {
			return {}
		},
		methods: {
			...mapActions(['Login'])
		},
		onShow() {
			// 获取购物车
			let params = {

			}
			getUserCart().then(res => {

			})
		}
	}
</script>

<style>
</style>