<template>
    <view class="app-container">
        <u-navbar :is-back='false' back-text="返回" title="分类"></u-navbar>
        <view class="u-wrap">
            <view class="u-menu-wrap">
                <scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
                    <view v-for="(item,index) in tabbar" :key="index" class="u-tab-item"
                        :class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
                        @tap.stop="swichMenu(index)">
                        <text class="u-line-1">{{item.name}}</text>
                    </view>
                </scroll-view>
                <block v-for="(item,index) in tabbar" :key="index">
                    <scroll-view scroll-y class="right-box" v-if="current==index">
                        <view class="page-view">
                            <view class="class-item">
                                <view class="item-title">
                                    <text>{{item.name}}</text>
                                </view>
                                <view class="item-container">
                                    <view class="thumb-box" v-for="(item1, index1) in item.children" :key="index1">
                                        <!-- <image class="item-menu-image" :src="item1.pic" mode=""></image> -->
                                        <image class="u-skeleton-circle"
                                            src="https://iconfont.alicdn.com/t/2805d58c-90ec-4a1f-ad00-c5bba3e5f848.png"
                                            mode="aspectFill" />
                                        <view class="item-menu-name">{{item1.name}}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </block>
            </view>
        </view>
        <!-- <u-skeleton :loading="loading" :animation="true" bgColor="#191919"></u-skeleton> -->
    </view>

</template>

<script>
    import {
        getCategoryList
    } from '@/common/http.api.js'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                tabbar: [],
                scrollTop: 0, //tab标题的滚动条位置
                current: 0, // 预设当前项的值
                menuHeight: 0, // 左边菜单的高度
                menuItemHeight: 0, // 左边菜单item的高度\
                loading: true
            }
        },
        computed: {
            ...mapState({
                SYS_INFO: state => state.sys.SYS_INFO
            })
        },
        methods: {
            getImg() {
                return Math.floor(Math.random() * 35);
            },
            // 点击左边的栏目切换
            async swichMenu(index) {
                if (index == this.current) return;
                this.current = index;
                // 如果为0，意味着尚未初始化
                if (this.menuHeight == 0 || this.menuItemHeight == 0) {
                    await this.getElRect('menu-scroll-view', 'menuHeight');
                    await this.getElRect('u-tab-item', 'menuItemHeight');
                }
                // 将菜单菜单活动item垂直居中
                this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
            },
            // 获取一个目标元素的高度
            getElRect(elClass, dataVal) {
                new Promise((resolve, reject) => {
                    const query = uni.createSelectorQuery().in(this);
                    query.select('.' + elClass).fields({
                        size: true
                    }, res => {
                        // 如果节点尚未生成，res值为null，循环调用执行
                        if (!res) {
                            setTimeout(() => {
                                this.getElRect(elClass);
                            }, 10);
                            return;
                        }
                        // this[dataVal] = res.height;
                    }).exec();
                })
            }
        },

        async onLoad() {
            console.log(this.SYS_INFO);
            this.tabbar = await getCategoryList()
            console.log(this.tabbar);
            setTimeout(() => {
                this.loading = false
            }, 500);
        }
    }
</script>

<style lang="scss" scoped>
    .u-wrap {
        height: calc(100vh - 88px);
        /* #ifdef H5 */
        height: calc(100vh - var(--window-top));
        /* #endif */
        display: flex;
        flex-direction: column;
    }

    .u-search-box {
        padding: 18rpx 30rpx;
    }

    .u-menu-wrap {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    .u-search-inner {
        border-radius: 100rpx;
        display: flex;
        align-items: center;
        padding: 10rpx 16rpx;
    }

    .u-search-text {
        font-size: 26rpx;
        color: $u-tips-color;
        margin-left: 10rpx;
    }

    .u-tab-view {
        width: 200rpx;
        height: 100%;
    }

    .u-tab-item {
        height: 110rpx;
        background: $app-wrap-bg;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: #444;
        font-weight: 400;
        line-height: 1;
    }

    .u-tab-item-active {
        position: relative;
        color: $uni-text-color-inverse;
        font-size: 30rpx;
        font-weight: 600;
        background: $app-selected-bg;
    }

    .u-tab-item-active::before {
        content: "";
        position: absolute;
        border-left: 4px solid $u-type-primary;
        height: 32rpx;
        left: 0;
        top: 39rpx;
    }

    .u-tab-view {
        height: 100%;
    }

    .right-box {
        color: $uni-text-color-inverse;
        background-color: $app-container-bg
    }

    .page-view {
        padding: 16rpx;
    }

    .class-item {
        margin-bottom: 30rpx;
        background-color: $app-wrap-bg;
        padding: 16rpx;
        border-radius: 8rpx;
    }

    .item-title {
        font-size: 26rpx;
        color: $uni-text-color-inverse;
        font-weight: bold;
    }

    .item-menu-name {
        font-weight: normal;
        font-size: 24rpx;
        color: $uni-text-color-inverse;
    }

    .item-container {
        display: flex;
        flex-wrap: wrap;
    }

    .thumb-box {
        width: 33.333333%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 20rpx;

        image {
            width: 75rpx;
            height: 75rpx;
            border-radius: 50%;
        }
    }

    .item-menu-image {
        width: 120rpx;
        height: 120rpx;
    }
</style>