<template>
    <view class="filter-box">
        <view class="mask cu-modal" :class="{ show: showSel }" style="z-index: 8;" @tap="hideModal"></view>
        <view class="navbar">
            <view class="nav-item y-f" :class="{ current: filterIndex === 0 }" @tap="tabClick(0)">
                <view class="title-box flex align-center">
                    <text class="filter-title"
                        :class="{ 'title-active': filterIndex === 0 }">{{ defaultOrder === 1 ? '自定义' : '综合推荐' }}</text>
                    <view class="p-box"><text :class="{ active: filterIndex === 0 }"
                            class="yticon cuIcon-fold xia"></text></view>
                </view>
            </view>
            <view class="nav-item y-f" :class="{ current: filterIndex === 1 }" @tap="tabClick(1)">
                <view class="title-box x-f"><text class="filter-title"
                        :class="{ 'title-active': filterIndex === 1 }">新品优先</text></view>
            </view>
            <view class="nav-item y-f" :class="{ current: filterIndex === 2 }" @tap="tabClick(2)">
                <view class="title-box x-f">
                    <text :class="{ 'title-active': filterIndex === 2 }" class="filter-title">销量</text>

                </view>
            </view>
            <view class="nav-item y-f" :class="{ current: filterIndex === 3 }" @tap="tabClick(3)">
                <view class="title-box">
                    <text class="filter-title" :class="{ 'title-active': filterIndex === 3 }">价格</text></view>
                <view class="p-box">
                    <u-icon name="arrow-up" :color="priceOrder === 1 && filterIndex === 3?'#6CD2D0':'#333'" size="24">
                    </u-icon>
                    <u-icon name="arrow-down" :color="priceOrder === 2 && filterIndex === 3?'#6CD2D0':'#333'" size="24">
                    </u-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    export default {
        components: {},
        props: {},
        data() {
            return {
                filterIndex: 0,
                showSel: false, //综合选择
                defaultOrder: 0, //综合
                priceOrder: 0, //价格
                salesOrder: 0, //销量
                newProdcutOrder: 0 //新品优先
            };
        },
        computed: {
            filterData() {
                const data = {
                    defaultOrder: this.defaultOrder,
                    priceOrder: this.priceOrder,
                    salesOrder: this.salesOrder,
                    newProdcutOrder: this.newProdcutOrder
                };
                return data;
            }
        },
        onLoad() {},
        methods: {
            //筛选
            tabClick(index) {
                this.filterIndex = index;
                if (index === 0) {
                    this.showSel = !this.showSel;
                } else {
                    this.showSel = false;
                }
                if (index === 2) {
                    this.salesOrder = 1;
                } else {
                    this.salesOrder = 0;
                }
                if (index === 3) {
                    this.priceOrder = this.priceOrder === 1 ? 2 : 1;
                    if (this.priceOrder == 1) {
                        index = 3
                    } else {
                        index = 4
                    }
                } else {
                    this.priceOrder = 0;
                }
                if (index === 1) {
                    this.newProdcutOrder = 1;
                } else {
                    this.newProdcutOrder = 0;
                }
                this.$emit('change', index);
            },
            onSel(dot) {
                this.defaultOrder = dot;
                this.$emit('change', this.filterData);
                this.showSel = false;
            },
            hideModal() {
                this.showSel = false;
            }
        }
    };
</script>

<style lang="scss">
    .sel-box {
        position: absolute;
        width: 750rpx;
        height: 140rpx;
        background: $app-wrap-bg;
        border-radius: 0px 0px 20rpx 20rpx;
        z-index: 999;
        left: 50%;
        transform: translateX(-50%);
        bottom: -138rpx;
        transition: all ease-out 0.2s;

        .sel-item {
            color: #333;
            padding: 20rpx 40rpx 0;
            font-size: 24rpx;
            font-weight: 500;
        }

        .sel-active {
            color: #6CD2D0;
            font-size: 26rpx;
            font-weight: 600;
        }
    }

    .title-box {
        display: flex;
        align-items: center;
    }

    .filter-box {
        width: 750rpx;
    }

    .navbar {
        display: flex;
        width: 100vw;
        height: 95rpx;
        padding: 0 50rpx;
        background: $app-wrap-bg;
        position: relative;
        z-index: 999;

        .nav-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 30rpx;
            position: relative;

            .filter-title {
                font-size: 28rpx;
                color: rgb(255, 255, 255);
                font-weight: 400;
            }

            .line {
                width: 110rpx;
                height: 4rpx;
                background: transparent;
                position: absolute;
                bottom: 0;
                z-index: 2;
            }

            .title-active {
                color: #6CD2D0;
            }

            .p-box {
                display: flex;
                flex-direction: column;

                .yticon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30rpx;
                    line-height: 1;
                    height: 14rpx;
                    margin-left: 6upx;
                    font-size: 22upx;
                    font-weight: 600;
                    color: #c4c4c4;
                    padding: 0rpx 4rpx;
                }

                .xia {
                    transform: scaleY(-1);
                }
            }
        }
    }

    .current {
        color: #d5a65a;
    }

    .active {
        color: #d5a65a !important;
    }
</style>