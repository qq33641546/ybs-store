<template>
    <view class="app-container">
        <u-navbar :is-back='true' back-text="返回" title="商品列表"></u-navbar>
        <u-sticky offset-top="96">
            <view>
                <view class="search-wrap">
                    <u-search disabled="true" :action-style="searchTextStyle" @click="navToSearch"
                        :placeholder="defaultKeyword" v-model="listParams.keywords">
                    </u-search>

                    <view class="filter-item">
                        <hlb-filter @change="onFilter"></hlb-filter>
                    </view>
                </view>
            </view>
        </u-sticky>


        <view class="app-content ">

            <view class="content-box">
                <view class="goods-list x-f">
                    <!-- 搜索结果内容 -->
                    <view v-for="(item, index) in goodsList" :key="index" @tap="navToDetail(item.id)"
                        class="search-result-item ">
                        <view style="width:98px;height:98px">
                            <u-lazy-load threshold="150" border-radius="10" :image="item.pic" :index="index"
                                img-mode="widthFix">
                            </u-lazy-load>
                        </view>

                        <!-- <image :src="item.pic" mode="scaleToFill" lazy-load="true">
                        </image> -->
                        <view class="search-result-item-detail">

                            <!-- <text>{{item.name}}</text> -->
                            <view class="item-detail-subtitle u-line-2 ">
                                {{item.subTitle}}
                                <!-- <view v-for="(_item, index) in item.label" :key="index"
                                    class="item-detail-label-item flex-def flex-cCenter">
                                    {{_item}}
                                </view> -->
                            </view>
                            <view class="item-detail-price">
                                <text>￥</text><text>{{item.originalPrice}}</text>
                            </view>
                        </view>
                    </view>
                </view>

            </view>
            <u-loadmore :status="status" />
        </view>
    </view>


</template>

<script>
    import {
        getGoodsList
    } from '@/common/http.api.js'
    import hlbFilter from '../components/hlb-filter.vue';
    import {
        mapMutations,
        mapActions,
        mapState
    } from 'vuex';
    let timer = null;
    export default {
        components: {
            hlbFilter
        },
        data() {
            return {
                emptyData: {
                    img: '/static/imgs/empty/empty_goods.png',
                    tip: '暂无该商品，还有更多好货等着你噢~'
                },
                goodsList: [],
                searchVal: '',
                listParams: {
                    productCategoryId: '',
                    keyword: '',
                    brandId: '',
                    pageNum: 1,
                    pageSize: 6,
                    sort: '0',
                },
                isLoading: true, //loading和空白页。
                status: 'loadmore',
                searchTextStyle: {
                    color: 'white',
                }
            };
        },
        computed: {},
        // 触底加载更多
        onReachBottom() {
            this.listParams.pageNum += 1;
            this.status = 'loading';
            this.getGoodsList();
        },
        onLoad(options) {
            this.getGoodsList()
            if (options.item) {
                const item = JSON.parse(decodeURIComponent(options.item));
                console.log(item);
                this.listParams = {
                    productCategoryId: item.children ? item.children[0].id : item.id,
                    keyword: item.keywords,
                    brandId: '',
                    pageNum: 1,
                    pageSize: 10,
                    sort: '',
                }
                this.getGoodsList();
            } else if (options.keyword) {
                console.log(options.keyword);
                this.listParams = {
                    productCategoryId: '',
                    keyword: options.keyword,
                    brandId: '',
                    pageNum: 1,
                    pageSize: 10,
                    sort: '',
                }
                this.getGoodsList();
            } else {

            }

            // if (this.$Route.query.id) {
            //     this.listParams.category_id = this.$Route.query.id;
            // }
            // if (this.$Route.query.keywords) {
            //     this.listParams.keywords = this.$Route.query.keywords;
            //     this.searchVal = this.$Route.query.keywords;
            // }

        },
        methods: {
            onFilter(e) {
                this.listParams.sort = e;
                this.goodsList = [];
                this.listParams.pageNum = 1;
                this.getGoodsList();
            },
            // 键盘搜索
            onSearch() {
                let that = this;
                that.listParams.keyword = that.searchVal;
                that.goodsList = [];
                this.listParams.pageNum = 1;
                that.getGoodsList();
            },
            navToSearch() {
                uni.redirectTo({
                    url: '/pages/search/index'
                })
            },
            // 商品列表
            getGoodsList() {
                let that = this;
                that.isLoading = true;
                that.loadStatus = 'loading';
                getGoodsList(
                    this.listParams
                ).then(res => {
                    this.goodsList = this.goodsList.concat(res.list)
                    if (res.list.length < 5) this.status = 'nomore';
                    this.isLoading = false
                })
            },
            navToDetail(id) {
                uni.navigateTo({
                    url: '/pages/goods/detail/index?id=' + id
                });
            }
        }
    };
</script>

<style lang="scss">
    .head_box {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 998;
        background: #fff;
    }

    .search-wrap {
        width: 100%;
        padding: 15upx 30rpx;
        background: $app-wrap-bg;
        top: 0;
    }

    .filter-item {
        margin: 30rpx -30rpx;
        background: $app-wrap-bg;
    }

    .list-box {
        &:-webkit-scrollbar {
            width: 0;
            height: 0;
            color: transparent;
            display: none;
        }
    }

    .content-box {
        width: 100vw;
    }

    .search-result-item {
        padding: 20rpx 30rpx;
        display: flex;
        box-sizing: border-box;
        border-bottom: solid #252525 1rpx;
        width: 100vw;
        height: 261rpx;
        background: #191919;

        image {
            width: 220rpx;
            height: 220rpx;
        }

        .search-result-item-detail {
            margin: 0 0 0 20rpx;
            width: 430rpx;
            font-size: 28rpx;
            line-height: 42rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;

            .item-detail-label {
                .item-detail-label-item {
                    padding: 0 10rpx;
                    margin: 16rpx 20rpx 0 0;
                    height: 30rpx;
                    background: #333333;
                    opacity: 0.91;
                    font-size: 20rpx;
                    font-weight: 400;
                    color: #999999;
                }
            }

            .item-detail-price {
                margin: 48rpx 0 0 0;
                color: #FA382D;

                text:nth-child(1) {
                    font-size: 24rpx;
                }

                text:nth-child(2) {
                    font-size: 36rpx;
                }

                text:nth-child(3) {
                    font-size: 24rpx;
                }
            }
        }
    }

    .goods-list {
        flex-wrap: wrap;

        .goods-item {
            margin-right: 20rpx;
            margin-bottom: 20rpx;

            &:nth-child(2n) {
                margin-right: 0;
            }
        }
    }
</style>