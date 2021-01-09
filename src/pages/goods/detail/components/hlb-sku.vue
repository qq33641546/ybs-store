<template>
    <view class="hlb-sku u-flex u-col-center u-col-between">
        <text class="sku-title">
            已选
        </text>
        <view class="sku-content">

        </view>

        <!-- sku弹出层 -->
        <u-popup v-model="show" mode="bottom" :custom-style=customPopStyle height="600px" border-radius="14">
            <view class="pop-wrap">
                <view v-for="(item,index) in specList" :key="item.id">
                    {{ item.name }}
                    <view class="hlb-sku-value">
                        <view @tap="skuTap(index,value_index,value)" class="value-item"
                            :class="[value.isShow ? 'value-item-active' : '']"
                            v-for="(value,value_index) in item.inputList" :key="value_index">
                            {{ value.isShow }}
                        </view>
                    </view>
                </view>
            </view>

        </u-popup>
    </view>
</template>

<script>
    export default {
        props: {
            skuList: Array,
            specList: Array,
        },
        data() {
            return {
                show: true,
                // 默认选择
                curSkuData: {

                },
                customPopStyle: {
                    background: '#191919'
                }
            }
        },
        methods: {
            skuTap(index, value_index, value) {
                this.$set(this.specList[index].inputList[value_index], 'isShow', true);
                console.log(this.specList[index].inputList[value_index]);
            }
        },
    }
</script>

<style lang="scss">
    .pop-wrap {
        padding: 40rpx;
        background: #222222;
    }

    .value-item {
        margin: 20rpx;
    }

    .value-item-active {
        color: aqua;
    }
</style>