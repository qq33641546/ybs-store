<template>
    <view class="goods-wrap">

        <u-waterfall v-if="list.length" v-model="list" ref="uWaterfall">
            <template v-slot:left="{leftList}">
                <view class="goods-warter" v-for="(item, index) in leftList" :key="index">
                    <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
                    <u-lazy-load threshold="150" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
                    <view class="goods-title">
                        {{item.name}}
                    </view>
                    <view class="goods-price">
                        <text>{{item.price}}</text>元
                    </view>
                    <view class="goods-tag">
                        <view class="goods-tag-owner">
                            自营
                        </view>
                        <view class="goods-tag-text">
                            放心购
                        </view>
                    </view>
                </view>
            </template>
            <template v-slot:right="{rightList}">
                <view class="goods-warter" v-for="(item, index) in rightList" :key="index">
                    <u-lazy-load threshold="350" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
                    <view class="goods-title">
                        {{item.name}}
                    </view>
                    <view class="goods-price">
                        <text>{{item.price}}</text>元
                    </view>
                    <view class="goods-tag">
                        <view class="goods-tag-owner">
                            自营
                        </view>
                        <view class="goods-tag-text">
                            放心购
                        </view>
                    </view>
                </view>
            </template>
        </u-waterfall>



    </view>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array,
                require: true,
                default: '',
            }
        },
        data() {
            return {

            }
        },
        methods: {

        },
        watch: {


        },

        created() {

        },
    }
</script>

<style lang=scss>
    .goods-wrap {
        padding: 20rpx;
        height: auto;

        .goods-text {
            color: $uni-text-color-inverse;
            font-size: 32rpx;
        }
    }

    .goods-warter {
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

    .goods-image {
        width: 270rpx;
        border-radius: 4px;
    }

    .goods-title {
        font-size: 30rpx;
        margin-top: 5px;
        color: $uni-text-color-inverse;
    }

    .goods-tag {
        display: flex;
        margin-top: 5px;
    }

    .goods-tag-owner {
        background-color: $u-type-error;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        padding: 4rpx 14rpx;
        border-radius: 50rpx;
        font-size: 20rpx;
        line-height: 1;
    }

    .goods-tag-text {
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

    .goods-price {
        font-size: 30rpx;
        color: $u-type-error;
        margin-top: 5px;
    }

    .goods-shop {
        font-size: 22rpx;
        color: $u-tips-color;
        margin-top: 5px;
    }
</style>