<template>
    <view class="mileage-wrap">
        <view class="mileage-count">
            <view class="mileage-count-title">当前里程</view>
            <view class="mileage-count-icon">
                <image style="width:20px;height:20px" src="@/static/icon/delete.png" mode="widthFix" />
                {{homeData.kmCount?homeData.kmCount:'1000km'}}
            </view>
        </view>
        <view class="slide-ad">
            <swiper class="swiper" :indicator-dots="false" :autoplay="true" vertical :interval="3000">
                <swiper-item>
                    <view class="swiper-item uni-bg-red">剩余保养里程3770km</view>
                </swiper-item>
                <swiper-item>
                    <view class="swiper-item uni-bg-red">lalalalal</view>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
</script>

<style lang="scss">
    .mileage-wrap {
        margin: 50rpx 0 0 0;
        padding: 15rpx;
        display: flex;
        justify-content: center;
        height: 98rpx;
        width: 95vw;
        background: $app-wrap-bg;
        border-radius: 8px;

        /* background: #191919; */
        .mileage-count {
            .mileage-count-title {
                font-size: 18rpx;

            }

            .mileage-count-icon {
                image {
                    width: 36rpx;
                    height: 36rpx;
                }

                display: flex;
                font-size: 30rpx;
                color: $uni-text-color-inverse;
            }
        }
    }

    .slide-ad {
        margin: 0 0 0 80rpx;
        width: 60%;

        .swiper {
            height: 70rpx;

            swiper-item {
                display: flex;
                align-items: center;
            }

        }

    }
</style>