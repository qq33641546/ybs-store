<template>
    <view class="new-goods-wrap">
        <view class="new-goods-title">
            <view class="new-goods-title-text">新鲜好物</view>
            <view class="new-goods-title-button" @tap="navClick">查看更多></view>
        </view>

        <scroll-view scroll-x="true" class="scroll-content">
            <li v-for="(item, index) in new_goods_list" :key="index" class="nav-item">
                <view class="nav-item-content">
                    <u-lazy-load threshold="150" border-radius="10" :height=150 :image="item.pic" :index="index">
                    </u-lazy-load>
                    <view class="u-line-1" style="margin:20rpx 0">
                        <text>{{item.name}}</text>
                    </view>
                    <view class="u-line-1 item-price">
                        <text>￥{{item.price}}</text>
                    </view>
                </view>
            </li>
        </scroll-view>


    </view>
</template>

<script>
    export default {
        props: {
            new_goods_list: {
                type: Array
            }
        },
        data() {
            return {

            }
        },
        methods: {

        },
        created() {},
    }
</script>

<style lang="scss">
    .new-goods-wrap {
        margin: 40rpx 0 0 0;
        height: auto;
        width: 95vw;
        background: $app-wrap-bg;
    }

    .scroll-content {
        margin: 0 20rpx;
        padding: 40rpx 20rpx;
        width: 95%;
        height: 25vh;
        padding: 40rpx 0 0 0;
        white-space: nowrap;

        .nav-item {
            margin: 20rpx;
            width: 30%;
            color: #fff;
            display: inline-block;

            .nav-item-content {
                display: flex;
                flex-direction: column;

                .item-price {
                    color: $u-type-error;
                }
            }
        }
    }

    .new-goods-title {
        padding: 0 29rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 98rpx;
        width: 95vw;
        border-radius: 16rpx 16rpx 0px 0px;
        border-bottom: 1rpx solid;

        .new-goods-title-text {
            font-size: 32rpx;
            color: #FFFFFF;
        }

        .new-goods-title-button {
            width: 100rpx;
            height: 36rpx;
            text-align: center;
            border-radius: 20rpx;
            border: 2rpx solid #D43931;
            width: 80px;
            font-size: 20rpx;
            color: #D43931;
        }
    }

    .new-goods-content {
        padding: 40rpx 0;
        display: flex;
        flex-wrap: wrap;


    }

    /* 使用伪元素辅助左对齐 */
    .new-goods-content::after {
        content: '';
        flex: 1;
        /* 或者flex: 1 */
    }
</style>