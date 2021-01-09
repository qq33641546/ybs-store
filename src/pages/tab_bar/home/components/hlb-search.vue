<template>
	<view class="search-bar">
		<u-search placeholder="请输入关键字" disabled="true" :action-style="searchTextStyle" @click="navToSearch"
			v-model="keyword"></u-search>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {
				searchTextStyle: {
					color: 'white',
				}
			}
		},
		methods: {
			navToSearch() {
				uni.navigateTo({
					url: '/pages/search/index'
				});

			}
		},
	}
</script>

<style>
	.search-bar {
		width: 90vw;
	}
</style>