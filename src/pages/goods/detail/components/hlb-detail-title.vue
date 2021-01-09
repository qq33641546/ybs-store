<template>
    <view class="detail-title u-flex u-row-between u-col-top">
        <view class="title-left">
            <text class="u-line-3">
                {{goodsDetail.product.subTitle}}
            </text>
            <view class="title-tabs">
                <view v-for="item in goodsDetail.product.tabs" :key="item.id">
                    {{ item.tabs }}
                </view>
            </view>
        </view>
        <view class="title-right">
            <text></text><text>{{goodsDetail.product.price}}</text>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            goodsDetail: Object,
            require: true,
        },
        key: {
            deep: true,
            immediate: true,
            goodsDetail: function (val, oldVal) {
                console.log(val);
            }
        },
    }
</script>
<style lang="scss">
    .detail-title {
        width: 100vw;
        height: 244rpx;
        padding: 30rpx 30rpx;
    }

    .title-left {
        width: 70%;
    }

    .title-right {
        color: $app-price-color;
    }
</style>