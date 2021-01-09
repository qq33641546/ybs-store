<template>
    <view class="center">
        <u-navbar :is-back='false' back-text="返回" title="个人中心"></u-navbar>
        <view class="center-top">
            <view class="mask"></view>
        </view>
        <view class="center-box-bg">
            <view class="profily">
                <view class="base">
                    <view class="profily-header">
                        <image
                            :src="user.avatar?user.avatar:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1441836571,2166773131&fm=26&gp=0.jpg'"
                            mode="aspectFill" />
                    </view>
                    <text @click="navTo">{{user.username?user.username:'请点击登录'}}</text>
                    <image src="../../../static/fumou-center-template/setting.png" mode=""></image>
                </view>
                <view class="order-status">
                    <view class="status" v-for="item in status">
                        <image class="icon" :src="item.url" mode="aspectFill"></image>
                        <text>{{item.name}}</text>
                    </view>
                </view>
            </view>
            <view class="baiban">

            </view>
            <view class="center-menu">
                <view class="menu-item" v-for="item in menus">
                    <image :src="item.icon" mode="aspectFill"></image>
                    <text>{{item.name}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        getUserInfo
    } from '@/common/http.api.js'
    import {
        mapState,
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {

                userInfo: {},
                status: [{
                        key: 1,
                        name: '待发货',
                        url: '../../../static/fumou-center-template/one.png'
                    },
                    {
                        key: 2,
                        name: '待收货',
                        url: '../../../static/fumou-center-template/2.png'
                    },
                    {
                        key: 3,
                        name: '待评价',
                        url: '../../../static/fumou-center-template/3.png'
                    },
                    {
                        key: 4,
                        name: '全部订单',
                        url: '../../../static/fumou-center-template/4.png'
                    }
                ],
                menus: [{
                        name: '我的收藏',
                        icon: '../../../static/fumou-center-template/5.png',
                        key: 1,
                    },
                    {
                        name: '地址管理',
                        icon: '../../../static/fumou-center-template/6.png',
                        key: 2,
                    },
                    {
                        name: '尺码对照表',
                        icon: '../../../static/fumou-center-template/7.png',
                        key: 3,
                    },
                    {
                        name: '帮助中心',
                        icon: '../../../static/fumou-center-template/8.png',
                        key: 4,
                    },
                    {
                        name: '意见反馈',
                        icon: '../../../static/fumou-center-template/9.png',
                        key: 5,
                    },
                    {
                        name: '关于我们',
                        icon: '../../../static/fumou-center-template/10.png',
                        key: 6,
                    }

                ]
            };
        },
        methods: {
            navTo() {
                uni.navigateTo({
                    url: '/pages/auth/auth'
                });
            }
        },
        computed: {
            ...mapState({
                user: (state) => state.user.user
            }),
        },
        onLoad() {

        },
        onShow() {
            console.log(this.user);
        }
    }
</script>

<style lang="scss">
    page {
        height: 100%;
        color: #fff;
    }

    .profily,
    .profily-header {
        border-radius: 8px;
    }

    .center {
        height: 100%;

        &-top {
            height: 18%;
            background: url('https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3302399998,3216746631&fm=26&gp=0.jpg') no-repeat 0% 50%;
            background-size: cover;

            // background: #E6E6E6;
            .mask {
                background: rgba(0, 0, 0, .4);
                height: 100%;
            }
        }

        &-box-bg {
            padding: 0 35rpx;
            background: $app-container-bg;
            position: relative;


            .profily {
                position: absolute;
                width: 90%;
                // border:1px solid #F7F7F7;
                margin: 0 auto;
                top: -100upx;
                left: 5%;
                background: $app-wrap-bg;
                padding: 35upx;
                box-sizing: border-box;
            }
        }
    }

    .base {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #333;
        padding-bottom: 35upx;
        position: relative;

        .profily-header {
            height: 120upx;
            width: 120upx;
            background-size: 100%;

            image {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        text {
            margin-left: 20px;
            font-size: 30upx;
        }

        image {
            position: absolute;
            height: 40upx;
            width: 40upx;
            right: 0px;
            top: 0px;
        }
    }

    .order-status {
        display: flex;
        justify-content: space-between;
        margin-top: 35upx;

        .status {
            width: 140upx;
            font-size: 24upx;
            text-align: center;
            letter-spacing: .5px;
            display: flex;
            flex-direction: column;

            .icon {
                width: 50upx;
                height: 50upx;
                margin: 0 auto;
                margin-bottom: 5px;

            }
        }
    }

    .baiban {
        background: #111;
        height: 300upx;
    }

    .center-menu {
        width: 100%;
        display: inline-block;

        .menu-item {
            font-size: 28upx;
            letter-spacing: 1rpx;
            padding: 14px 5%;
            background: $app-wrap-bg;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            position: relative;
            border-bottom: 1rpx solid $app-cutline-bg;

            &::after {
                content: '';
                width: 30upx;
                height: 30upx;
                position: absolute;
                right: 5%;
                // background: url('../../../static/fumou-center-template/right.png') no-repeat;
                background-size: 100%;
            }

            text:nth-of-type(1) {
                margin-left: 10px;
            }

            image {
                width: 40upx;
                height: 40upx;
            }

            &:nth-of-type(4) {
                margin-top: 10px;
            }
        }
    }
</style>