<template>
	<view class="wrap">
		<u-navbar :is-back='true' back-text="返回" title="登录"></u-navbar>
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录汇利堡</view>
			<u-input v-if="loginType=='code'" class="u-border-bottom" :custom-style=uinputStyle type="number"
				v-model="tel" :border="true" placeholder="请输入手机号" />
			<u-input v-else class="u-border-bottom" :custom-style=uinputStyle type="text" v-model="username"
				:border="true" placeholder="请输入用户名" />
			<view style="margin:40rpx 0"></view>
			<u-input v-if="loginType == 'password'" class=" u-border-bottom" :custom-style=uinputStyle type="password"
				v-model="password" :border="true" placeholder="请输入账户密码" />
			<view v-if="loginType == 'code'" class="tips">未注册的手机号验证后自动创建....账号</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">{{loginType=='code'?'获取短信验证码':'登录'}}</button>
			<view class="alternative">
				<view @tap="changeLoginType()" class="password">{{loginType=='code'?'密码登录':'手机验证码登录'}}
				</view>
				<view @tap="navToRegister" class="register">注册账号</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<button @getuserinfo='quickLogin' open-type="getUserInfo" class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信一键登录
				</button>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">......用户协议、隐私政策，</text>
				并授权使用您的....账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	import {
		doLogin,
		getUserInfo,
		getUserInfoByName
	} from '@/common/http.api.js'
	import {
		mapActions
	} from 'vuex'
	import Wechat from '@/common/wxmodel.js';
	export default {
		data() {
			return {
				tel: '13380640301',
				username: 'brg',
				password: 'brg20...',
				loginType: 'password',
				uinputStyle: {
					color: '#fff',
				}
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			...mapActions(['saveToken', 'saveUser', 'Login']),
			changeLoginType() {
				switch (this.loginType) {
					case 'code':
						this.loginType = "password"
						break;
					case 'password':
						this.loginType = "code"
						break;
					default:
						break;
				}
			},
			navToRegister() {
				uni.navigateTo({
					url: '/pages/auth/register'
				});
			},
			submit() {
				switch (this.loginType) {
					case 'code':
						if (this.$u.test.mobile(this.tel)) {
							this.$u.route({
								url: './code.vue'
							})
						}
						break;
					case 'password':
						uni.showLoading({
							title: '登陆中...'
						});
						if (this.$u.test.rangeLength(this.username, [3, 8]) && this.$u.test.rangeLength(this.password, [6,
								16
							])) {

							// 登录
							doLogin({
								username: this.username,
								password: this.password
							}).then(res => {

								this.saveToken(res.token).then(() => {
									getUserInfoByName({
										username: this.username
									}).then(res => {
										this.saveUser(res)
										uni.hideLoading();
										uni.navigateBack({
											delta: 1
										});
									})
								})
							})
						} else {
							uni.showToast({
								title: '请检查输入参数',
								duration: 1500,
								icon: 'none'
							});
						}
						break;

					default:
						break;
				}
			},
			async quickLogin(user) {
				var wechat = new Wechat();
				let data = await wechat.Login(user.detail)
				console.log(data);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100vh;
		font-size: 28rpx;
		background: $app-wrap-bg;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				color: $uni-text-color-inverse;
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}



			input {

				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				margin: 40rpx 0;
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: center;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				position: fixed;
				bottom: 0;
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}

		.wechat {
			background: none;
		}
	}
</style>