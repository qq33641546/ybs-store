<template>
	<view class="app-container">
		<!-- S 导航栏 -->
		<u-navbar :is-back='false' back-text="返回" title="首页"></u-navbar>
		<!-- E 导航栏 -->

		<!-- S 首页内容 -->
		<view class="app-content ">
			<hlb-search></hlb-search>
			<hlb-banner v-if="index_data.banner" :baner_list="index_data.banner"></hlb-banner>
			<hlb-categrory v-if="index_data.category_list" :category_list="index_data.category_list"></hlb-categrory>
			<hlb-new-goods v-if="index_data.new_goods_list" :new_goods_list="index_data.new_goods_list"></hlb-new-goods>
			<!-- <hlb-hot-goods v-if="index_data.hot_goods_list" :hot_goods_list="index_data.hot_goods_list"></hlb-hot-goods> -->
		</view>
		<!-- E 首页内容 -->
	</view>
</template>
<script>
	import hlbBanner from './components/hlb-banner.vue'
	import hlbSearch from './components/hlb-search.vue'
	import hlbCategrory from './components/hlb-categrory.vue'
	import hlbHotGoods from './components/hlb-hot-goods.vue'
	import hlbNewGoods from './components/hlb-new-goods.vue'
	import hlbMenu from './components/hlb-menu.vue'

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
				result: ['a', 'b'],
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
			},
			onChange(rows) {
				console.log(rows);
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