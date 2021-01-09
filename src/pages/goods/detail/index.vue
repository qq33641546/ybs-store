<template>
    <view class="app-container">
        <u-navbar :is-back='true' back-text="返回" title="商品详情"></u-navbar>
        <u-swiper height=550 indicator-pos="bottomRight" mode='number' :list="goodsDetail.product.albumPics"></u-swiper>
        <hlb-detail-title :goodsDetail="goodsDetail"></hlb-detail-title>
        <!-- <hlb-sku :specList="specList" :skuList="skuList"></hlb-sku> -->

        <view class="detail-sku">

        </view>
        <view class="detail-comment">

        </view>
        <!-- sku选择弹出 -->
        <u-popup v-model="show" mode="bottom" :custom-style=customPopStyle height="350px" border-radius="14">
            <view class="pop-wrap">
                <!-- 展示图片 价格  已选 -->
                <view class="pop-header">
                    <!-- 当前已选 -->
                    <view>当前已选:<text v-for="(item,index) in selectArr"
                            :key="index">{{item.name?item.name+',':''}}</text>
                    </view>
                </view>
                <view v-for="(item,index) in specList" :key="item.id">
                    {{ item.name }}
                    <view class="hlb-sku-value u-flex">
                        <view @tap="skuTap(index,value_index,value,value.able)" class="value-item " :class="[subIndex[index] == value_index ? 'value-item-active' : '',
                           value.able ?'value-item-canChoose' : '']" v-for="(value,value_index) in item.valueList"
                            :key="value_index">
                            {{ value.name }}
                        </view>
                    </view>
                </view>
            </view>

        </u-popup>
    </view>
</template>

<script>
    import {
        getGoodsDetail
    } from '@/common/http.api.js'

    import hlbDetailTitle from './components/hlb-detail-title.vue'
    import hlbSku from './components/hlb-sku.vue'
    export default {
        data() {
            return {
                id: '',
                goodsDetail: {},
                specList: [],
                skuList: [],
                show: true,
                selectArr: [], //存放被选中的值
                subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
                skuItem: {},
                price: '',
                customPopStyle: {
                    background: '#191919'
                }
            }
        },
        components: {
            hlbDetailTitle,
            hlbSku
        },

        methods: {
            getGoodsDetail() {
                getGoodsDetail({}, this.id).then(res => {
                    this.goodsDetail = res
                    const arr = this.goodsDetail.product.albumPics.split(',')
                    this.goodsDetail.product.albumPics = arr
                    // 用来比较的数据
                    this.getSkuList(this.goodsDetail.skuStockList)
                    // 页面展示数据
                    this.getSpecList(this.goodsDetail.productAttributeList, this.goodsDetail
                        .productAttributeValueList)
                    // TODO 初始化调用
                    this.checkItem()
                })
            },
            // 所有sku组合
            getSkuList(skuList) {
                const obj = {}
                skuList.forEach((el, index) => {
                    const spData = JSON.parse(el.spData).map(item => {
                        return item.value
                    })
                    obj[spData] = {
                        ...el
                    }
                })
                this.skuItem = obj
            },
            // 要渲染的数据
            getSpecList(specList, specValue) {
                const list = specList.map((el, index) => {
                    el.valueList = specValue[index].value.split(',')
                    el.valueList.map((item, index) => {
                        el.valueList[index] = {
                            name: el.valueList[index]
                        }
                    });
                    return el
                })
                this.specList = list
            },

            skuTap(index, value_index, value, able) {
                if (able || this.subIndex[index] == value_index) {
                    if (this.selectArr[index] != value) {
                        // 可以把index看做是第几部分,value看做这部分的取值(value对应小项)
                        this.selectArr[index] = value;
                        // 当前部分值的下标
                        this.subIndex[index] = value_index
                    } else {
                        this.selectArr[index] = '';
                        this.subIndex[index] = -1
                    }
                    // 处理已选择的值
                    this.checkItem()
                    // this.$set(this.specList[index].inputList[value_index], 'isShow', true);
                    this.$forceUpdate();
                }


            },
            // TODO sku判断是否可点
            checkItem() {
                // 定义一个数组  用来存用户已选择的项
                let isSelected = []
                this.specList.forEach((item, index) => {
                    isSelected[index] = this.selectArr[index] ? this.selectArr[index] : ''
                });
                // 循环所有项
                this.specList.forEach((item, index) => {
                    let str = isSelected[index]
                    item.valueList.forEach((_item, _index) => {
                        isSelected[index] = _item
                        this.specList[index].valueList[_index].able = this.checkStock(isSelected)
                    });
                    isSelected[index] = str
                });
                const key = isSelected.map(item => {
                    return item.name
                })
                if (this.skuItem[key]) {
                    this.price = this.skuItem[key].price || "";

                }
            },
            // 判断是否有库存  有返回true
            checkStock(isSelected) {
                for (let i = 0; i < isSelected.length; i++) {
                    if (isSelected[i] == '') {
                        return true
                    }
                }
                const key = isSelected.map(item => {
                    return item.name
                })

                if (this.skuItem[key].stock == 0) {
                    return false
                } else {
                    return true
                }

            }
        },

        onLoad(options) {
            // this.id = options.id
            this.id = 58
            this.getGoodsDetail()

        }
    }
</script>

<style lang="scss">
    .detail-title {
        width: 100vw;
        height: 244rpx;
        background: $app-wrap-bg;
        border-radius: 0px 0px 32rpx 32rpx;
    }

    .detail-sku {
        margin: 30rpx 0 0 0;
        width: 100vw;
        height: 416rpx;
        background: $app-wrap-bg;
        border-radius: 0rpx 0rpx 32rpx 32rpx;
    }

    .pop-wrap {
        padding: 30rpx;

        .pop-header {}
    }

    .value-item {
        padding: 15rpx;
        margin: 15rpx;
        min-width: 100rpx;
        text-align: center;
        border-radius: 40rpx;
        background: rgb(177, 177, 177);
        border: none;
    }

    .value-item-active {
        color: aqua;
    }

    .value-item-canChoose {
        background: rgb(202, 202, 202);
    }
</style>