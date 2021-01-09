<template>
	<view class="app-container">
		<u-navbar :is-back='false' back-text="返回" title="首页"></u-navbar>
		<view class="app-content ">
			<hlb-search></hlb-search>
			<hlb-mileage></hlb-mileage>
			<hlb-banner v-if="homeData.advertiseList" :banerList="homeData.advertiseList"></hlb-banner>
			<hlb-categrory></hlb-categrory>
			<hlb-new-goods v-if="homeData.newProductList" :newGoodsList="homeData.newProductList"></hlb-new-goods>
			<hlb-hot-goods v-if="homeData.hotProductList" :hotGoodList="homeData.hotProductList"></hlb-hot-goods>
		</view>

	</view>
</template>
<script>
	import hlbBanner from './components/hlb-banner.vue'
	import hlbSearch from './components/hlb-search.vue'
	import hlbCategrory from './components/hlb-categrory.vue'
	import hlbHotGoods from './components/hlb-hot-goods.vue'
	import hlbNewGoods from './components/hlb-new-goods.vue'
	import hlbMenu from './components/hlb-menu.vue'
	import hlbMileage from './components/hlb-mileage.vue'

	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';

	import {
		getIndexData,
	} from '@/common/http.api.js'
	export default {
		data() {
			return {
				index_data: {},
				loading: true
			}
		},
		components: {
			hlbBanner,
			hlbSearch,
			hlbCategrory,
			hlbHotGoods,
			hlbNewGoods,
			hlbMenu,
			hlbMileage,
		},
		computed: {
			...mapState({
				user: state => state.user.user
			})
		},

		methods: {
			...mapMutations(['SET_TEMPLATE']),
			...mapActions(['Login']),
			// 初始化
			async initData() {
				const data = await getIndexData()
				this.index_data = data
				uni.stopPullDownRefresh()
			}
		},
		onPullDownRefresh() {
			this.initData()
		},

		onLoad() {
			this.initData()
		}
	}
</script>

<style>


</style>