<template>
    <view class="app-container">
        <u-navbar :is-back='true' back-text="返回" title="分类"></u-navbar>
        <scroll-view scroll-x scroll-with-animation class="u-tab-view menu-scroll-view" :enable-flex='true'
            :scroll-top="scrollTop">
            <view class="u-flex u-tab-item-wrap">
                <view v-for="(item,index) in tabbar" :key="index" class="u-tab-item u-flex-col" :data-current="index"
                    @tap.stop="swichMenu(index)">
                    <!-- <u-avatar :size='96' :mode='square' :src="item.icon"></u-avatar> -->
                    <image class="u-tab-item-icon" :src="item.icon" mode="aspectFill" />
                    <view class="u-tab-item-text-wrap" :class="[current==index ? 'u-tab-item-active' : '']">
                        <text class="u-line-1">{{item.name}}</text>
                    </view>
                </view>
            </view>
        </scroll-view>
        <view class="u-flex u-col-top">
            <scroll-view scroll-y class="left-box">
                <view class="class-item">
                    <view class="item-container u-flex-col u-row-left">
                        <view @tap="switchLeftTab(item1.id,index1)" class="thumb-box u-flex"
                            :class="[leftCurrent == index1?'u-left-tab-item-active':'']"
                            v-for="(item1, index1) in tabbar[current].children" :key="index1">
                            <view class="item-menu-name" :class="u-tab-item-child-active">{{item1.name}}</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <scroll-view class="goods-wrap" @scrolltolower="loadMore" scroll-y="">
                <view class="goods-wrap-title">
                    {{tabbar[current].children[childrenCurrent].name}}
                </view>
                <hlb-good-list :list="goodList.list"></hlb-good-list>
            </scroll-view>

        </view>
        <!-- <u-skeleton :loading="loading" :animation="true" bgColor="#191919"></u-skeleton> -->
    </view>

</template>

<script>
    import {
        getCategoryList,
        getGoodsList
    } from '@/common/http.api.js'
    import {
        mapState
    } from 'vuex'

    import hlbGoodList from './components/hlb-good-list.vue'
    export default {
        data() {
            return {
                tabbar: [],
                scrollTop: 0, //tab标题的滚动条位置
                current: 0, // 预设当前项的值
                leftCurrent: 0,
                childrenCurrent: 0,
                // menuHeight: 0, // 左边菜单的高度
                // menuItemHeight: 0, // 左边菜单item的高度\
                loading: true,
                goodList: [],
                categroryId: '',
                pageNum: 1,
                pageSize: 6,
            }
        },
        components: {
            hlbGoodList
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
            // 点击顶部的栏目切换
            async swichMenu(index) {
                console.log(index);
                if (index == this.current) return;
                this.goodList = {}
                this.current = index;
                // 如果为0，意味着尚未初始化
                if (this.menuHeight == 0 || this.menuItemHeight == 0) {
                    await this.getElRect('menu-scroll-view', 'menuHeight');
                    await this.getElRect('u-tab-item', 'menuItemHeight');
                }
                // 将菜单菜单活动item垂直居中
                this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
                if (this.tabbar[index].children[0].id) {

                    this.switchLeftTab(this.tabbar[index].children[0].id, 0)
                }
            },
            // 点击左边二级分类
            async switchLeftTab(id, index) {
                this.goodList = {}
                this.leftCurrent = index
                this.getGoodsList(
                    id
                )
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
            },
            loadMore() {
                this.pageNum++
                this.getGoodsList(this.tabbar[this.current].children[this.childrenCurrent].id)
                console.log();
            },
            async getGoodsList(id) {

                getGoodsList({
                    productCategoryId: id,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }).then(res => {

                    this.goodList = this.goodList.concat(res.list)
                })
            }
        },

        async onLoad() {
            this.tabbar = await getCategoryList()
            this.getGoodsList(this.tabbar[0].children[0].id, 0)
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
        width: 100vw;
        height: 100%;
    }

    .u-tab-item-wrap {
        padding: 30rpx 0;
        height: 180rpx;
        box-sizing: content-box;
    }

    .u-tab-item {
        margin: 15rpx 30rpx;
        height: 100%;
        width: 200rpx;
        box-sizing: content-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        color: $uni-text-color-grey;
        font-weight: 400;
        line-height: 1;
    }

    .u-tab-item-icon {
        width: 96rpx;
        border-radius: 50%;
    }

    .u-tab-item-text-wrap {
        margin: 20rpx 0;
        padding: 8rpx 26rpx;
    }

    .u-tab-item-active {
        position: relative;
        color: $uni-text-color-inverse;
        font-weight: 600;
        border-radius: 40rpx;
        background: $app-selected-bg;
    }

    .u-left-tab-item-active {
        position: relative;
        color: $uni-text-color-inverse;
        font-weight: 600;
        background: $app-selected-bg;
    }

    // .u-tab-item-active::before {
    //     content: "";
    //     position: absolute;
    //     border-left: 4px solid $u-type-primary;
    //     height: 32rpx;
    //     left: 0;
    //     top: 39rpx;
    // }

    .u-tab-view {
        height: 100%;
    }

    .left-box {
        margin: 50rpx 0;
        height: 100%;
        width: 130rpx;
        color: $uni-text-color-inverse;
        background-color: $app-container-bg
    }

    .page-view {
        padding: 16rpx;
    }

    .class-item {
        margin-bottom: 30rpx;
        background-color: $app-wrap-bg;
        border-radius: 8rpx;
    }

    .item-title {
        font-size: 26rpx;
        color: $uni-text-color-inverse;
        font-weight: bold;
    }

    .item-menu-name {
        width: 130rpx;
        height: 120rpx;
        text-align: center;
        line-height: 120rpx;
        font-weight: normal;
        font-size: 24rpx;
        color: $uni-text-color-inverse;
    }

    .goods-wrap {
        height: calc(100vh - 430rpx);
        background: $app-container-bg;
    }

    .goods-wrap-title {
        padding: 0rpx 45rpx;

    }

    .thumb-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

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