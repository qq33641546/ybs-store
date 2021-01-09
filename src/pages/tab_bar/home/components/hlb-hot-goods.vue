<template>
    <view class="hot-goods-wrap">
        <view class="hot-goods-title">
            <view class="hot-goods-text">爆款热销</view>
            <view class="hot-goods-button"></view>
        </view>

        <u-waterfall v-if="hotGoodList.length" v-model="hotGoodList" ref="uWaterfall">
            <template v-slot:left="{leftList}">
                <view class="hot-goods-warter" v-for="(item, index) in leftList" :key="index">
                    <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
                    <u-lazy-load threshold="150" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
                    <view class="hot-goods-title">
                        {{item.name}}
                    </view>
                    <view class="hot-goods-price">
                        <text>{{item.price}}</text>元
                    </view>
                    <view class="hot-goods-tag">
                        <view class="hot-goods-tag-owner">
                            自营
                        </view>
                        <view class="hot-goods-tag-text">
                            放心购
                        </view>
                    </view>
                </view>
            </template>
            <template v-slot:right="{rightList}">
                <view class="hot-goods-warter" v-for="(item, index) in rightList" :key="index">
                    <u-lazy-load threshold="350" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
                    <view class="hot-goods-title">
                        {{item.name}}
                    </view>
                    <view class="hot-goods-price">
                        <text>{{item.price}}</text>元
                    </view>
                    <view class="hot-goods-tag">
                        <view class="hot-goods-tag-owner">
                            自营
                        </view>
                        <view class="hot-goods-tag-text">
                            放心购
                        </view>
                    </view>
                </view>
            </template>
        </u-waterfall>



    </view>
</template>

<script>
    import {
        getGoodsList
    } from '@/common/http.api.js'
    export default {
        props: {
            hotGoodList: {
                type: Array,
                require: true
            }
        },
        data() {
            return {
                // hotGoodList: [],
            }
        },
        methods: {

        },

        created() {
            // this.initGoodsList()
        },
    }
</script>

<style lang=scss>
    .hot-goods-wrap {
        margin: 30rpx 0 0 0;
        padding: 20rpx;
        width: 95vw;
        height: auto;

        .hot-goods-text {
            color: $uni-text-color-inverse;
            font-size: 32rpx;
        }
    }

    .hot-goods-warter {
        border-radius: 8px;
        margin: 5px;
        background: $app-wrap-bg;
        padding: 8px;
        position: relative;
    }

    .u-close {
        position: absolute;
        top: 32rpx;
        right: 32rpx;
    }

    .hot-goods-image {
        width: 100%;
        border-radius: 4px;
    }

    .hot-goods-title {
        font-size: 30rpx;
        margin-top: 5px;
        color: $u-main-color;
    }

    .hot-goods-tag {
        display: flex;
        margin-top: 5px;
    }

    .hot-goods-tag-owner {
        background-color: $u-type-error;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        padding: 4rpx 14rpx;
        border-radius: 50rpx;
        font-size: 20rpx;
        line-height: 1;
    }

    .hot-goods-tag-text {
        border: 1px solid $u-type-primary;
        color: $u-type-primary;
        margin-left: 10px;
        border-radius: 50rpx;
        line-height: 1;
        padding: 4rpx 14rpx;
        display: flex;
        align-items: center;
        border-radius: 50rpx;
        font-size: 20rpx;
    }

    .hot-goods-price {
        font-size: 30rpx;
        color: $u-type-error;
        margin-top: 5px;
    }

    .hot-goods-shop {
        font-size: 22rpx;
        color: $u-tips-color;
        margin-top: 5px;
    }
</style>