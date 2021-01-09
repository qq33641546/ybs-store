<template>
    <view class="wrap">
        <u-swiper :list="banerList" name='pic' @click="navTo"></u-swiper>
    </view>
</template>

<script>
    export default {
        props: {
            banerList: {
                type: Array,
                require: true
            }
        },
        data() {
            return {

            }
        },
        methods: {
            // 通过index 取得id 导航到商品详情页
            navTo(index) {
                uni.showToast({
                    title: ` '导航-${index}'`,
                    duration: 1500
                });
                uni.navigateTo({
                    url: ''
                });
            }
        },
        mounted() {},
        watch: {
            list(n, o) {
                console.log(n);
            }
        },
    }
</script>

<style>
    .wrap {
        width: 95vw;
        padding: 40rpx 0;
    }
</style>