<template>
	<view class="search-bar">
		<u-search placeholder="请输入关键字" disabled="true" :action-style="search_text_style" @click="navToSearch"
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
				search_text_style: {
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