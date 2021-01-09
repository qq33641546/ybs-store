<script>
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';
	export default {

		onLaunch: function () {
			console.log('App Launch')
			// 进行用户登录
			// this.$store.dispatch('Login')
			this.$store.dispatch('getSysInfo')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			...mapActions(['Login', 'getSysInfo'])
		},
	}
</script>

<style lang="scss">
	page {
		background: #191919
	}

	/*每个页面公共css */
	.app-container {
		// padding: 20rpx 10rpx;
		background: $app-container-bg
	}

	@import "uview-ui/index.scss";
</style>