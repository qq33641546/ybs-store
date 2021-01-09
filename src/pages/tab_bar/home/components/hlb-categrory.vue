<template>
    <view class="category-wrap">
        <view class="category-title">
            <view class="category-title-text">全品分类</view>
            <view class="category-title-button" @tap="navToAllCategrory">全部分类></view>
        </view>
        <ul class="category-content u-skeleton ">
            <li v-for="(item, index) in categoryList" :key="index" @tap="navToGoodList(item)" class="nav-item ">
                <image class="u-skeleton-fillet" :src=item.icon mode="aspectFill">
                </image>
                <text>{{item.name}}</text>
            </li>
        </ul>
        <u-skeleton :loading="loading" :animation="true" bgColor="#191919"></u-skeleton>
    </view>
</template>

<script>
    import {
        getCategoryList
    } from '@/common/http.api.js'
    export default {
        data() {
            return {
                categoryList: [],
                loading: true
            }
        },
        methods: {
            // 获取一级分类
            initCategory() {
                getCategoryList().then(res => {
                    let list = res.filter((item, index) => {
                        return index < 8 && item.showStatus == 1
                    })
                    this.categoryList = list
                    setTimeout(() => {
                        this.loading = false
                    }, 500);
                    console.log(list);
                })
            },
            navToGoodList(item) {
                uni.navigateTo({
                    url: '/pages/goods/list/index?item=' + encodeURIComponent(JSON.stringify(item)),
                    fail(err) {
                        console.log(err);
                    }
                });
            },
            navToAllCategrory() {
                uni.navigateTo({
                    url: '/pages/goods/categrory/index'
                });
            }
        },
        created() {
            this.initCategory()
        },
    }
</script>

<style lang="scss">
    .category-wrap {
        height: auto;
        width: 95vw;
        background: $app-wrap-bg;
    }

    .category-title {
        padding: 0 29rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 98rpx;
        width: 95vw;
        border-radius: 16rpx 16rpx 0px 0px;
        border-bottom: 1rpx solid;

        .category-title-text {
            font-size: 32rpx;
            color: #FFFFFF;
        }

        .category-title-button {
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

    .category-content {
        padding: 40rpx 0;
        display: flex;
        flex-wrap: wrap;

        .nav-item {
            margin-top: 20rpx;
            width: 25%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            color: #fff;

            image {
                width: 80rpx;
                height: 80rpx;
                border-radius: 20rpx;
            }
        }

    }

    /* 使用伪元素辅助左对齐 */
    .category-content::after {
        content: '';
        flex: 1;
        /* 或者flex: 1 */
    }
</style>