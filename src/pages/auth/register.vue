<template>
    <view class="wrap">
        <u-navbar :is-back='true' back-text="返回" title="注册"></u-navbar>
        <view class="top"></view>
        <view class="content">
            <view class="title">欢迎加入汇利堡</view>
            <u-input class="u-border-bottom " :custom-style=uinputStyle type="text" v-model="username" :border="true"
                placeholder="请输入用户名" />
            <view style="margin:40rpx 0;"></view>
            <u-input class="u-border-bottom " :custom-style=uinputStyle type="number" v-model="tel" :border="true"
                placeholder="请输入手机号" />

            <view class="forget-input">
                <view class="verify-left">
                    <u-input :custom-style=uinputStyle class=" u-border-bottom" type="number" v-model="code"
                        :border="true" placeholder="请输入验证码" />
                </view>
                <view class="verify-right">
                    <button class="verify-btn" @tap="getCode"
                        type="primary">{{countDown==0?'获取验证码':countDown+'s后获取'}}</button>
                </view>
            </view>
            <u-input :custom-style=uinputStyle class=" u-border-bottom" type="password" v-model="password"
                :border="true" placeholder="请输入密码(8-16位)" />
            <button @tap="submit" :style="[inputStyle]" class="getCaptcha">提交</button>
            <view class="alternative">
                <view class="password">
                </view>
                <view @tap="navToLogin" class="register">已有账户?返回登录</view>
            </view>
        </view>
        <view class="buttom">
            <view class="loginType">

            </view>
            <view class="hint">
                注册代表同意
                <text class="link">......用户协议、隐私政策，</text>
                并授权使用您的....账号信息（如昵称、头像、收获地址）以便您统一管理
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getAuthCode,
        register
    } from '@/common/http.api.js'
    export default {
        data() {
            return {
                tel: '13380640301',
                code: '',
                username: '',
                password: '',
                countDown: 0,
                uinputStyle: {
                    color: '#fff',
                }
            }
        },
        computed: {
            inputStyle() {
                let style = {};
                if (this.tel && this.code && this.password) {
                    style.color = "#fff";
                    style.backgroundColor = this.$u.color['warning'];
                }
                return style;
            }
        },
        methods: {

            getCode() {
                // 判断输入的手机号是否正确
                if (this.$u.test.mobile(this.tel)) {
                    if (this.countDown == 0) {
                        this.countDown = 60
                        uni.showToast({
                            title: '验证码已发送至您的手机,请查收',
                            duration: 1500,
                            icon: 'none'
                        });

                        // 请求后台验证码
                        getAuthCode({
                            telephone: this.tel
                        }).then(res => {
                            console.log(res);
                        })

                    } else {
                        uni.showToast({
                            title: `${this.countDown}s后可重新获取验证码`,
                            duration: 1500,
                            icon: 'none'
                        });
                        return
                    }
                    var timer = setInterval(() => {
                        this.countDown = this.countDown - 1
                        this.countDown == 0 && clearInterval(timer)
                    }, 1000);
                } else {
                    uni.showToast({
                        title: '请输入正确的手机号',
                        duration: 1500,
                        icon: 'none'
                    });
                    return
                }

            },
            submit() {
                if (this.$u.test.mobile(this.tel) &&
                    this.$u.test.rangeLength(this.password, [6, 16]) &&
                    this.$u.test.rangeLength(this.username, [3, 8]) &&
                    this.$u.test.code(this.code, 6)) {
                    // 发起注册
                    register({
                        username: this.username,
                        password: this.password,
                        telephone: this.tel,
                        authCode: this.code
                    }).then(res => {
                        console.log(res);
                    })
                } else {
                    uni.showToast({
                        title: '请检查您的输入',
                        duration: 1500,
                        icon: 'none'
                    });
                }
            },
            navToLogin() {
                uni.navigateBack({
                    delta: 1
                });
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

            .verify-left {
                width: calc(100% - 260upx);
            }

            .verify-right {
                padding-left: 20upx;
            }

            .verify-btn {
                height: 80upx;
                line-height: 80upx;
                font-size: 28upx;
                width: 240upx;
                border-radius: 8upx;
                background: #333;
            }

            .verify-left,
            .verify-right {
                float: left;
            }

            .forget-input input {
                background: #F2F5F6;
                font-size: 28upx;
                padding: 10upx 25upx;
                height: 62upx;
                line-height: 62upx;
                border-radius: 8upx;
            }

            .forget-margin-b {
                margin-bottom: 25upx;
            }

            .forget-input {
                margin: 40rpx 0;
                overflow: auto;
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
    }

    .custom-input {
        color: #F2F5F6;
    }
</style>